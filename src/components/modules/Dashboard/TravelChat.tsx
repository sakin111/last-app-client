"use client";


import  { useEffect, useRef, useState } from "react";
import { getSocket } from "@/lib/socket";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInfo } from "@/services/Auth/getUserInfo";

interface ChatMessage {
  user: string;
  message: string;
  time: string;
}

export default function TravelChat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const socket = getSocket();
    socket.on("connect", () => setSocketConnected(true));
    socket.on("disconnect", () => setSocketConnected(false));
    socket.on("chat-message", (msg: ChatMessage) => {
      setChatMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat-message");
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const socket = getSocket();
    const msg: ChatMessage = {
      user: user?.name || "Anonymous",
      message: chatInput,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("chat-message", msg);
    setChatInput("");
  };

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>
          Travel Chat {socketConnected ? <span className="text-green-500">●</span> : <span className="text-red-500">●</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 overflow-y-auto border rounded p-2 bg-muted/30">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <span className="font-semibold">{msg.user}:</span> {msg.message}
              <span className="text-xs text-muted-foreground ml-2">{msg.time}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Type a message..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
