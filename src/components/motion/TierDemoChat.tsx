import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Loader2 } from "lucide-react";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/demo-chat`;

type Msg = { role: "user" | "assistant"; content: string };

interface TierDemoChatProps {
  tierName: string;
  tierKey: string;
  accentColor: string;
  onClose: () => void;
}

export const TierDemoChat = ({ tierName, tierKey, accentColor, onClose }: TierDemoChatProps) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [htmlPreview, setHtmlPreview] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const extractHTML = (text: string): string | null => {
    const codeBlockMatch = text.match(/```(?:html)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) return codeBlockMatch[1].trim();
    const divMatch = text.match(/(<div[\s\S]*<\/div>)/i);
    if (divMatch) return divMatch[1];
    return null;
  };

  const send = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Msg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages, tier: tierKey }),
      });

      if (!resp.ok || !resp.body) {
        const errorText = resp.status === 429
          ? "Too many requests — please wait a moment."
          : resp.status === 402
          ? "Usage limit reached."
          : "Something went wrong. Try again.";
        setMessages((prev) => [...prev, { role: "assistant", content: errorText }]);
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      const upsertAssistant = (chunk: string) => {
        assistantSoFar += chunk;
        // Try to extract HTML as it streams
        const html = extractHTML(assistantSoFar);
        if (html) setHtmlPreview(html);

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
          }
          return [...prev, { role: "assistant", content: assistantSoFar }];
        });
      };

      let streamDone = false;
      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final extraction
      const finalHtml = extractHTML(assistantSoFar);
      if (finalHtml) setHtmlPreview(finalHtml);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    }

    setIsLoading(false);
  };

  const userMessages = messages.filter((m) => m.role === "user");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: `${accentColor}15` }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
          <span className="text-xs font-mono tracking-[0.15em] uppercase text-foreground/70">
            {tierName} — AI Demo
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-muted/20"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Main preview area */}
      <div className="flex-1 min-h-0 relative">
        <AnimatePresence mode="wait">
          {isLoading && !htmlPreview ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            >
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: `${accentColor}60` }} />
              <p className="text-sm text-muted-foreground/50 font-mono tracking-wider">
                Generating your demo...
              </p>
            </motion.div>
          ) : htmlPreview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 p-3"
            >
              <iframe
                srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a14;color:#e0e0e0}</style></head><body>${htmlPreview}</body></html>`}
                className="w-full h-full rounded-lg"
                style={{ border: `1px solid ${accentColor}15`, background: "#0a0a14" }}
                sandbox="allow-scripts"
                title="Demo Preview"
              />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            >
              <Sparkles className="w-10 h-10" style={{ color: `${accentColor}30` }} />
              <p className="text-sm text-muted-foreground/50 max-w-xs text-center">
                Describe what you'd like to see and I'll generate a live preview.
              </p>
              <p className="text-[10px] font-mono text-muted-foreground/25 tracking-wider">
                Try: "A product card with hover effects"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User prompt pills + Input */}
      <div className="px-3 pt-2 pb-3 border-t" style={{ borderColor: `${accentColor}10` }}>
        {userMessages.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {userMessages.map((m, i) => (
              <span
                key={i}
                className="text-[10px] px-2.5 py-1 rounded-full truncate max-w-[200px]"
                style={{ background: `${accentColor}10`, color: `${accentColor}90`, border: `1px solid ${accentColor}15` }}
              >
                {m.content}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            placeholder="Describe your demo..."
            className="flex-1 bg-transparent text-sm px-3 py-2 rounded-lg outline-none placeholder:text-muted-foreground/30"
            style={{ border: `1px solid ${accentColor}15` }}
          />
          <button
            onClick={send}
            disabled={isLoading || !input.trim()}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
            style={{ background: `${accentColor}15`, color: accentColor }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
