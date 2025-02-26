import GuitarsGrid from "./GuitarsGrid";
import GuitarsList from "./GuitarsList";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchAllGuitars } from "@/utils/actions";
import Link from "next/link";

async function GuitarsContainer({
  layout,
  search,
}: {
  layout: string | string[] | undefined;
  search: string | string[] | undefined;
}) {
  // Ensure layout and search are always strings
  const layoutString = typeof layout === "string" ? layout : "grid";
  const searchString = typeof search === "string" ? search : "";

  const guitars = await fetchAllGuitars({ search });
  const totalGuitars = guitars.length;
  const searchTerm = searchString ? `&search=${searchString}` : "";

  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalGuitars} guitar{totalGuitars > 1 && "s"}
          </h4>
          <div className="flex gap-x-4">
            <Button
              variant={layoutString === "grid" ? "default" : "ghost"}
              size={"icon"}
              asChild
            >
              <Link href={`/guitars?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              variant={layoutString === "list" ? "default" : "ghost"}
              size={"icon"}
              asChild
            >
              <Link href={`/guitars?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* GUITARS */}
      <div suppressHydrationWarning>
        {totalGuitars === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry. No guitars matched your search...
          </h5>
        ) : layoutString === "grid" ? (
          <GuitarsGrid guitars={guitars} />
        ) : (
          <GuitarsList guitars={guitars} />
        )}
      </div>
    </>
  );
}

export default GuitarsContainer;
