"use client";

import { PreviewMessage, ThinkingMessage } from "./message";
import { MultimodalInput } from "./multimodal-input";
import { Overview } from "./overview";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export function Chat() {
  const chatId = "001";

  // AI SDK v5: 手动管理 input 状态
  const [input, setInput] = useState("");
  const [isContextBannerVisible, setIsContextBannerVisible] = useState(true);

  /**
   * Store browser fingerprint in useRef instead of useState
   *
   * Why useRef instead of useState?
   * - useState causes re-renders when updated, but we don't need re-rendering for the fingerprint
   * - useRef.current always holds the latest value, even in closures (critical for fetch interceptor)
   * - The fetch interceptor is defined once in useEffect, so it captures the ref object
   * - When we later update ref.current, the interceptor reads the latest value
   *
   * Previous attempts that FAILED:
   * 1. useState + useChat headers option → AI SDK v5 doesn't support 'headers' option
   * 2. useState + useChat fetch option → AI SDK v5 doesn't support custom 'fetch' option
   * 3. useState with closure → Closure captured initial empty string, never updated
   */
  const browserFingerprintRef = useRef<string>("");

  /**
   * Generate browser fingerprint and intercept fetch requests
   *
   * This useEffect does TWO critical things:
   * 1. Generates a unique browser fingerprint using FingerprintJS
   * 2. Intercepts all fetch requests to inject the fingerprint header
   */
  useEffect(() => {
    /**
     * Generate browser fingerprint using FingerprintJS library
     *
     * FingerprintJS analyzes browser characteristics to create a unique ID:
     * - Canvas fingerprint (browser rendering differences)
     * - WebGL fingerprint (GPU characteristics)
     * - Audio fingerprint (audio processing differences)
     * - Screen resolution, timezone, language, fonts, etc.
     *
     * Result: 99.5% unique identifier across different browsers/devices
     */
    const generateFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        browserFingerprintRef.current = result.visitorId;
        console.log('🔍 Browser Fingerprint Generated:', result.visitorId);
      } catch (error) {
        console.error('Failed to generate browser fingerprint:', error);
      }
    };

    generateFingerprint();

    /**
     * Intercept window.fetch to inject fingerprint header
     *
     * WHY THIS APPROACH?
     * - AI SDK v5's useChat hook does NOT support custom headers or fetch options
     * - TypeScript errors showed: 'headers' and 'fetch' are not valid UseChatOptions
     * - Solution: Monkey-patch window.fetch to intercept ALL fetch calls
     *
     * HOW IT WORKS:
     * 1. Save original fetch function
     * 2. Replace window.fetch with our custom function
     * 3. Our function checks if the request is to /api/chat
     * 4. If yes, inject X-Client-Fingerprint header
     * 5. Call original fetch with modified headers
     * 6. On component unmount, restore original fetch (cleanup)
     *
     * PREVIOUS FAILED ATTEMPTS:
     * ❌ Attempt 1: useChat({ headers: {...} })
     *    → Error: 'headers' does not exist in type 'UseChatOptions'
     *
     * ❌ Attempt 2: useChat({ fetch: customFetch })
     *    → Error: 'fetch' does not exist in type 'UseChatOptions'
     *
     * ❌ Attempt 3: useState + closure in custom fetch
     *    → Closure captured empty string, never updated even after fingerprint generated
     *
     * ✅ Current solution: useRef + fetch interceptor
     *    → Works because ref.current is always up-to-date in the interceptor
     */
    const originalFetch = window.fetch;
    window.fetch = async (input, init?) => {
      // Only intercept requests to our chat API
      if (typeof input === 'string' && input.includes('/api/chat')) {
        const fingerprint = browserFingerprintRef.current;
        // Initialize headers if not present
        init = init || {};
        init.headers = {
          ...init.headers,
          'X-Client-Fingerprint': fingerprint,
        };
      }
      return originalFetch(input, init);
    };

    /**
     * Cleanup function: restore original fetch when component unmounts
     * This prevents memory leaks and unexpected behavior in other parts of the app
     */
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  /**
   * AI SDK v5's useChat hook
   *
   * Note: This looks simple because the complexity is handled by the fetch interceptor above
   * - No custom headers needed here (handled by window.fetch override)
   * - No custom fetch option needed (not supported by AI SDK v5 anyway)
   * - The fingerprint header is automatically injected for every /api/chat request
   */
  const {
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
  } = useChat({
    // v5: Defaults to /api/chat endpoint
    // Custom headers are transparently added via the fetch interceptor in useEffect above
    /**
     * Error handler for chat requests
     *
     * When backend rate limiting kicks in (based on browser fingerprint):
     * - Backend returns HTTP 429 (Too Many Requests) status
     * - Error message contains keywords: "Too many requests", "Rate limit", or "429"
     * - Show user-friendly message in English (as requested)
     * - Duration: 8 seconds (long enough to read the 60-minute wait time)
     */
    onError: (error) => {
      if (error.message.includes("Too many requests") || error.message.includes("Rate limit") || error.message.includes("429")) {
        toast.error(
          "You have reached the usage limit, please try again in 60 minutes 😅",
          { duration: 8000 }
        );
      } else {
        toast.error(error.message);
      }
    },
  });

  // v5: isLoading 改为 status
  const isLoading = status === "streaming" || status === "submitted";

  // v5: 自定义 handleSubmit 和 append
  const handleSubmit = (e?: { preventDefault?: () => void }, options?: any) => {
    e?.preventDefault?.();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const append = async (message: any): Promise<string | null | undefined> => {
    if (message.content) {
      await sendMessage({ text: message.content });
      return null;
    } else if (message.text) {
      await sendMessage({ text: message.text });
      return null;
    }
    return null;
  };

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  /**
   * Scroll to bottom ONLY when new messages are added
   *
   * This ensures that:
   * 1. When user presses Enter and sends a message → scroll to see their message
   * 2. When AI starts responding (new message added) → scroll once to show AI response
   * 3. While user is typing → NO scrolling (prevents UI jumping)
   * 4. While AI is streaming text → NO constant scrolling (prevents jitter)
   *
   * Uses requestAnimationFrame to ensure DOM has updated before scrolling
   */
  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      // Use requestAnimationFrame to wait for DOM update
      // This ensures the new message has been rendered before scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      });
    }
  }, [messages.length]); // ONLY trigger when a new message is added, not when content changes

  return (
    <div className="flex flex-col min-w-0 h-[calc(100dvh-52px)] bg-background">
      <div
        ref={messagesContainerRef}
        className="flex flex-col min-w-0 gap-2 flex-1 overflow-y-scroll pt-4"
      >
        {/* Initial AI Assistant Welcome Display */}
        {messages.length === 0 && <Overview />}

        {/* Context Banner */}
        {messages.length > 0 && isContextBannerVisible && (
          <div className="max-w-3xl mx-auto px-4 w-full">
            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-primary/30 rounded-xl p-4 shadow-lg shadow-primary/10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-highlight rounded-lg flex items-center justify-center shadow-lg shadow-primary/50 shrink-0 mt-0.5">
                    <span className="text-lg font-bold text-white">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white">AI Assistant</h3>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-xs text-text-secondary">johndoe.me</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      I'm here to help you understand <span className="font-semibold text-primary glow-primary">John Doe</span>'s unique value as a senior AI architect and his proven track record in delivering enterprise solutions.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsContextBannerVisible(false)}
                  className="text-text-secondary hover:text-primary transition-colors shrink-0"
                  aria-label="关闭"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message, index) => (
          <PreviewMessage
            key={message.id}
            chatId={chatId}
            message={message}
            isLoading={isLoading && messages.length - 1 === index}
            append={append}
          />
        ))}

        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && <ThinkingMessage />}

        {/* Auto-scroll anchor - Always rendered to ensure scrolling works */}
        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>

      <form className="flex mx-auto px-4 pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <MultimodalInput
          chatId={chatId}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
          messages={messages}
          setMessages={setMessages}
          append={append}
        />
      </form>
    </div>
  );
}
