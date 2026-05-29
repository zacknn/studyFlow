import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import Hero from "./components/Hero";
import ServicesGrid from "./components/ServicesGrid";
import InteractiveDemo from "./components/InteractiveDemo";
import AuthCTA from "./components/AuthCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Hero />
          <ServicesGrid />
          <InteractiveDemo />
          <AuthCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}