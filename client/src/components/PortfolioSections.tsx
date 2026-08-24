import { About } from "./About";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Footer } from "./Footer";
import { Reviews } from "./Reviews";
import { SampleProjectCollection } from "./SampleProjectCollection";
import { Workflows } from "./Workflows";
import { useReveal } from "../hooks/useReveal";
import { AppProviders } from "./AppProviders";

/** Non-critical portfolio content loaded only as the visitor leaves the hero. */
export default function PortfolioSections() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <AppProviders>
      <div ref={ref}>
        <About />
        <SampleProjectCollection />
        <Workflows />
        <Experience />
        <Reviews />
        <Contact />
        <Footer />
      </div>
    </AppProviders>
  );
}
