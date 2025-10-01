"use client";

import { Controller, useFormContext } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import dynamic from "next/dynamic";
import { useState } from "react";
import { EmojiExtension } from "./EmojiExtension";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Smile } from "lucide-react";

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
          immediatelyRender: false,
          editorProps: {
            attributes: {
              className:
                "prose prose-sm sm:prose-base lg:prose-lg focus:outline-none min-h-[150px] w-full dark:prose-invert prose-img:max-w-full prose-img:h-auto break-words",
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
          <div className="flex flex-col gap-4  px-2 sm:px-4">
            {label && (
              <label className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                {label}
              </label>
            )}

            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl max-w-full">
              {/* Toolbar */}
              <div className="flex items-center gap-1 p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 backdrop-blur-sm flex-wrap">
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive("bold") ? "default" : "ghost"}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`h-8 w-8 sm:h-9 sm:w-9 p-0 transition-all duration-200 ${
                      editor.isActive("bold")
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive("italic") ? "default" : "ghost"}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`h-8 w-8 sm:h-9 sm:w-9 p-0 transition-all duration-200 ${
                      editor.isActive("italic")
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>

                  <div className="w-px h-5 sm:h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={addImage}
                    className="h-8 sm:h-9 px-2 sm:px-3 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    title="Add Image"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="21 15 16 10 5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs font-medium hidden sm:inline">Image</span>
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant={showPicker ? "default" : "ghost"}
                    onClick={() => setShowPicker(!showPicker)}
                    className={`h-8 w-8 sm:h-9 sm:w-9 p-0 transition-all duration-200 ${
                      showPicker
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-md hover:shadow-lg"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    title="Add Emoji"
                  >
                    <Smile className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>

              {/* Emoji Picker */}
              {showPicker && (
                <div className="absolute top-14 sm:top-16 left-2 sm:left-3 z-50 shadow-2xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Picker onEmojiClick={addEmoji} />
                </div>
              )}

              {/* Editor */}
              <div className="">
                <EditorContent
                  editor={editor}
                   className="min-h-[200px] 
                   w-[16rem] sm:w-[16rem] md:w-[42rem] lg:w-[40rem] xl:w-[50rem]  p-3"
                />
                
                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium px-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error.message}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};