"use client";

import { Plus, MessageSquare, Trash2, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Chat {
  id: string;
  title: string | null;
  updatedAt: Date;
}

interface AISidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
}

export function AISidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}: AISidebarProps) {
  return (
    <div className="w-64 flex flex-col border-r border-slate-800/60 bg-slate-900/50 shrink-0">
      {/* Header */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-rose-500/20 border border-rose-500/30 rounded-lg flex items-center justify-center shrink-0">
            <Bot className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <span className="text-sm font-semibold text-slate-200">AI Tutor</span>
        </div>

        <button
          onClick={onNewChat}
          className="flex items-center gap-2 w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4 shrink-0" />
          New Chat
        </button>
      </div>

      <div className="h-px bg-slate-800/60 mx-3" />

      {/* Chat list */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-0.5">
          {chats.length === 0 && (
            <p className="text-xs text-slate-600 text-center py-8 px-4">
              No conversations yet. Start a new chat!
            </p>
          )}

          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "group flex items-center gap-2.5 rounded-xl px-2.5 py-2 cursor-pointer transition-colors",
                activeChatId === chat.id
                  ? "bg-slate-700/80 text-white"
                  : "text-slate-500 hover:bg-slate-800/60 hover:text-slate-300",
              )}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="flex-1 text-xs truncate">
                {chat.title ?? "New Chat"}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-rose-400 transition-opacity shrink-0"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
