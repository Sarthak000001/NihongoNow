import mongoose, { Schema, Document } from "mongoose";

export interface ICharacter extends Document {
  characterId: string;
  name: string;
  tagline: string;
  avatarUrl: string;
  systemPrompt: string;
  tags: string[];
  themeColor: string;
}

const CharacterSchema: Schema = new Schema({
  characterId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  systemPrompt: { type: String, required: true },
  tags: { type: [String], default: [] },
  themeColor: { type: String, default: "from-blue-500 to-indigo-600" },
});

export default mongoose.models.Character || mongoose.model<ICharacter>("Character", CharacterSchema);
