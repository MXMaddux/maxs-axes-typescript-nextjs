import LoadingContainer from "@/components/global/LoadingContainer";
import FeaturedGuitars from "@/components/home/FeaturedGuitars";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";

function HomePage() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedGuitars />
      </Suspense>
    </div>
  );
}

export default HomePage;
