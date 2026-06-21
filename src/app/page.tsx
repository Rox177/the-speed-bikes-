import { HeroSection } from "@/components/home/hero-section";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedBikes } from "@/components/home/featured-bikes";
import { Testimonials } from "@/components/home/testimonials";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <FeaturedBikes />
      <Testimonials />
      <NewsletterSection />
    </div>
  );
}
