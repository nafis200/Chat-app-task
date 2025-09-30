"use client";

import { Controller, useFormContext } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import dynamic from "next/dynamic";
import { useState } from "react";
import { EmojiExtension } from "./EmojiExtension";
import { Button } from "@/components/ui/button"; // shadcn Button

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

type PHRichTextEditorProps = {
  name: string;
  label?: string;
  placeholder?: string;
};

export const PHRichTextEditor = ({
  name,
  label,
  placeholder = "Type something...",
}: PHRichTextEditorProps) => {
  const { control } = useFormContext();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const editor = useEditor({
          extensions: [
            StarterKit,
            Image,
            Placeholder.configure({ placeholder }),
            EmojiExtension,
          ],
          content: field.value || "",
          immediatelyRender: false, // SSR fix
          editorProps: {
            attributes: {
              className:
                "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-0 focus:outline-none min-h-[150px]",
            },
          },
          onUpdate: ({ editor }) => {
            field.onChange(editor.getHTML());
          },
        });

        if (!editor) return <></>;

        const addImage = () => {
          const url = prompt("Enter image URL");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        };

        const addEmoji = (emojiObject: any) => {
          editor.commands.insertEmoji(emojiObject.emoji);
          setShowPicker(false);
        };

        return (
          <div className="flex flex-col gap-2 w-full max-w-screen-lg mx-auto p-6 -ml-2">
            {label && (
              <label className="text-sm font-medium text-gray-700 dark:text-white">
                {label}
              </label>
            )}

            {/* Toolbar */}
            <div className="flex gap-1 mb-2 flex-wrap">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                B
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                I
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addImage}
              >
                Image
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setShowPicker(!showPicker)}
              >
                😊
              </Button>
            </div>

            {/* Emoji Picker */}
            {showPicker && <Picker onEmojiClick={addEmoji} />}

            {/* Editor */}
            <EditorContent
              editor={editor}
              className="border p-2 rounded min-h-[150px]"
            />

            {/* Error Message */}
            {error && (
              <small className="text-red-500 text-sm">{error.message}</small>
            )}
          </div>
        );
      }}
    />
  );
};
