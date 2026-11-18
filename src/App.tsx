import { MotionConfig } from 'motion/react';
import { BrandsMarquee } from './components/BrandsMarquee';
import { CartDrawer } from './components/CartDrawer';
import { CookieBanner } from './components/CookieBanner';
import { FilterDrawer } from './components/FilterDrawer';
import { FooterCta } from './components/FooterCta';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NewDrops } from './components/NewDrops';
import { OutfitsSection } from './components/OutfitsSection';
import { ProductGrid } from './components/ProductGrid';
import { SocialProof } from './components/SocialProof';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0b0b0b] text-white">
        <Header />
        <main>
          <Hero />
          <BrandsMarquee />
          <NewDrops />
          <ProductGrid />
          <OutfitsSection />
          <SocialProof />
          <FooterCta />
        </main>
        <CartDrawer />
        <FilterDrawer />
        <CookieBanner />
      </div>
    </MotionConfig>
  );
}
