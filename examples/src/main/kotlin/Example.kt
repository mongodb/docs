import com.mongodb.client.result.InsertOneResult
import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import org.bson.Document

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

    suspend fun insertOne(collectionName: String, document: Document): InsertOneResult {
        return this.database.getCollection<Document>(collectionName).insertOne(document)
    }

    suspend fun insertOneDataClass(collectionName: String, dataClassInstance: TestDataClass): InsertOneResult {
        return this.database.getCollection<TestDataClass>(collectionName).insertOne(dataClassInstance)
    }

    fun close(){
        this.client.close()
    }

}

data class TestDataClass(val name: String)

