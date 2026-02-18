import { connectToDatabase } from '~~/server/utils/mongodb'

export default defineEventHandler(async () => {
    const { db } = await connectToDatabase();
    const collection = db.collection("restaurants");
  // Filter: Queens borough + name contains "Moon" (case-insensitive)
    const query = {
        borough: 'Queens',
        name: { $regex: 'Moon', $options: 'i' },
    }

    const restaurants = await collection
        .find(query)
        .project({ name: 1, borough: 1, cuisine: 1, grades: 1 })
        .toArray()

    return restaurants.map((doc) => ({
        ...doc,
        _id: doc._id.toString(),
    }))
})
