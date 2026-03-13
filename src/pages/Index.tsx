import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProblemStatement from "@/components/ProblemStatement";
import SolutionSummary from "@/components/SolutionSummary";
import ActionCards from "@/components/ActionCards";
import MapAndFactoids from "@/components/MapAndFactoids";
import UshahidiEmbed from "@/components/UshahidiEmbed";
import WantToTakeAction from "@/components/WantToTakeAction";
import Factoids from "@/components/Factoids";
import CampaignFooter from "@/components/CampaignFooter";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <ProblemStatement />
      <SolutionSummary />
      <ActionCards />
      <MapAndFactoids />
      <UshahidiEmbed />
      <WantToTakeAction />
      <Factoids />
      <CampaignFooter />
    </main>
  );
};

export default Index;
