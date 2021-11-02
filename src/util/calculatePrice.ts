export default function calculatePrice(
  price: number,
  discount?: number | null,
) {
  if (discount) return price * (1.0 - discount);
  return price;
}
