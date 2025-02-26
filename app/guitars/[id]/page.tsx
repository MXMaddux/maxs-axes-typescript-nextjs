import BreadCrumbs from "@/components/single-guitar/BreadCrumbs";
import { fetchSingleGuitar } from "@/utils/actions";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "@/components/guitars/FavoriteToggleButton";
import AddToCart from "@/components/single-guitar/AddToCart";
import GuitarRating from "@/components/single-guitar/GuitarRating";

async function SingleGuitarPage({ params }: { params: { id: string } }) {
  const guitar = await fetchSingleGuitar(params.id);
  const { model, image, company, description, price } = guitar;
  const dollarsAmount = formatCurrency(price);

  return (
    <section>
      <BreadCrumbs model={guitar.model} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE FIRST COL */}
        <div className="relative h-full">
          <Image
            src={image}
            alt={model}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>
        {/* guitar INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{model}</h1>
            <FavoriteToggleButton guitarId={params.id} />
          </div>
          <GuitarRating guitarId={params.id} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {dollarsAmount}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart guitarId={params.id} />
        </div>
      </div>
    </section>
  );
}
export default SingleGuitarPage;
