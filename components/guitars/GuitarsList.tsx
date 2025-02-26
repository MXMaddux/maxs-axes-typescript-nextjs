import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Guitar } from "@prisma/client";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

function GuitarsList({ guitars }: { guitars: Guitar[] }) {
  return (
    <div className="mt-12 grid gap-y-8">
      {guitars.map((guitar) => {
        const { model, price, image, company } = guitar;
        const dollarsAmount = formatCurrency(price);
        const guitarId = guitar.id;

        return (
          <article key={guitarId} className="group relative">
            <Link href={`/guitars/${guitarId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                  <div className="relative h-64 md:h-48 md:w-24">
                    <Image
                      src={image}
                      alt={model}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      priority
                      className="w-full rounded object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold capitalize">
                      {model}
                    </h2>
                    <h4 className="text-muted-foreground">{company}</h4>
                    <p className="text-muted-foreground text-lg md:ml-auto">
                      {dollarsAmount}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute bottom-8 right-8 z-5">
              <FavoriteToggleButton guitarId={guitarId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default GuitarsList;
