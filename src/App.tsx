import { LenisProvider } from './lib/LenisProvider';
import { SiteBackgroundVideo } from './components/SiteBackgroundVideo';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { WhoWeAre } from './components/WhoWeAre';
import { AboutUs } from './components/AboutUs';
import { Services, ServiceDetails } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Portfolio } from './components/Portfolio';
import { Industries } from './components/Industries';
import { Clients } from './components/Clients';
import { Stats } from './components/Stats';
import { Vision } from './components/Vision';
import { Approach } from './components/Approach';
import { CTA } from './components/CTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <LenisProvider>
      <SiteBackgroundVideo />
      <Loader />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <WhoWeAre />
        <AboutUs />
        <Services />
        <WhyUs />
        <Industries />
        <CTA />
        <ServiceDetails />
        <Portfolio />
        <Clients />
        <Stats />
        <Vision />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  );
}

export default App;
