import { Twitter, Instagram, Facebook } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

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
      icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.92-2.3-4.45-2.2-6.87.02-1.11.23-2.21.72-3.26.49-1.05 1.24-1.97 2.19-2.73.95-.76 2.06-1.32 3.23-1.66.02-3.12.02-6.23.01-9.35.01-1.6.93-3.16 2.4-3.95a4.5 4.5 0 0 1 4.78.01c.8.45 1.36 1.25 1.62 2.16.27.91.31 1.86.1 2.78-1.46-.04-2.92-.02-4.38-.02-.02-1.48-.46-2.93-1.63-3.95-1.2-1.04-2.9-.84-4.06.39-.77.83-1.12 1.9-1.11 3.03.01 6.31.01 12.62.01 18.93-.01.91.26 1.81.82 2.53.56.72 1.38 1.16 2.27 1.26.89.1 1.79-.18 2.59-.72.8-.54 1.34-1.36 1.58-2.28.24-.92.25-1.87.04-2.8-.01-3.33.01-6.66-.02-9.99z"></path></svg>,
    },
  ];

  return (
    <aside className={cn(
        "fixed left-4 md:left-6 top-1/2 z-30 -translate-y-1/2 hidden sm:flex flex-col items-center gap-4",
        // Ocultar al hacer scroll hacia abajo
        "transition-opacity duration-300 opacity-100"
      )}
      id="social-sidebar"
    >
      <span className="text-sm font-semibold text-white/80 [writing-mode:vertical-lr] tracking-widest uppercase">Síguenos</span>
      <div className="h-16 w-px bg-white/30" />
      {socialLinks.map((social) => (
        <Button
          key={social.name}
          variant="ghost"
          size="icon"
          className="text-white/80 hover:text-white hover:bg-white/10 rounded-full"
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

const useScrollObserver = () => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
        const sidebar = document.getElementById('social-sidebar');
        if (!sidebar) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sidebar.classList.remove('opacity-0');
            } else {
                sidebar.classList.add('opacity-0');
            }
        });
    });

    const target = document.querySelector('#manifesto-section');
    if (target) {
        observer.observe(target);
    }
}
