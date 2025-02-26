import React from "react";
import { Guitar } from "@prisma/client";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

function GuitarsGrid({ guitars }: { guitars: Guitar[] }) {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2">
      {guitars.map((guitar) => {
        const { model, price, image } = guitar;
        const guitarId = guitar.id;
        const dollarsAmount = formatCurrency(price);
        return (
          <article key={guitarId} className="group relative">
            <Link href={`/guitars/${guitarId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-4">
                  <div className="relative h-64 rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={model}
                      fill
                      sizes="(max-height: 768) 100vh, (max-height:1200px) 50vh, 33vh"
                      priority
                      className="rounded h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-lg capitalize">{model}</h2>
                    <p className="text-muted-foreground mt-2">
                      {dollarsAmount}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-7 z-5">
              <FavoriteToggleButton guitarId={guitarId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default GuitarsGrid;
