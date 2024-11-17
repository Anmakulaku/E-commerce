import { Header } from '../components/Header/Header';
import { Brand } from '../components/Brands/Brand';
import { Footer } from '../components/Footer/Footer';
import { Subscribe } from '../components/Subscribe/Subscribe';
import { Gallery } from '../components/Gallery/Gallery';
import { Slider } from '../components/Slider/Slider';
import { Testimonials } from '../components/Testimonials/Testimonials';

export function Home() {
  return (
    <main>
      <Header />
      <Brand />
      <Slider />
      <Gallery />
      <Testimonials />
      <Subscribe />
      <Footer />
    </main>
  );
}
