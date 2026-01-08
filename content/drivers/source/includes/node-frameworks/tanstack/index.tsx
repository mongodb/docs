import { createFileRoute } from "@tanstack/react-router";
import {useSuspenseQuery} from '@tanstack/react-query'
import { RestaurantList } from "../components/RestaurantList";
import { getAllRestaurants } from "../server/restaurants";

export const Route = createFileRoute('/')({
    component: Home,
    pendingComponent: () => (
        <div className="p-6 text-gray-500">
            Loading restaurants...
        </div>
    ),
    errorComponent: ({error}) => (
        <div className="p-6 text-red-600">
            <h2 className="text-xl font-bold">Connection Error</h2>
            <p>{error.message}</p>
            <p className="text-sm mt-2">Please check your MongoDB connection string in your .env file</p>
        </div>
    ),
})

function Home() {
    const{data: restaurants} = useSuspenseQuery({
        queryKey:['restaurants'],
        queryFn: () => getAllRestaurants(),
    })
    return (
        <div className="w-full p-6">
            <h2 className="text-lg font-semibold p-4">All Restaurants</h2>
            <RestaurantList restaurants={restaurants} />
        </div>
    )
}