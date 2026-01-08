import { MongoClient } from "mongodb"

// Connection string from the MongoDB atlas dashboard
const uri = process.env.MONGODB_URI

let connected = false
let client: MongoClient

export async function connectToDatabase() {
    if (!uri) {
        throw new Error("MONGODB_URI is not defined in environment variables")
    }

    if (!connected) {
        try {
            client = new MongoClient(uri)
            await client.connect()
            connected = true
        } catch (error) {
            throw new Error(`Failed to connect to database: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }
    return client.db("sample_restaurants")
}