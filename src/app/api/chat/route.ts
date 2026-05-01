import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Conversation from '@/models/Conversation';
import Character from '@/models/Character';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages, characterId } = await req.json();
  await dbConnect();

  // Get Character details
  const character = await Character.findOne({ characterId });
  if (!character) {
    return new Response("Character not found", { status: 404 });
  }

  // Load or create conversation
  let conversation = await Conversation.findOne({ userId, characterId });
  if (!conversation) {
    conversation = new Conversation({ userId, characterId, messages: [] });
  }

  // Save the new user message to the DB
  const latestMessage = messages[messages.length - 1];
  conversation.messages.push({
    role: latestMessage.role,
    content: latestMessage.content,
  });
  await conversation.save();

  // Use the Character's dynamic prompt
  const systemPrompt = character.systemPrompt + `\n\nRULES:
- At the very start of your response, ALWAYS include a section translating the user's last message like this:
  USER-TRANSLATION:
  Japanese: [User's message in Japanese]
  Romaji: [User's message pronunciation]
  English: [User's message in English]
  ---
- Then continue with your response in the standard format:
  Japanese: [your response]
  Romaji: [pronunciation]
  English: [translation]
  Tip: [grammar tip]
- Match the user's level.
- Stay in character as ${character.name}.
- Keep responses short — 1–3 sentences in Japanese max.`;

  // Build the messages format expected by Google Generative AI
  const prompt = messages
    .map((m: any) => `${m.role === 'user' ? 'User' : character.name}: ${m.content}`)
    .join('\n');

  const model = genAI.getGenerativeModel({
    model: 'gemini-flash-latest',
    systemInstruction: {
      parts: [{ text: systemPrompt }],
      role: 'system',
    },
  });

  try {
    const response = await model.generateContentStream(prompt);
    const stream = GoogleGenerativeAIStream(response, {
      onCompletion: async (completion: string) => {
        // Save AI's response to the database
        conversation.messages.push({
          role: 'assistant',
          content: completion,
        });
        await conversation.save();
      }
    });

    return new StreamingTextResponse(stream);
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // Check if it's a quota error (429)
    if (error.status === 429 || error.message?.includes("429") || error.message?.includes("quota")) {
      return new Response(
        JSON.stringify({
          error: "QUOTA_EXCEEDED",
          message: "The AI Sensei is currently taking a short tea break (Rate limit exceeded). Please try again in a minute!"
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: "SERVER_ERROR", message: "Something went wrong. Please try again later." }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
