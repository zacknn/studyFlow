import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import InteractiveDemo from "../components/InteractiveDemo";
import AuthCTA from "../components/AuthCTA";

export default function MarketingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-500/[0.03] dark:bg-rose-500/[0.05] rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-slate-500/[0.02] dark:bg-slate-500/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-24 md:space-y-32">
        <Hero />
        <ServicesGrid />
        <InteractiveDemo />
        <AuthCTA />
      </div>
    </div>
  );
}