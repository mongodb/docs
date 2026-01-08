import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { RestaurantList } from '../components/RestaurantList'
import { getRestaurantsByBorough } from '../server/restaurants'

export const Route = createFileRoute('/browse')({
    component: BrowsePage,
    // Display error UI if MongoDB connection or query fails
    errorComponent: ({ error }) => (
        <div className="p-6 text-red-600">
            <h2 className="text-xl font-bold">Connection Error</h2>
            <p>{error.message}</p>
            <p className="text-sm mt-2">
                Please check your MongoDB connection string in your .env file
            </p>
        </div>
    ),
})

function BrowsePage() {
    // Fetch filtered restaurants using TanStack Query
    // Query includes borough and search term in the key for proper caching
    const { data: restaurants } = useSuspenseQuery({
        queryKey: ['restaurants', 'queens', 'moon'], // Unique cache key for this filtered query
        queryFn: () => getRestaurantsByBorough(), // Server function with MongoDB filter
    })

    return (
        <div className='w-full p-6'>
            <h2 className='text-lg font-semibold p-4'>
                Queens Restaurants with "Moon" in the Name
            </h2>
            <RestaurantList restaurants={restaurants} />
        </div>
    )
}