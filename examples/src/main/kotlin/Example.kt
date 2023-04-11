import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoDatabase

class ExampleMongodbClient {
    val client: MongoClient;
    val database: MongoDatabase;

    constructor(connectionString: String, databaseName: String){
        this.client = MongoClient.create(connectionString)
        this.database = this.client.getDatabase(databaseName)
    }

    suspend fun countDocuments(collectionName: String): Long{
        return this.database.getCollection<Any>(collectionName).countDocuments()
    }

    suspend fun insertOne(collectionName: String, document: Any){
        this.database.getCollection<Any>(collectionName).insertOne(document)
    }

    fun close(){
        this.client.close()
    }



}
