"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Zap, X, Minimize2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface PropertyInfo {
  id: string;
  name: string;
  ai_persona_name: string;
  ai_greeting: string;
  phone: string;
}

export default function WidgetPage({ params }: { params: Promise<{ key: string }> }) {
  const [key, setKey] = useState<string>("");
  const [property, setProperty] = useState<PropertyInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    params.then(({ key: k }) => {
      setKey(k);
      fetch(`/api/widget/property?key=${k}`)
        .then((r) => r.json())
        .then(({ property: p }) => {
          if (p) {
            setProperty(p);
            setMessages([{ role: "assistant", content: p.ai_greeting }]);
          }
        });
    });
  }, [params]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading || !property) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property,
          history: messages,
          message: userMsg,
        }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, content: last.content + chunk }];
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại." },
      ]);
    }

    setLoading(false);
  }

  if (!property) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="w-6 h-6 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-white font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white text-sm">{property.ai_persona_name}</p>
          <p className="text-white/70 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            {property.name}
          </p>
        </div>
        <button onClick={() => setMinimized(!minimized)} className="text-white/70 hover:text-white">
          <Minimize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      {!minimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-3.5 h-3.5 text-violet-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white rounded-tr-sm"
                      : "bg-white text-gray-800 shadow-sm rounded-tl-sm"
                  }`}
                >
                  {msg.content || (
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex gap-2 items-center">
              <input
                className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Nhắn tin..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center disabled:opacity-40 hover:bg-violet-700 transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">Powered by ARIA AI</p>
          </div>
        </>
      )}
    </div>
  );
}
