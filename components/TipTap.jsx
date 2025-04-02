"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

export default function Tiptap({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, BulletList, OrderedList, ListItem],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded p-2 min-h-[150px]">
      {/* Toolbar */}
      <div className="mb-2 flex gap-2 border-b pb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 border rounded ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 border rounded ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 border rounded ${editor.isActive("bulletList") ? "bg-gray-300" : ""}`}
        >
          • Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 border rounded ${editor.isActive("orderedList") ? "bg-gray-300" : ""}`}
        >
          1. Numbered List
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
