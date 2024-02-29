import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.ServerApi
import com.mongodb.ServerApiVersion
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters.*
import com.mongodb.client.model.IndexOptions
import com.mongodb.client.model.Indexes
import com.mongodb.client.model.Projections.*
import com.mongodb.client.model.Updates.*
import com.mongodb.client.model.changestream.FullDocument
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import org.bson.BsonDocument
import org.bson.BsonType
import org.bson.Document

fun main() = runBlocking {
    val uri = "<connection string>"
    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("db")
    val collection = database.getCollection<Document>("inventory")

    // Start Example 1
    val result = collection.insertOne(
        Document("item", "canvas")
            .append("qty", 100)
            .append("tags", listOf("cotton"))
            .append("size", Document("h", 28)
                .append("w", 35.5)
                .append("uom", "cm")
            )
    )
    // End Example 1

    println("Success! Inserted document: " + result.insertedId)

    // Start Example 2
    val flowInsertOne = collection
        .find(eq("item", "canvas"))
        .firstOrNull()
    // End Example 2

    if (flowInsertOne == null) {
        println("No results found.");
    } else {
        println(flowInsertOne)
    }

    collection.deleteMany(empty())

    // Start Example 3
    val results = collection.insertMany(
        listOf(
            Document("item", "journal")
                .append("qty", 25)
                .append("tags", listOf("blank", "red"))
                .append("size", Document("h", 14)
                    .append("w", 21)
                    .append("uom", "cm")
                ),
            Document("item", "mat")
                .append("qty", 25)
                .append("tags", listOf("gray"))
                .append("size", Document("h", 27.9)
                    .append("w", 35.5)
                    .append("uom", "cm")
                ),
            Document("item", "mousepad")
                .append("qty", 25)
                .append("tags", listOf("gel", "blue"))
                .append("size", Document("h", 19)
                    .append("w", 22.85)
                    .append("uom", "cm")
                )
        )
    )
    // End Example 3

    println("Success! Inserted documents: " + results.insertedIds)

    // Start Example 7
    val flowInsertMany = collection
        .find(empty())
    // End Example 7

    flowInsertMany.collect { println(it) }
    collection.deleteMany(empty())

    // Start Example 6
    collection.insertMany(
        listOf(
            Document("item", "journal")
                .append("qty", 25)
                .append("size", Document("h", 14)
                    .append("w", 21)
                    .append("uom", "cm")
                )
                .append("status", "A"),
            Document("item", "notebook")
                .append("qty", 50)
                .append("size", Document("h", 8.5)
                    .append("w", 11)
                    .append("uom", "in")
                )
                .append("status", "A"),
            Document("item", "paper")
                .append("qty", 100)
                .append("size", Document("h", 8.5)
                    .append("w", 11)
                    .append("uom", "in")
                )
                .append("status", "D"),
            Document("item", "planner")
                .append("qty", 75)
                .append("size", Document("h", 22.85)
                    .append("w", 30)
                    .append("uom", "cm")
                )
                .append("status", "D"),
            Document("item", "postcard")
                .append("qty", 45)
                .append("size", Document("h", 10)
                    .append("w", 15.25)
                    .append("uom", "cm")
                )
                .append("status", "A"),
        )
    )
    // End Example 6

    // Start Example 9
    val findFlow = collection
        .find(eq("status", "D"))
    // End Example 9

    findFlow.collect { println(it) }

    // Start Example 10
    val findFlow = collection
        .find(`in`("status", "A", "D"))
    // End Example 10

    findFlow.collect { println(it) }

    // Start Example 11
    val findFlow = collection
        .find(and(eq("status", "A"), lt("qty", 30)))
    // End Example 11

    findFlow.collect { println(it) }

    // Start Example 12
    val findFlow = collection
        .find(or(eq("status", "A"), lt("qty", 30)))
    // End Example 12

    findFlow.collect { println(it) }

    // Start Example 13
    val findFlow = collection
        .find(
            and(eq("status", "A"),
                or(lt("qty", 30), regex("item", "^p")))
        )
    // End Example 13

    findFlow.collect { println(it) }

    collection.deleteMany(empty())

    // Start Example 14
    collection.insertMany(
        listOf(
            Document("item", "journal")
                .append("qty", 25)
                .append("size", Document("h", 14)
                    .append("w", 21)
                    .append("uom", "cm")
                )
                .append("status", "A"),
            Document("item", "notebook")
                .append("qty", 50)
                .append("size", Document("h", 8.5)
                    .append("w", 11)
                    .append("uom", "in")
                )
                .append("status", "A"),
            Document("item", "paper")
                .append("qty", 100)
                .append("size", Document("h", 8.5)
                    .append("w", 11)
                    .append("uom", "in")
                )
                .append("status", "D"),
            Document("item", "planner")
                .append("qty", 75)
                .append("size", Document("h", 22.85)
                    .append("w", 30)
                    .append("uom", "cm")
                )
                .append("status", "D"),
            Document("item", "postcard")
                .append("qty", 45)
                .append("size", Document("h", 10)
                    .append("w", 15.25)
                    .append("uom", "cm")
                )
                .append("status", "A"),
        )
    )
    // End Example 14

    // Start Example 17
    val findFlow = collection
        .find(eq("size.uom", "in"))
    // End Example 17

    findFlow.collect { println(it) }

    // Start Example 18
    val findFlow = collection
        .find(lt("size.h", 15))
    // End Example 18

    findFlow.collect { println(it) }

    // Start Example 19
    val findFlow = collection
        .find(and(
            lt("size.h", 15),
            eq("size.uom", "in"),
            eq("status", "D")
        ))
    // End Example 19

    findFlow.collect { println(it) }

    // Start Example 15
    val findFlow = collection
        .find(eq("size", Document.parse("{ h: 14, w: 21, uom: 'cm' }")))
    // End Example 15

    findFlow.collect { println(it) }

    // Start Example 16
    val findFlow = collection
        .find(eq("size", Document.parse("{ w: 21, h: 14, uom: 'cm' }")))
    // End Example 16

    collection.deleteMany(empty()) 

    // Start Example 20
    collection.insertMany(
        listOf(
            Document("item", "journal")
                .append("qty", 25)
                .append("tags", listOf("blank", "red"))
                .append("dim_cm", listOf(14, 21)),
            Document("item", "notebook")
                .append("qty", 50)
                .append("tags", listOf("red", "blank"))
                .append("dim_cm", listOf(14, 21)),
            Document("item", "paper")
                .append("qty", 100)
                .append("tags", listOf("red", "blank", "plain"))
                .append("dim_cm", listOf(14, 21)),
            Document("item", "planner")
                .append("qty", 75)
                .append("tags", listOf("blank", "red"))
                .append("dim_cm", listOf(22.85, 30)),
            Document("item", "postcard")
                .append("qty", 45)
                .append("tags", listOf("blue"))
                .append("dim_cm", listOf(10, 15.25)),
        )
    )
    // End Example 20

    // Start Example 21
    val findFlow = collection
        .find(eq("tags", listOf("red", "blank")))
    // End Example 21

    // Start Example 22
    val findFlow = collection
        .find(all("tags", listOf("red", "blank")))
    // End Example 22

    // Start Example 23
    val findFlow = collection
        .find(eq("tags", "red"))
    // End Example 23

    // Start Example 24
    val findFlow = collection
        .find(gt("dim_cm", 25))
    // End Example 24

    // Start Example 25
    val findFlow = collection
        .find(and(gt("dim_cm", 15), lt("dim_cm", 20)))
    // End Example 25

    // Start Example 26
    val findFlow = collection
        .find(elemMatch("dim_cm", Document.parse("{ \$gt: 22, \$lt: 30 }")))
    // End Example 26

    // Start Example 27
    val findFlow = collection
        .find(gt("dim_cm.1", 25))
    // End Example 27

    // Start Example 28
    val findFlow = collection
        .find(size("tags", 3))
    // End Example 28

    collection.deleteMany(empty())

    // Start Example 29
    collection.insertMany(
        listOf(
            Document("item", "journal")
                .append("instock", listOf(
                    Document("warehouse", "A").append("qty", 5),
                    Document("warehouse", "C").append("qty", 15)
                )),
            Document("item", "notebook")
                .append("instock", listOf(
                    Document("warehouse", "C").append("qty", 5)
                )),
            Document("item", "paper")
                .append("instock", listOf(
                    Document("warehouse", "A").append("qty", 60),
                    Document("warehouse", "B").append("qty", 15)
                )),
            Document("item", "planner")
                .append("instock", listOf(
                    Document("warehouse", "A").append("qty", 40),
                    Document("warehouse", "B").append("qty", 5)
                )),
            Document("item", "postcard")
                .append("instock", listOf(
                    Document("warehouse", "B").append("qty", 15),
                    Document("warehouse", "C").append("qty", 35)
                )),
        )
    )
    // End Example 29

    // Start Example 30
    val findFlow = collection
        .find(eq("instock", Document.parse("{ warehouse: 'A', qty: 5 }")))
    // End Example 30

    // Start Example 31
    val findFlow = collection
        .find(eq("instock", Document.parse("{ qty: 5, warehouse: 'A' }")))
    // End Example 31

    // Start Example 33
    val findFlow = collection
        .find(lte("instock.qty", 20))
    // End Example 33
    
    // Start Example 32
    val findFlow = collection
        .find(lte("instock.0.qty", 20))
    // End Example 32

    // Start Example 34
    val findFlow = collection
        .find(elemMatch("instock", Document.parse("{ qty: 5, warehouse: 'A' }")))
    // End Example 34

    // Start Example 35
    val findFlow = collection
        .find(elemMatch("instock", Document.parse("{ qty: { \$gt: 10, \$lte: 20 } }")))
    // End Example 35

    // Start Example 36
    val findFlow = collection
        .find(and(gt("instock.qty", 10), lte("instock.qty", 20)))
    // End Example 36

    // Start Example 37
    val findFlow = collection
        .find(and(eq("instock.qty", 5), eq("instock.warehouse", "A")))
    // End Example 37

    collection.deleteMany(empty())

    // Start Example 42
    collection.insertMany(
        listOf(
            Document("item", "journal")
                .append("status", "A")
                .append("size", Document("h", 14).append("w", 21).append("uom", "cm"))
                .append("instock", listOf(
                    Document("warehouse", "A").append("qty", 5),
                )),
            Document("item", "notebook")
                .append("status", "A")
                .append("size", Document("h", 8.5).append("w", 11).append("uom", "in"))
                .append("instock", listOf(
                    Document("warehouse", "C").append("qty", 5),
                )),
            Document("item", "paper")
                .append("status", "D")
                .append("size", Document("h", 8.5).append("w", 11).append("uom", "in"))
                .append("instock", listOf(
                    Document("warehouse", "A").append("qty", 60),
                )),
            Document("item", "planner")
                .append("status", "D")
                .append("size", Document("h", 22.85).append("w", 30).append("uom", "cm"))
                .append("instock", listOf(
                    Document("warehouse", "A").append("qty", 40),
                )),
            Document("item", "postcard")
                .append("status", "A")
                .append("size", Document("h", 10).append("w", 15.25).append("uom", "cm"))
                .append("instock", listOf(
                    Document("warehouse", "B").append("qty", 15),
                    Document("warehouse", "C").append("qty", 35)
                )),
        )
    )
    // End Example 42

    // Start Example 43
    val findFlow = collection
        .find(eq("status", "A"))
    // End Example 43

    // Start Example 44
    val findFlow = collection
        .find(eq("status", "A")).projection(include("item", "status"))
    // End Example 44

    // Start Example 45
    val findFlow = collection
        .find(eq("status", "A")).projection(fields(include("item", "status"), excludeId()))
    // End Example 45

    // Start Example 46
    val findFlow = collection
        .find(eq("status", "A")).projection(exclude("item", "status"))
    // End Example 46

    // Start Example 47
    val findFlow = collection
        .find(eq("status", "A")).projection(include("item", "status", "size.uom"))
    // End Example 47

    // Start Example 48
    val findFlow = collection
        .find(eq("status", "A")).projection(exclude("size.uom"))
    // End Example 48

    // Start Example 49
    val findFlow = collection
        .find(eq("status", "A")).projection(include("item", "status", "instock.qty"))
    // End Example 49

    // Start Example 50
    val findFlow = collection
        .find(eq("status", "A"))
        .projection(fields(include("item", "status"), slice("instock", -1)))
    // End Example 50

    collection.deleteMany(empty())

    // Start Example 38
    collection.insertMany(
        listOf(
            Document("_id", 1)
                .append("item", null),
            Document("_id", 2)
        )
    )
    // End Example 38

    // Start Example 39
    val findFlow = collection
        .find(eq("item", null))
    // End Example 39

    val findFlow = collection
        .find(ne("item", null))

    // Start Example 40
    val findFlow = collection
        .find(type("item", BsonType.NULL))
    // End Example 40

    // Start Example 41
    val findFlow = collection
        .find(exists("item", false))
    // End Example 41

    // Start Example 56
    collection.deleteMany(empty())
    // End Example 56

    // Start Example 51
    collection.insertMany(
        listOf(
            Document("item", "canvas")
                .append("qty", 100)
                .append("size", Document("h", 28).append("w", 35.5).append("uom", "cm"))
                .append("status", "A"),
            Document("item", "journal")
                .append("qty", 25)
                .append("size", Document("h", 14).append("w", 21).append("uom", "cm"))
                .append("status", "A"),
            Document("item", "mat")
                .append("qty", 85)
                .append("size", Document("h", 27.9).append("w", 35.5).append("uom", "cm"))
                .append("status", "A"),
            Document("item", "mousepad")
                .append("qty", 25)
                .append("size", Document("h", 19).append("w", 22.85).append("uom", "cm"))
                .append("status", "P"),
            Document("item", "notebook")
                .append("qty", 50)
                .append("size", Document("h", 8.5).append("w", 11).append("uom", "in"))
                .append("status", "P"),
            Document("item", "paper")
                .append("qty", 100)
                .append("size", Document("h", 8.5).append("w", 11).append("uom", "in"))
                .append("status", "D"),
            Document("item", "planner")
                .append("qty", 75)
                .append("size", Document("h", 22.85).append("w", 30).append("uom", "cm"))
                .append("status", "D"),
            Document("item", "postcard")
                .append("qty", 45)
                .append("size", Document("h", 10).append("w", 15.25).append("uom", "cm"))
                .append("status", "A"),
            Document("item", "sketchbook")
                .append("qty", 80)
                .append("size", Document("h", 14).append("w", 21).append("uom", "cm"))
                .append("status", "A"),
            Document("item", "sketch pad")
                .append("qty", 95)
                .append("size", Document("h", 22.85).append("w", 30.5).append("uom", "cm"))
                .append("status", "A"),
        )
    )
    // End Example 51

    // Start Example 52
    collection.updateOne(eq("item", "paper"),
        combine(set("size.uom", "cm"), set("status", "P"), currentDate("lastModified")));
    // End Example 52

    // Start Example 53
    collection.updateMany(lt("qty", 50),
        combine(set("size.uom", "in"), set("status", "P"), currentDate("lastModified")));
    // End Example 53

    // Start Example 54
    collection.replaceOne(eq("item", "paper"),
        Document.parse("{ item: 'paper', instock: [ { warehouse: 'A', qty: 60 }, { warehouse: 'B', qty: 40 } ] }"));
    // End Example 54

    // Start Example 55
    collection.insertMany(
        listOf(
            Document("item", "journal")
                .append("qty", 25)
                .append("size", Document("h", 14).append("w", 21).append("uom", "cm"))
                .append("status", "A"),
            Document("item", "notebook")
                .append("qty", 50)
                .append("size", Document("h", 8.5).append("w", 11).append("uom", "in"))
                .append("status", "A"),
            Document("item", "paper")
                .append("qty", 100)
                .append("size", Document("h", 8.5).append("w", 11).append("uom", "in"))
                .append("status", "D"),
            Document("item", "planner")
                .append("qty", 75)
                .append("size", Document("h", 22.85).append("w", 30).append("uom", "cm"))
                .append("status", "D"),
            Document("item", "postcard")
                .append("qty", 45)
                .append("size", Document("h", 10).append("w", 15.25).append("uom", "cm"))
                .append("status", "A"),
        )
    )
    // End Example 55

    // Start Example 57
    collection.deleteMany(eq("status", "A"));
    // End Example 57

    // Start Example 58
    collection.deleteOne(eq("status", "D"))
    // End Example 58

    // Start Index Example 1
    collection.createIndex(Indexes.descending("name"))
    // End Index Example 1
    
    // Start Index Example 2
    collection.createIndex(
        Indexes.ascending("cuisine", "name"),
        IndexOptions().partialFilterExpression(gt("rating", 5))
    )
    // End Index Example 2

    // Start Changestream Example 1
    val job = launch {
        val changeStream = collection.watch()
        changeStream.collect {
            println("Received a change event: $it")
        }
    }
    // End Changestream Example 1

    // Start Changestream Example 2
    val job = launch {
        val changeStream = collection.watch()
            .fullDocument(FullDocument.UPDATE_LOOKUP)
        changeStream.collect {
            println(it)
        }
    }
    // End Changestream Example 2

    // Start Changestream Example 3
    val resumeToken = BsonDocument()
    val job = launch {
        val changeStream = collection.watch()
            .resumeAfter(resumeToken)
        changeStream.collect {
            println(it)
        }
    }
    // End Changestream Example 3

    // Start Changestream Example 4
    val pipeline = listOf(
        Aggregates.match(
            or(
                eq("fullDocument.username", "alice"),
                `in`("operationType", listOf("delete"))
            )
    ))

    val job = launch {
        val changeStream = collection.watch(pipeline)
        changeStream.collect {
            println("Received a change event: $it")
        }
    }
    // End Changestream Example 4
    
    // Start Changestream Example 4 Alt
    val pipeline = listOf(
    Aggregates.match(Filters.`in`("operationType",
        listOf("insert", "update")))
    )

    val job = launch {
        val changeStream = collection.watch(pipeline)
        changeStream.collect {
            println("Received a change event: $it")
        }
    }
    // End Changestream Example 4 Alt

    // Start Stable API Example 1
    val serverApi = ServerApi.builder()
        .version(ServerApiVersion.V1)
        .build()
    
    val settings = MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("<connection string>"))
        .serverApi(serverApi)
        .build()
    
    val client = MongoClient.create(settings)
    // End Stable API Example 1

    // Start Stable API Example 2
    val serverApi = ServerApi.builder()
        .version(ServerApiVersion.V1)
        .strict(true)
        .build()
    // End Stable API Example 2

    // Start Stable API Example 3
    val serverApi = ServerApi.builder()
        .version(ServerApiVersion.V1)
        .strict(false)
        .build()
    // End Stable API Example 3

    // Start Stable API Example 4
    val serverApi = ServerApi.builder()
        .version(ServerApiVersion.V1)
        .deprecationErrors(true)
        .build()
    // End Stable API Example 4

    mongoClient.close()
}
