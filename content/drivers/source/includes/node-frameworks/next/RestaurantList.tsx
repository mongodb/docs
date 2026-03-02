"use client"; 
/* The above directive tells Next.js to render this component
   on the client side instead of the server side. 
   Client components can use React hooks like useState 
   and useEffect, while server components cannot.
*/

import { useEffect, useState } from "react";
import { ObjectId } from "mongodb";

interface Restaurant {
  _id: ObjectId;
  name: string;
  borough: string;
  cuisine: string;
}

interface RestaurantProps {
  restaurant: Restaurant;
}

const Restaurant = (props: RestaurantProps) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.restaurant.name}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.restaurant.borough}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.restaurant.cuisine}
    </td>
  </tr>
);

interface RestaurantListProps {
  endpoint: string;
  title: string;
}

export default function RestaurantList({ endpoint, title }: RestaurantListProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRestaurants() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const restaurants = await response.json();
        setRestaurants(restaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    }
    getRestaurants();
  }, [endpoint]);

  function restaurantList() {
    return restaurants.map((restaurant) => {
      return <Restaurant restaurant={restaurant} key={restaurant._id.toString()} />;
    });
  }

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">{title}</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Borough
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Cuisine
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {restaurantList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

