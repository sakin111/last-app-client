"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Send, Loader2, Lock, ArrowRight } from "lucide-react";
import { askAIAdventure } from "@/services/Dashboard/ai.service";
import { checkSubscription } from "@/services/subscribe/sub.service";
import { getCookie } from "@/services/Auth/tokenHandler";
import Link from "next/link";

interface Message {
    role: "user" | "ai";
    content: string;
}

const AskAIChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: "ai", content: "Hello! I'm your AI Travel Buddy. Ask me anything about your next adventure, destinations, or travel tips!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkStatus = async () => {
            const token = await getCookie("accessToken");
            setIsAuthenticated(!!token);

            if (token) {
                const subscribed = await checkSubscription();
                setIsSubscribed(subscribed);
            } else {
                setIsSubscribed(false);
            }
        };
        checkStatus();
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev: Message[]) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const result = await askAIAdventure(userMessage);
            if (result.success) {
                setMessages((prev: Message[]) => [...prev, { role: "ai", content: result.data || result.message }]);
            } else {
                setMessages((prev: Message[]) => [...prev, { role: "ai", content: "Sorry, I encountered an error: " + result.message }]);
            }
        } catch (error) {
            setMessages((prev: Message[]) => [...prev, { role: "ai", content: "Something went wrong. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (isAuthenticated === false) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] px-4">
                <Card className="max-w-md w-full border-none shadow-2xl bg-gradient-to-br from-card to-accent/10">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                            <Lock className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Login Required</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-muted-foreground">
                            You need to be logged in to chat with our AI Travel Expert.
                        </p>
                        <Link href="/login" className="block w-full">
                            <Button className="w-full py-6 rounded-xl hover:scale-105 transition-transform">
                                Sign In Now
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isSubscribed === false) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] px-4">
                <Card className="max-w-lg w-full overflow-hidden border-none shadow-2xl">
                    <div className="bg-primary p-8 text-primary-foreground relative overflow-hidden">
                        <div className="absolute top-0 right-0 opacity-10 -rotate-12 translate-x-1/4 -translate-y-1/4">
                            <Sparkles className="h-64 w-64" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Premium Feature</h2>
                        <p className="opacity-90">Unlock the full power of AI Travel planning.</p>
                    </div>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-green-500/20 p-1 rounded-full"><ArrowRight className="h-3 w-3 text-green-600" /></div>
                                <p>Unlimited custom travel itineraries</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-green-500/20 p-1 rounded-full"><ArrowRight className="h-3 w-3 text-green-600" /></div>
                                <p>24/7 AI Travel Assistant</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-green-500/20 p-1 rounded-full"><ArrowRight className="h-3 w-3 text-green-600" /></div>
                                <p>Priority access to trending destinations</p>
                            </div>
                        </div>
                        <Link href="/subscription" className="block">
                            <Button size="lg" className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                                Upgrade to Premium
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-140px)] flex flex-col">
            <Card className="flex-grow flex flex-col overflow-hidden border-none shadow-xl bg-card/50 backdrop-blur-xl">
                <CardHeader className="border-b border-border/50 bg-background/50 px-6 py-4 flex flex-row items-center gap-4">
                    <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                            <AvatarImage src="/ai-avatar.png" />
                            <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-background rounded-full"></div>
                    </div>
                    <div>
                        <CardTitle className="text-lg">AI Travel Buddy</CardTitle>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                            <Sparkles className="h-3 w-3 text-amber-500" />
                            <span>Powered by GPT-4 Travel Engine</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent
                    ref={scrollRef}
                    className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar"
                >
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-muted text-foreground rounded-tl-none border border-border/50"
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-muted rounded-2xl rounded-tl-none px-5 py-3 border border-border/50 flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                <span className="text-sm text-muted-foreground">AI is thinking...</span>
                            </div>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="p-4 border-t border-border/50 bg-background/50">
                    <div className="flex w-full items-center gap-2">
                        <Input
                            placeholder="Ask about travel advice, destinations, budgets..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="flex-grow h-12 bg-muted/50 border-none rounded-xl focus-visible:ring-primary/20 text-base"
                            disabled={isLoading}
                        />
                        <Button
                            size="icon"
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="h-12 w-12 rounded-xl shrink-0 hover:scale-105 active:scale-95 transition-all"
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <p className="text-center text-[10px] text-muted-foreground mt-4 uppercase tracking-widest font-bold opacity-50">
                AI responses may vary. Always double check travel requirements.
            </p>
        </div>
    );
};

export default AskAIChat;
