import React from "react";
import HeroCarousel from "./HeroCarousel";
import { Button } from "../ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          Get your hands around our necks.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
          vero, perferendis inventore accusamus dolor aliquam fugit recusandae
          perspiciatis natus at.
        </p>
        <Button asChild size={"lg"} className="mt-10">
          <Link href={"/guitars"}>Our Axes</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;
