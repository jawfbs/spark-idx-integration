// app/listings/page.tsx — this is a React Server Component

import { SparkClient } from "@/lib/spark";

export const revalidate = 3600; // ISR: regenerate every hour

export default async function ListingsPage() {
  const spark = new SparkClient(); // auto-reads env vars

  const { listings, total } = await spark.searchListings({
    status: "Active",
    city: "Scottsdale",
    priceMin: 500000,
    limit: 24,
  });

  return (
    <section>
      <h1>{total.toLocaleString()} Homes for Sale in Scottsdale</h1>
      {listings.map((listing) => (
        <article key={listing.Id}>
          <h2>{listing.UnparsedAddress}</h2>
          <p>${listing.ListPrice.toLocaleString()}</p>
          <p>
            {listing.BedroomsTotal} bed · {listing.BathroomsTotalInteger} bath ·{" "}
            {listing.LivingArea?.toLocaleString()} sqft
          </p>
        </article>
      ))}
    </section>
  );
}
