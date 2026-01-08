import Hero from "./components/Hero";
import ServicesGrid from "./components/ServicesGrid";
import InteractiveDemo from "./components/InteractiveDemo";
import AuthCTA from "./components/AuthCTA";

export default function Home() {
  return (
    <>
      {/* this is my 5 time that i make this project and this time i wont fail . but to be clear this landing page is just with ai . it still have some stuff to do . i will work on them after i stup everithing  */}
      <Hero />
      <ServicesGrid />
      <InteractiveDemo />
      <AuthCTA />
    </>
  );
}