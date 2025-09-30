import { Extension, CommandProps } from "@tiptap/core";

export interface InsertEmojiCommandProps {
  /**
   * The emoji character to insert, e.g. "😊"
   */
  emoji: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    emoji: {
      /**
       * Insert an emoji at the current cursor position
       */
      insertEmoji: (emoji: string) => ReturnType;
    };
  }
}

export const EmojiExtension = Extension.create({
  name: "emoji",

  addCommands() {
    return {
      insertEmoji:
        (emoji: string) =>
        ({ chain }: CommandProps) => {
          return chain().insertContent(emoji).run();
        },
    };
  },
});
