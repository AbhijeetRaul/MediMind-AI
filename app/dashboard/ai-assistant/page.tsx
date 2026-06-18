"use client";

import { useState } from "react";
import { api } from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistantPage() {
  const [query, setQuery] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const handleAsk =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (!query.trim()) return;

      const userMessage = {
        role: "user" as const,
        content: query,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      try {
        setLoading(true);

        const res =
          await api.post(
            "/ai/ask",
            {
              query,
            }
          );

        setMessages(
          (prev) => [
            ...prev,
            {
              role:
                "assistant",
              content:
                res.data
                  .response,
            },
          ]
        );

        setQuery("");
      } catch {
        toast.error(
          "AI failed to respond"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          AI Medical Assistant
        </h1>

        <p className="text-gray-500">
          Ask symptom-related
          questions
        </p>
      </div>

      <Card className="bg-white rounded-3xl shadow-md p-6 h-[500px] overflow-y-auto">
        <div className="space-y-4">
          {messages.length ===
          0 ? (
            <p className="text-gray-400 text-center mt-20">
              Ask anything
              about symptoms,
              reports or doctor
              suggestions
            </p>
          ) : (
            messages.map(
              (
                message,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className={`max-w-[80%] rounded-3xl px-5 py-4 ${
                    message.role ===
                    "user"
                      ? "ml-auto bg-emerald-600 text-white"
                      : "bg-emerald-50 text-gray-800"
                  }`}
                >
                  {
                    message.content
                  }
                </div>
              )
            )
          )}
        </div>
      </Card>

      <form
        onSubmit={handleAsk}
        className="flex gap-4"
      >
        <Input
          placeholder="Ask about symptoms..."
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
        />

        <Button
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {loading
            ? "Thinking..."
            : "Ask AI"}
        </Button>
      </form>
    </div>
  );
}