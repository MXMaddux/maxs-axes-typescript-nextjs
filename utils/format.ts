export const formatCurrency = (amount: number | null) => {
  const value = amount ? amount / 100 : 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
