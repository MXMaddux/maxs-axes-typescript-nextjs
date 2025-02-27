import GuitarsContainer from "@/components/guitars/GuitarsContainer";

export default async function GuitarsPage({
  searchParams,
}: {
  searchParams: Promise<{ layout?: string; search?: string }>;
}) {
  const layout = (await searchParams).layout || "grid";
  const search = (await searchParams).search || "";
  return <GuitarsContainer layout={layout} search={search} />;
}
