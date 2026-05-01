import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db";
import Conversation from "@/models/Conversation";
import Character from "@/models/Character";
import { redirect } from "next/navigation";
import ChatClient from "./ChatClient";

export default async function ChatPage({ params }: { params: { characterId: string } }) {
  const { userId } = auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  await dbConnect();

  // Validate character exists
  const character = await Character.findOne({ characterId: params.characterId });
  if (!character) {
    redirect("/characters");
  }

  // Fetch past conversation for this user and character
  const conversation = await Conversation.findOne({ 
    userId, 
    characterId: params.characterId 
  }).lean();

  // Transform messages to match the format expected by the Vercel AI SDK
  const initialMessages = conversation?.messages?.map((msg: any) => ({
    id: msg._id.toString(),
    role: msg.role,
    content: msg.content,
  })) || [];

  return (
    <ChatClient 
      characterId={params.characterId} 
      initialMessages={initialMessages} 
      characterName={character.name}
    />
  );
}
