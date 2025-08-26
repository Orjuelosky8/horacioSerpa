"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Send, X, Loader, Bot, MessageSquare, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { animatedAiAssistant } from "@/ai/flows/animated-ai-assistant";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16.75 13.96c.25.13.43.2.5.28.07.08.15.18.22.33.07.15.1.28.13.36.03.08.03.18 0 .28-.03.1-.08.2-.13.28-.05.08-.13.15-.25.23s-.25.13-.38.18c-.13.05-.28.08-.46.1-.18.03-.38.03-.58.03-.2 0-.43 0-.68-.03-.25-.03-.5-.08-.75-.13s-.5-.13-.75-.23c-.25-.1-.5-.23-.75-.38s-.48-.33-.7-.5-.43-.4-.6-.6c-.18-.2-.33-.4-.48-.6s-.28-.4-.4-.58c-.13-.18-.23-.38-.3-.55s-.13-.33-.15-.48c-.03-.15-.03-.3 0-.43s.05-.28.1-.4.1-.23.18-.33c.08-.1.15-.18.25-.23.1-.05.2-.08.3-.1.1-.03.2 0 .3 0s.18.03.25.05.13.05.18.08.1.08.13.13c.03.05.05.08.08.1.03.03.03.05.05.08.03.03.03.03.03.03h.03c.03.03.05.05.08.08l.25.43c.13.2.23.4.3.58.08.18.13.3.15.38s.03.15 0 .2c-.03.05-.05.1-.08.13s-.08.05-.13.08c-.05.03-.1.03-.15.03s-.1 0-.15-.03c-.05-.03-.1-.05-.13-.08s-.08-.08-.1-.13c-.03-.05-.05-.1-.08-.15l-.2-.3c-.05-.08-.1-.13-.15-.18-.25-.38-.5-.65-.75-.83s-.5-.28-.75-.3c-.25-.03-.5-.03-.75.03-.25.05-.5.15-.7.3s-.33.3-.43.48c-.1.18-.18.38-.23.58s-.08.4-.08.6c0 .2.03.4.08.6s.1.4.18.58.18.38.3.55c.13.18.28.36.43.55s.33.36.5.53.33.3.5.43c.18.13.36.25.55.36s.38.2.58.28.4.13.6.15c.2.03.4.03.6.03s.4 0 .58-.03c.18-.03.36-.05.53-.1s.33-.1.5-.15.3-.13.43-.2c.15-.08.28-.15.4-.23s.23-.15.3-.23.15-.15.2-.23c.05-.08.08-.13.1-.18s.03-.1.03-.13.03-.08.03-.13c0-.05 0-.1-.03-.15s-.03-.1-.05-.13c-.03-.03-.05-.05-.08-.08s-.08-.05-.1-.08c-.03-.03-.05-.03-.08-.03s-.05 0-.08.03c-.03.03-.05.05-.08.08h-.08c-.03.03-.05.05-.05.08s0 .05.03.08.03.05.05.05.05.03.08.03.05 0 .08-.03c.03-.03.05-.05.08-.08s.05-.05.08-.08.05-.08.08-.13.03-.08.05-.13c.03-.05.03-.1.03-.15s.03-.1.03-.15c0-.05-.03-.1-.05-.13s-.03-.05-.05-.08c-.03-.03-.05-.03-.08-.03z" transform="translate(-1.18 -1.25) scale(1.1 1.1)"/>
  </svg>
);


type ActionButton = {
  id: string;
  icon: React.ReactNode;
  label: string;
  action: () => void;
  isLink?: boolean;
  href?: string;
};

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleChatOpen = () => {
    setIsOpen(!isOpen);
    if(isActionsOpen) setIsActionsOpen(false);
  };
  
  const toggleActionsOpen = () => setIsActionsOpen(!isActionsOpen);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
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
          history: newMessages.map(m => ({
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
          content: "Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    });
  };
  
   const actionButtons: ActionButton[] = [
    {
      id: "ai",
      icon: <Bot className="h-6 w-6" />,
      label: "Asistente IA",
      action: toggleChatOpen,
    },
    {
      id: "whatsapp",
      icon: <WhatsAppIcon />,
      label: "WhatsApp",
      action: () => {},
      isLink: true,
      href: "https://wa.me/NUMERO_DE_TELEFONO", // Reemplazar con el número real
    },
    {
      id: "instagram",
      icon: <Instagram className="h-6 w-6" />,
      label: "Instagram",
      action: () => {},
      isLink: true,
      href: "https://www.instagram.com/horaciojserpa/",
    },
  ];

  const mainButtonIcon = isActionsOpen || isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />;

  const handleMainButtonClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      toggleActionsOpen();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative flex flex-col items-center">
         {isActionsOpen && (
            <div className="absolute bottom-0 right-0 mb-20 flex flex-col gap-4">
              {actionButtons.map((btn, index) => {
                const angle = -90 - index * 45; // Spread buttons in an arc
                const transform = `rotate(${angle}deg) translate(80px) rotate(${-angle}deg)`;

                const buttonEl = (
                  <Button
                    key={btn.id}
                    onClick={btn.action}
                    size="icon"
                    className="h-14 w-14 rounded-full bg-secondary text-secondary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                    style={{ transform, transitionDelay: `${index * 50}ms` }}
                    aria-label={btn.label}
                  >
                    {btn.icon}
                  </Button>
                );

                return btn.isLink ? (
                  <Link href={btn.href!} passHref key={btn.id} legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer">
                      {buttonEl}
                    </a>
                  </Link>
                ) : (
                  buttonEl
                );
              })}
            </div>
          )}
          <Button
            onClick={handleMainButtonClick}
            size="icon"
            className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Abrir opciones de contacto"
            aria-expanded={isActionsOpen}
          >
            {mainButtonIcon}
          </Button>
        </div>
      </div>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-full max-w-sm rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 flex items-center justify-center">
                 <Bot className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-lg">
                Asistente Virtual
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80 pr-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg bg-muted p-3 text-sm">
                    <p>¡Hola! Soy el asistente virtual de Horacio Serpa. ¿En qué puedo ayudarte hoy?</p>
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
                       <Avatar>
                         <AvatarFallback><Bot /></AvatarFallback>
                       </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3 text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p>{message.content}</p>
                    </div>
                     {message.role === "user" && (
                       <Avatar>
                         <AvatarFallback>TÚ</AvatarFallback>
                       </Avatar>
                    )}
                  </div>
                ))}
                {isPending && (
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-3 text-sm">
                      <Loader className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                disabled={isPending}
              />
              <Button type="submit" size="icon" disabled={isPending}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
