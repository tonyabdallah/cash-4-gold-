import { PricesProvider } from '@/components/PricesProvider';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Prices from '@/components/Prices';
import Calculator from '@/components/Calculator';
import Services from '@/components/Services';
import Process from '@/components/Process';
import About from '@/components/About';
import Locations from '@/components/Locations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <PricesProvider>
      <Header />
      <main>
        <Hero />
        <Prices />
        <Calculator />
        <Services />
        <Process />
        <About />
        <Locations />
        <Contact />
      </main>
      <Footer />
    </PricesProvider>
  );
}
