import GuitarsContainer from "@/components/guitars/GuitarsContainer";

export default async function GuitarsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";

  return <GuitarsContainer layout={layout} search={search} />;
}
