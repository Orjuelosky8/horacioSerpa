"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Send, X, Loader, Bot, MessageSquare, Instagram } from "lucide-react";
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
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WhatsAppIcon = () => <FaWhatsapp className="w-6 h-6" />;

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
    if (isActionsOpen) setIsActionsOpen(false);
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
      action: () => { },
      isLink: true,
      href: "https://wa.me/NUMERO_DE_TELEFONO",
    },
    {
      id: "instagram",
      icon: <Instagram className="h-6 w-6" />,
      label: "Instagram",
      action: () => { },
      isLink: true,
      href: "https://www.instagram.com/horaciojserpa/",
    },
  ];

  // ====== NUEVAS CONSTANTES PARA POSICIONAMIENTO RADIAL ======
  // Tailwind: h-16 => 64px, h-14 => 56px
  const FAB_SIZE = 84;
  const ITEM_SIZE = 66;
  const RADIUS = 80; // distancia desde el centro del FAB
  // Personalizar ángulos; estos son en grados, medidos desde el eje +X (derecha), sentido antihorario
  // const start = 210, end = 330;
  // const ANGLES = actionButtons.map((_, i) =>
  //   start + (i * (end-start)) / (actionButtons.length - 1)
  // );
  const ANGLES = [185, 130, 75];

  return (
    <>
      {/* ====== FAB + MENÚ RADIAL ====== */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pivote cuadrado exactamente del tamaño del FAB */}
        <div className="relative" style={{ width: FAB_SIZE, height: FAB_SIZE }}>
          {/* Items radiales con animación desde el FAB */}
          <AnimatePresence>
            {isActionsOpen &&
              actionButtons.map((btn, i) => {
                const a = ((ANGLES[i] ?? 0) * Math.PI) / 180;
                const x = Math.cos(a) * RADIUS; // derecha +
                const y = Math.sin(a) * RADIUS; // arriba + (lo negamos en y final)

                return (
                  <motion.button
                    key={btn.id}
                    onClick={() => {
                      if (btn.isLink && btn.href) {
                        window.open(btn.href, "_blank", "noopener,noreferrer");
                      } else {
                        btn.action();
                      }
                    }}
                    aria-label={btn.label}
                    className="absolute pointer-events-auto h-14 w-14 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:scale-110 hover:bg-primary hover:text-primary-foreground flex items-center justify-center"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    // nacen del centro del FAB
                    initial={{ x: -ITEM_SIZE / 2, y: -ITEM_SIZE / 2, opacity: 0, scale: 0.6 }}
                    animate={{ x: x - ITEM_SIZE / 2, y: -y - ITEM_SIZE / 2, opacity: 1, scale: 1 }}
                    exit={{ x: -ITEM_SIZE / 2, y: -ITEM_SIZE / 2, opacity: 0, scale: 0.6 }}
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 32,
                      mass: 0.6,
                      delay: i * 0.06, // escalonado
                    }}
                  >
                    <span className="sr-only">{btn.label}</span>
                    <div className="h-6 w-6 flex items-center justify-center">{btn.icon}</div>
                  </motion.button>
                );
              })}
          </AnimatePresence>


          {/* FAB principal EXACTAMENTE en el centro del pivote */}
          <Button
            onClick={() => {
              if (isOpen) setIsOpen(false);
              else setIsActionsOpen((v) => !v);
            }}
            size="icon"
            className="absolute h-[75px] w-[75px] scale-105 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-110"
            aria-label="Abrir opciones de contacto"
            aria-expanded={isActionsOpen}
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          >
            {isActionsOpen || isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
          </Button>
        </div>
      </div>


      {/* ====== CHAT ====== */}
      {
        isOpen && (
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
                      <AvatarFallback>
                        <Bot />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-3 text-sm">
                      <p>
                        ¡Hola! Soy el asistente virtual de Horacio Serpa. ¿En qué
                        puedo ayudarte hoy?
                      </p>
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
                          <AvatarFallback>
                            <Bot />
                          </AvatarFallback>
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
                        <AvatarFallback>
                          <Bot />
                        </AvatarFallback>
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
        )
      }
    </>
  );
}