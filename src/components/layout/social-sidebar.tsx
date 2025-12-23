import { Twitter, Instagram } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { FaTiktok } from "react-icons/fa";

export default function SocialSidebar() {
  const socialLinks = [
    {
      name: "Twitter / X",
      url: "https://x.com/HoracioJSerpa",
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/horaciojserpa/",
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@horaciojserpa",
      icon: <FaTiktok className="h-5 w-5" />,
    },
  ];

  return (
    <aside className={cn(
        "absolute left-4 md:left-6 top-1/2 z-30 -translate-y-1/2 flex flex-col items-center gap-4"
      )}
      id="social-sidebar"
    >
      <span className="text-sm font-semibold text-primary/80 [writing-mode:vertical-lr] tracking-widest uppercase hidden md:inline">Síguenos</span>
      <div className="h-16 w-px bg-primary/30 hidden md:inline" />
      {socialLinks.map((social) => (
        <Button
          key={social.name}
          variant="ghost"
          size="icon"
          className="text-primary/80 hover:text-primary hover:bg-primary/10 rounded-full"
          asChild
        >
          <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
            {social.icon}
          </a>
        </Button>
      ))}
    </aside>
  );
}
