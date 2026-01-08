import {Restaurant} from "../server/restaurants"

type Props = {
    restaurants: Restaurant[]
}

export function RestaurantList({restaurants}: Props) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Borough</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Cuisine</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {restaurants.map((restaurant) => (
                        <tr key={restaurant._id}>
                            <td className="px-4 py-3">{restaurant.name}</td>
                            <td className="px-4 py-3">{restaurant.borough}</td>
                            <td className="px-4 py-3">{restaurant.cuisine}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>   
    )
}