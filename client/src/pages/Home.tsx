/**
 * Home page: composes all portfolio sections in reference order and wires
 * the global scroll-reveal hook.
 */
import { Hero } from "../components/Hero";
import { Workflows } from "../components/Workflows";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { SampleProjectCollection } from "../components/SampleProjectCollection";
import { Experience } from "../components/Experience";
import { Reviews } from "../components/Reviews";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { useReveal } from "../hooks/useReveal";

export default function Home() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Hero />
      <main id="main">
        <About />
        <Skills />
        <SampleProjectCollection />
        <Workflows />
        <Experience />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
