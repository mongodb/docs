import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Restaurant = (props) => (
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

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const location = useLocation();

  // Fetches the restaurants from the database
  useEffect(() => {
    async function getRestaurants() {
      // Determines which endpoint to call based on current route
      const endpoint =
        location.pathname === "/browse"
          ? "http://localhost:5050/restaurant/browse"
          : "http://localhost:5050/restaurant/";

      const response = await fetch(endpoint);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const restaurants = await response.json();
      setRestaurants(restaurants);
    }
    getRestaurants();
    return;
  }, [location.pathname]);

  // Maps each restaurant on the table
  function restaurantList() {
    return restaurants.map((restaurant) => {
      return <Restaurant restaurant={restaurant} key={restaurant._id} />;
    });
  }

  // Retrieves the dynamic title based on current route
  const getTitle = () => {
    return location.pathname === "/browse"
      ? 'Filtered Restaurants (Queens, containing "Moon")'
      : "All Restaurants";
  };

  // Displays the restaurants table
  return (
    <>
      <h3 className="text-lg font-semibold p-4">{getTitle()}</h3>
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