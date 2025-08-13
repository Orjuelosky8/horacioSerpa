"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bot, Loader, PlayCircle, Send, User } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { animatedAiAssistant } from "@/ai/flows/animated-ai-assistant";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AiChatVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')!.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
    setInput("");

    startTransition(async () => {
      try {
        const result = await animatedAiAssistant({
          query: currentInput,
          history: newMessages.map((m) => ({
            role: m.role,
            content: [{ text: m.content }],
          })),
        });
        const assistantMessage: Message = {
          role: "assistant",
          content: result.response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error(error);
        const errorMessage: Message = {
          role: "assistant",
          content:
            "Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    });
  };


  return (
    <section id="ai-interaction" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Interactúa con la Campaña
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Resuelve tus dudas con nuestro asistente virtual y conoce más sobre nuestra visión en el siguiente video.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna de Video */}
          <div className="w-full aspect-video relative rounded-2xl overflow-hidden shadow-2xl group">
            {isPlaying ? (
              <video
                src="https://placehold.co/1920x1080.mp4"
                className="w-full h-full object-cover"
                controls
                autoPlay
              />
            ) : (
              <>
                <Image
                  src="https://placehold.co/1920x1080.png"
                  alt="Video thumbnail"
                  layout="fill"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint="political speech"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-24 w-24 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 group-hover:scale-110"
                        onClick={() => setIsPlaying(true)}
                        aria-label="Reproducir video"
                    >
                        <PlayCircle className="h-16 w-16 text-white" />
                    </Button>
                    <h3 className="font-headline text-3xl mt-4">Nuestra Visión para Colombia</h3>
                    <p className="mt-2 max-w-md text-white/80">Un mensaje de Horacio Serpa sobre el futuro que podemos construir juntos.</p>
                </div>
              </>
            )}
          </div>

          {/* Columna de Chatbot */}
          <Card className="w-full max-w-lg mx-auto bg-background shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-primary text-primary-foreground p-4">
              <h3 className="font-headline text-xl text-center">Chatea con Horacio IA</h3>
            </div>
            <CardContent className="p-0">
                <ScrollArea className="h-96 relative" ref={scrollAreaRef}>
                  <div className="p-4 space-y-4">
                    <div 
                        className="absolute inset-0 bg-repeat opacity-5"
                        style={{backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none'/%3e%3cpath d='M0 60C10.5 45.5 21.5 30.5 32 30C42.5 29.5 53.5 44 64 45C74.5 46 85.5 32.5 96 32C106.5 31.5 117.5 45.5 128 46C138.5 46.5 149.5 33 160 33' stroke='hsl(var(--primary))' stroke-width='2' stroke-linecap='square'/%3e%3c/svg%3e")`, backgroundSize: '100px 100px'}} 
                    />
                    
                    {/* Mensaje de bienvenida */}
                    <div className="flex items-start gap-3">
                        <Avatar className="flex-shrink-0 h-8 w-8 bg-primary text-primary-foreground">
                            <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                        <div className="bg-background rounded-lg p-3 text-sm max-w-[80%] shadow">
                            <p>¡Hola! Soy el asistente virtual de Horacio Serpa. Estoy aquí para responder tus preguntas sobre su trayectoria y propuestas. ¿Cómo puedo ayudarte?</p>
                        </div>
                    </div>
                     {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-start gap-3",
                          message.role === "user" ? "justify-end" : ""
                        )}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="flex-shrink-0 h-8 w-8 bg-primary text-primary-foreground">
                            <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg p-3 text-sm shadow",
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-background"
                          )}
                        >
                          <p>{message.content}</p>
                        </div>
                        {message.role === "user" && (
                          <Avatar className="flex-shrink-0 h-8 w-8 bg-muted text-muted-foreground">
                            <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    {isPending && (
                      <div className="flex items-start gap-3">
                        <Avatar className="flex-shrink-0 h-8 w-8 bg-primary text-primary-foreground">
                            <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                        <div className="bg-background rounded-lg p-3 text-sm shadow">
                          <Loader className="h-5 w-5 animate-spin" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input 
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Escribe tu pregunta aquí..." 
                          className="flex-1" 
                          disabled={isPending}
                        />
                        <Button type="submit" size="icon" disabled={isPending}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
