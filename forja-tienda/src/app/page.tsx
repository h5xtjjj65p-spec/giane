import HeroLove from "@/components/HeroLove";
import LoveStory from "@/components/LoveStory";
import Memories from "@/components/Memories";
import LoveLetter from "@/components/LoveLetter";
import RelationshipCounter from "@/components/RelationshipCounter";
import Reasons from "@/components/Reasons";
import FutureReveal from "@/components/FutureReveal";
import FinalMessage from "@/components/FinalMessage";
import ExperienceShell from "@/components/ExperienceShell";
import SectionNavigator from "@/components/SectionNavigator";
import SectionMusicManager from "@/components/SectionMusicManager";
import FloatingBackground from "@/components/FloatingBackground";
import { relationship } from "@/data/relationship";
import type { SectionMeta } from "@/lib/experience-context";

const sections: SectionMeta[] = [
  { id: "inicio", label: "Inicio" },
  { id: "historia", label: "Historia" },
  { id: "recuerdos", label: "Recuerdos" },
  { id: "carta", label: "Carta" },
  { id: "contador", label: "Nosotros" },
  { id: "razones", label: "Razones" },
  { id: "futuro", label: "Futuro" },
  { id: "final", label: "Final" },
];

export default function Home() {
  return (
    <>
      <FloatingBackground />
      <ExperienceShell
        sections={sections}
        overlay={
          <>
            <SectionNavigator herName={relationship.herName} />
            <SectionMusicManager />
          </>
        }
      >
        <main className="relative z-10">
          <HeroLove herName={relationship.herName} />
          <LoveStory />
          <Memories />
          <LoveLetter />
          <RelationshipCounter />
          <Reasons />
          <FutureReveal />
          <FinalMessage />
        </main>
      </ExperienceShell>
    </>
  );
}
