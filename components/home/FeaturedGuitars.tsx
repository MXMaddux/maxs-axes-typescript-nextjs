import { fetchFeaturedGuitars } from "@/utils/actions";
import React from "react";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import GuitarsGrid from "../guitars/GuitarsGrid";

async function FeaturedGuitars() {
  const guitars = await fetchFeaturedGuitars();
  if (guitars.length === 0) {
    return <EmptyList />;
  }

  return (
    <section className="pt-24">
      <SectionTitle text="featured guitars" />
      <GuitarsGrid guitars={guitars} />
    </section>
  );
}

export default FeaturedGuitars;
