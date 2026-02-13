"use client";

import type { UIMessage } from "ai";
import { motion } from "framer-motion";
import Image from "next/image";

import { Markdown } from "./markdown";
import { cn } from "@/lib/utils";
import { CDN_ASSETS } from "@/lib/constants";

export const PreviewMessage = ({
  message,
  append,
}: {
  chatId: string;
  message: UIMessage;
  isLoading: boolean;
  append?: (message: any) => Promise<string | null | undefined>;
}) => {
  return (
    <motion.div
      className="w-full mx-auto max-w-3xl group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      <div
        className={cn(
          "flex gap-3 w-full",
          message.role === "user" ? "justify-end" : "justify-start"
        )}
      >
        {/* AI Assistant Avatar - Left side */}
        {message.role === "assistant" && (
          <div className="w-8 h-8 flex items-center rounded-xl justify-center bg-accent shadow-lg shrink-0">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
        )}

        <div
          className={cn(
            "flex flex-col gap-2 max-w-[85%] sm:max-w-[75%]",
            message.role === "user"
              ? "glass-card px-4 py-3 bg-accent text-white border-accent/50"
              : "glass-card px-4 py-3"
          )}
        >
          {/* AI SDK v5: Use parts instead of content */}
          {message.parts && message.parts.length > 0 && (
            <div className="flex flex-col gap-4">
              {message.parts.map((part: any, index: number) => {
                if (part.type === 'text' && part.text) {
                  return (
                    <div
                      key={index}
                      className={cn(
                        message.role === "assistant"
                          ? "text-zinc-700 dark:text-zinc-300"
                          : "text-white"
                      )}
                    >
                      <Markdown
                        variant="chat"
                        onQuestionClick={(question) => {
                          append?.({
                            role: 'user',
                            content: question,
                          });
                        }}
                      >
                        {part.text}
                      </Markdown>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>

        {/* User Avatar - Right side */}
        {message.role === "user" && (
          <div className="w-8 h-8 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700 shrink-0">
            <Image
              src={CDN_ASSETS.PROFILE_PHOTO}
              alt="User Profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const ThinkingMessage = () => {
  const role = "assistant";

  return (
    <motion.div
      className="w-full mx-auto max-w-3xl group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}
    >
      <div className="flex gap-3 w-full justify-start">
        <div className="w-8 h-8 flex items-center rounded-xl justify-center bg-accent shadow-lg shrink-0">
          <span className="text-white text-xs font-bold">AI</span>
        </div>

        <div className="glass-card px-4 py-3">
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm">Thinking...</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
