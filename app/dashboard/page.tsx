import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import InteractiveDemo from "../components/InteractiveDemo";
import AuthCTA from "../components/AuthCTA";

export default function DashboardPage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <InteractiveDemo />
      <AuthCTA />
    </>
  );
}