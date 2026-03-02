import RestaurantList from "@/components/RestaurantList";

export default function Browse() {
  return (
    <main className="container mx-auto p-4">
      <RestaurantList
        endpoint="/api/browse"
        title='Filtered Restaurants (Queens, containing "Moon")'
      />
    </main>
  );
}

