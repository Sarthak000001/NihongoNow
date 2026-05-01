import mongoose, { Schema, Document } from "mongoose";

export interface IMessage {
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}

export interface IConversation extends Document {
  userId: string; // Clerk User ID
  characterId: string;
  messages: IMessage[];
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ["user", "assistant", "system"], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ConversationSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  characterId: { type: String, required: true, index: true },
  messages: { type: [MessageSchema], default: [] },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Conversation || mongoose.model<IConversation>("Conversation", ConversationSchema);
