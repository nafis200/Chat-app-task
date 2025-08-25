export type Emotion = {
  label: string;
  confidence: number;
};

export type IMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
  emotions: Emotion[];
};