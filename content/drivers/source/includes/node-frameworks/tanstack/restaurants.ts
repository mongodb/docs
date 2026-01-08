import { createServerFn } from "@tanstack/react-start"
import { connectToDatabase } from "../lib/db"



export interface Restaurant {
    _id: string
    address: {
        building: string
        coord: [number, number]
        street: string
        zipcode: string
    }
    borough: string
    cuisine: string
    name: string
    restaurant_id: string
}


// Gets a list of all restaurants from the database
export const getAllRestaurants = createServerFn({ method: 'GET'})
.handler(async () => {
        const db = await connectToDatabase()
        const restaurants = await db
            .collection<Restaurant>("restaurants")
            .find({})
            .limit(100)
            .toArray() 
        return restaurants.map((restaurant) => ({
            ...restaurant,
            _id: restaurant._id.toString(),
    }))
})  

// Gets a list of restaurants in Queens with "Moon" in the name
export const getRestaurantsByBorough = createServerFn({ method:  'GET'})
.handler(async () => {
    const db = await connectToDatabase()
    const restaurants = await db
        .collection<Restaurant>("restaurants")
        .find({ 
            borough: 'Queens',
            name: {$regex: 'Moon', $options: 'i'} // case-insensitive match
        })
        .limit(100)
        .toArray()
    // Convert ObjectId to string for client-side serialization     
    return restaurants.map((restaurant) => ({
        ...restaurant,
        _id: restaurant._id.toString(),
    }))
    })