"use client";

import type { UIMessage } from "ai";
import { motion } from "framer-motion";
import Image from "next/image";

import { SparklesIcon } from "./icons";
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
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      <div
        className={cn(
          "flex gap-4 w-full rounded-xl",
          message.role === "user"
            ? "bg-gradient-to-r from-primary to-highlight text-white px-4 py-3 ml-auto w-fit max-w-2xl shadow-lg shadow-primary/50"
            : ""
        )}
      >
        {/* AI Assistant Avatar - Left side */}
        {message.role === "assistant" && (
          <div className="size-8 flex items-center rounded-full justify-center bg-gradient-to-br from-primary to-highlight shadow-lg shadow-primary/50 shrink-0">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          {/* AI SDK v5: 使用 parts 而不是 content */}
          {message.parts && message.parts.length > 0 && (
            <div className="flex flex-col gap-4">
              {message.parts.map((part: any, index: number) => {
                if (part.type === 'text' && part.text) {
                  return (
                    <div key={index} className={message.role === "assistant" ? "text-text-primary" : ""}>
                      <Markdown
                        variant="chat"
                        onQuestionClick={(question) => {
                          // QUESTION CLICK HANDLER:
                          // When user clicks a #ask: link in AI response,
                          // append the question to current chat conversation
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
          <div className="size-8 rounded-full overflow-hidden shadow-lg border-2 border-primary/50 shrink-0">
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
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}
    >
      <div className="flex gap-4 w-full rounded-xl">
        <div className="size-8 flex items-center rounded-full justify-center bg-gradient-to-br from-primary to-highlight shadow-lg shadow-primary/50 shrink-0">
          <span className="text-white text-sm font-bold">AI</span>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-4 text-text-secondary">
            thinking ...
          </div>
        </div>
      </div>
    </motion.div>
  );
};
