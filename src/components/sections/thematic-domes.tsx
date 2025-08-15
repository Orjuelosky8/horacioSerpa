
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, BookHeart, Stethoscope, Briefcase, ShieldCheck, Leaf, ArrowRight, X } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const proposals = [
  {
    id: 'justicia',
    icon: Scale,
    title: "Justicia",
    description: "Fortalecimiento del sistema judicial para una justicia más rápida, transparente y accesible para todos.",
    details: [
        "Modernización de la infraestructura judicial.",
        "Implementación de expedientes digitales.",
        "Fortalecimiento de la defensoría pública.",
        "Programas de acceso a la justicia en zonas rurales."
    ],
    pdfUrl: "/propuestas/justicia.pdf",
  },
  {
    id: 'educacion',
    icon: BookHeart,
    title: "Educación",
    description: "Inversión en educación de calidad desde la primera infancia hasta la universidad, con enfoque en tecnología.",
    details: [
        "Cobertura universal en educación preescolar.",
        "Bilingüismo y formación en habilidades digitales.",
        "Becas y créditos condonables para educación superior.",
        "Infraestructura y conectividad para colegios públicos."
    ],
    pdfUrl: "/propuestas/educacion.pdf",
  },
  {
    id: 'salud',
    icon: Stethoscope,
    title: "Salud",
    description: "Un sistema de salud preventivo y eficiente que garantice cobertura universal y atención digna en todo el territorio.",
    details: [
        "Enfoque en la medicina preventiva y la salud mental.",
        "Equipos de salud en casa para zonas apartadas.",
        "Reducción de los tiempos de espera para especialistas.",
        "Transparencia en el manejo de los recursos de la salud."
    ],
    pdfUrl: "/propuestas/salud.pdf",
  },
  {
    id: 'empleo',
    icon: Briefcase,
    title: "Empleo",
    description: "Creación de empleos de calidad a través del apoyo a emprendedores, la industria nacional y la inversión.",
    details: [
        "Incentivos tributarios para la contratación de jóvenes.",
        "Apoyo al emprendimiento y a las PYMES.",
        "Inversión en sectores estratégicos como el turismo y la tecnología.",
        "Programas de formación para el trabajo."
    ],
    pdfUrl: "/propuestas/empleo.pdf",
  },
  {
    id: 'derechos-humanos',
    icon: ShieldCheck,
    title: "Derechos Humanos",
    description: "Protección y promoción de los derechos humanos como pilar fundamental de una sociedad pacífica y equitativa.",
    details: [
        "Fortalecimiento de la Defensoría del Pueblo.",
        "Lucha contra la discriminación y la violencia de género.",
        "Protección a líderes sociales y defensores de DDHH.",
        "Políticas de inclusión para minorías."
    ],
    pdfUrl: "/propuestas/derechos-humanos.pdf",
  },
  {
    id: 'medio-ambiente',
    icon: Leaf,
    title: "Medio Ambiente",
    description: "Políticas para la protección de nuestra biodiversidad, el fomento de energías limpias y el desarrollo sostenible.",
    details: [
        "Transición hacia energías limpias y renovables.",
        "Protección de páramos, selvas y fuentes hídricas.",
        "Lucha frontal contra la deforestación.",
        "Incentivos a la producción y consumo sostenible."
    ],
    pdfUrl: "/propuestas/medio-ambiente.pdf",
  },
];

type Proposal = typeof proposals[0];

function FlipCard({ proposal, onOpenModal }: { proposal: Proposal, onOpenModal: () => void }) {
    return (
      <div className="group w-full h-80 [perspective:1000px]">
        <div className="relative h-full w-full rounded-xl shadow-lg transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front Face */}
          <div className="absolute inset-0">
            <Card className="h-full text-center flex flex-col items-center justify-center bg-card">
              <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <proposal.icon className="h-8 w-8" />
                  </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="font-headline text-2xl">{proposal.title}</CardTitle>
                <p className="mt-3 text-muted-foreground">{proposal.description}</p>
              </CardContent>
            </Card>
          </div>
          {/* Back Face */}
          <div className="absolute inset-0 h-full w-full rounded-xl bg-background text-foreground [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <Card className="h-full flex flex-col justify-between p-6">
                <div>
                    <CardTitle className="font-headline text-2xl text-primary">{proposal.title}</CardTitle>
                    <p className="mt-2 text-sm font-semibold text-muted-foreground">Puntos clave:</p>
                    <ul className="mt-2 space-y-2 text-sm list-disc pl-5 text-muted-foreground">
                        {proposal.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4 text-center">
                    <Button variant="outline" onClick={onOpenModal}>
                        Conoce más <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </Card>
          </div>
        </div>
      </div>
    );
}

function PdfViewerModal({ 
    isOpen, 
    onOpenChange, 
    proposals, 
    selectedProposal, 
    setSelectedProposal 
}: { 
    isOpen: boolean, 
    onOpenChange: (isOpen: boolean) => void,
    proposals: Proposal[],
    selectedProposal: Proposal | null,
    setSelectedProposal: (proposal: Proposal) => void,
}) {
    if (!selectedProposal) return null;

    const handleSelectChange = (proposalId: string) => {
        const newProposal = proposals.find(p => p.id === proposalId);
        if (newProposal) {
            setSelectedProposal(newProposal);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl w-[90%] h-[90vh] flex flex-col p-0">
            <DialogHeader className="p-4 border-b flex-row justify-between items-center flex-shrink-0">
              <DialogTitle className="font-headline flex-grow">
                <Select value={selectedProposal.id} onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full md:w-[300px] text-lg">
                    <SelectValue placeholder="Selecciona una propuesta" />
                  </SelectTrigger>
                  <SelectContent>
                    {proposals.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </DialogTitle>
              
              {/* Botón de cierre con hover */}
              <DialogClose asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-yellow-400 hover:border-yellow-500 hover:text-black border border-transparent rounded-full p-2"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Cerrar</span>
                </Button>
              </DialogClose>
            </DialogHeader>

                <div className="flex-grow p-4 pt-0">
                    <iframe 
                        src={selectedProposal.pdfUrl}
                        className="w-full h-full border-0 rounded-b-lg"
                        title={`Propuesta ${selectedProposal.title}`}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}


export default function ThematicDomes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const handleOpenModal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };
  
  const handleSetSelected = (proposal: Proposal) => {
    setSelectedProposal(proposal);
  };

  return (
    <section id="propuestas" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Nuestras Propuestas
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Pilares para construir la Colombia que soñamos: un país con justicia, oportunidades y bienestar para todos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proposals.map((proposal) => (
            <FlipCard key={proposal.id} proposal={proposal} onOpenModal={() => handleOpenModal(proposal)} />
          ))}
        </div>
      </div>
       <PdfViewerModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          proposals={proposals}
          selectedProposal={selectedProposal}
          setSelectedProposal={handleSetSelected}
        />
    </section>
  );
}
