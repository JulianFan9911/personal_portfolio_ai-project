"use client";

import type { ChatRequestOptions, UIMessage } from "ai";
import { motion } from "framer-motion";
import type React from "react";
import {
  useRef,
  useEffect,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";
import { toast } from "sonner";
import { useLocalStorage, useWindowSize } from "usehooks-ts";

import { cn, sanitizeUIMessages } from "@/lib/utils";

import { ArrowUpIcon, StopIcon } from "./icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import suggestedActionsData from "@/data/suggested-actions.json";

const suggestedActions = suggestedActionsData;

export function MultimodalInput({
  chatId,
  input,
  setInput,
  isLoading,
  stop,
  messages,
  setMessages,
  append,
  handleSubmit,
  className,
}: {
  chatId: string;
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  messages: Array<UIMessage>;
  setMessages: Dispatch<SetStateAction<Array<UIMessage>>>;
  append: (
    message: any,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  className?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    "input",
    "",
  );

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      const finalValue = domValue || localStorageInput || "";
      setInput(finalValue);
      adjustHeight();
    }
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const submitForm = useCallback(() => {
    handleSubmit(undefined, {});
    setLocalStorageInput("");

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [handleSubmit, setLocalStorageInput, width]);

  return (
    <div className="relative w-full flex flex-col gap-3">
      {/* Suggested Questions */}
      {messages.length === 0 && (
        <div className="flex flex-col gap-3">
          <div className="glass-card py-3 px-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
              Ask me directly, or click a suggested question below
            </p>
          </div>

          <div className="max-h-[320px] sm:max-h-[280px] overflow-y-auto">
            <div className="grid sm:grid-cols-2 gap-2 w-full pr-1">
              {suggestedActions.map((suggestedAction, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.05 * index }}
                  key={`suggested-action-${suggestedAction.title}-${index}`}
                >
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      append({
                        role: "user",
                        content: suggestedAction.action,
                      });
                    }}
                    className="group text-left bento-card hover:bg-transparent hover:border-accent hover:shadow-bento-hover px-4 py-3 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start transition-all cursor-pointer"
                  >
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-snug">
                      {suggestedAction.title}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 leading-snug transition-colors">
                      {suggestedAction.label}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* User Message Input Form */}
      <div className="relative">
        <Textarea
          ref={textareaRef}
          placeholder="Enter your question..."
          value={input}
          onChange={handleInput}
          className={cn(
            "min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base",
            "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
            "focus:border-accent focus:ring-accent focus:ring-2",
            "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
            "pr-12",
            className,
          )}
          rows={3}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();

              if (isLoading) {
                toast.error("Please wait for the response to complete!");
              } else {
                submitForm();
              }
            }
          }}
        />

        {isLoading ? (
          <Button
            className="rounded-xl p-2 h-fit absolute bottom-2 right-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 cursor-pointer"
            onClick={(event) => {
              event.preventDefault();
              stop();
              setMessages((messages) => sanitizeUIMessages(messages));
            }}
          >
            <StopIcon size={16} className="text-zinc-600 dark:text-zinc-400" />
          </Button>
        ) : (
          <Button
            className="rounded-xl p-2 h-fit absolute bottom-2 right-2 bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            onClick={(event) => {
              event.preventDefault();
              submitForm();
            }}
            disabled={input.length === 0}
          >
            <ArrowUpIcon size={16} className="text-white" />
          </Button>
        )}
      </div>
    </div>
  );
}
