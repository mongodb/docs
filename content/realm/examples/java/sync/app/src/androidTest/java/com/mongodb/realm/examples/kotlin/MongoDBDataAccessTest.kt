package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.model.Plant
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.mongo.iterable.MongoCursor
import io.realm.mongodb.mongo.options.UpdateOptions
import java.util.*
import org.bson.Document
import org.bson.codecs.configuration.CodecRegistries
import org.bson.codecs.pojo.PojoCodecProvider
import org.bson.types.ObjectId
import org.junit.Before
import org.junit.Test

class MongoDBDataAccessTest : RealmTest() {
    @Before
    fun setUpData() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    // :snippet-start: example-data
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    mongoCollection.insertMany(
                        listOf(
                            Plant(
                                ObjectId(),
                                "venus flytrap",
                                "full",
                                "white",
                                "perennial",
                                "Store 42"
                            ),
                            Plant(
                                ObjectId(),
                                "sweet basil",
                                "partial",
                                "green",
                                "annual",
                                "Store 42"
                            ),
                            Plant(
                                ObjectId(),
                                "thai basil",
                                "partial",
                                "green",
                                "perennial",
                                "Store 42"
                            ),
                            Plant(
                                ObjectId(),
                                "helianthus",
                                "full",
                                "yellow",
                                "annual",
                                "Store 42"
                            ),
                            Plant(
                                ObjectId(),
                                "petunia",
                                "full",
                                "purple",
                                "annual",
                                "Store 47"
                            )
                        )
                    )
                    Log.v("EXAMPLE", "Successfully Successfully inserted the sample data.")
                    // :remove-start:
                    expectation.fulfill()
                    // :remove-end:
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun instantiateAMongoDBCollectionHandle() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    // :snippet-start: instantiate-a-mongodb-collection-handle
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :remove-start:
                    expectation.fulfill()
                    // :remove-end:
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: ${it.error.errorMessage}")
                }
            }
        }
        expectation.await()
    }


    @Test
    fun insertASingleDocument() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: insert-a-single-document
                    val plant = Plant(
                        ObjectId(),
                        "lily of the valley",
                        "full",
                        "white",
                        "perennial",
                        "Store 47"
                    )
                    mongoCollection?.insertOne(plant)?.getAsync { task ->
                        if (task.isSuccess) {
                            Log.v(
                                "EXAMPLE",
                                "successfully inserted a document with id: ${task.get().insertedId}"
                            )
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to insert documents with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: ${it.error.errorMessage}")
                }
            }
        }
        expectation.await()
    }


    @Test
    fun insertMultipleDocuments() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: insert-multiple-documents
                    val plants = listOf(
                        Plant(
                            ObjectId(),
                            "rhubarb",
                            "full",
                            "red",
                            "perennial",
                            "Store 47"
                        ),
                        Plant(
                            ObjectId(),
                            "wisteria lilac",
                            "partial",
                            "purple",
                            "perennial",
                            "Store 42"
                        ),
                        Plant(
                            ObjectId(),
                            "daffodil",
                            "full",
                            "yellow",
                            "perennial",
                            "Store 42"
                        )
                    )
                    mongoCollection.insertMany(plants).getAsync { task ->
                        if (task.isSuccess) {
                            val insertedCount = task.get().insertedIds.size
                            Log.v(
                                "EXAMPLE",
                                "successfully inserted $insertedCount documents into the collection."
                            )
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to insert documents with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun findASingleDocument() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: find-a-single-document
                    val queryFilter = Document("type", "perennial")
                    mongoCollection.findOne(queryFilter)
                        .getAsync { task ->
                            if (task.isSuccess) {
                                val result = task.get()
                                Log.v("EXAMPLE", "successfully found a document: $result")
                                // :remove-start:
                                expectation.fulfill()
                                // :remove-end:
                            } else {
                                Log.e("EXAMPLE", "failed to find document with: ${task.error}")
                            }
                        }
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.error.errorMessage)
                }
            }
        }
        expectation.await()
    }

    @Test
    fun findMultipleDocuments() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: find-multiple-documents
                    val queryFilter = Document("_partition", "Store 42")
                    val findTask = mongoCollection.find(queryFilter).iterator()
                    findTask.getAsync { task ->
                        if (task.isSuccess) {
                            val results = task.get()
                            Log.v("EXAMPLE", "successfully found all plants for Store 42:")
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString())
                            }
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to find documents with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }


    @Test
    fun countDocuments() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: count-documents
                    mongoCollection.count().getAsync { task ->
                        if (task.isSuccess) {
                            val count = task.get()
                            Log.v("EXAMPLE", "successfully counted, number of documents in the collection: $count")
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to count documents with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun updateASingleDocument() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: update-a-single-document
                    val queryFilter = Document("name", "petunia")
                    val updateDocument = Document("\$set", Document("sunlight", "partial"))
                    mongoCollection.updateOne(queryFilter, updateDocument).getAsync { task ->
                        if (task.isSuccess) {
                            val count = task.get().modifiedCount
                            if (count == 1L) {
                                Log.v("EXAMPLE", "successfully updated a document.")
                            } else {
                                Log.v("EXAMPLE", "did not update a document.")
                            }
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to update document with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun updateMultipleDocuments() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: update-multiple-documents
                    val queryFilter = Document("_partition", "Store 47")
                    val updateDocument = Document("\$set", Document("_partition", "Store 51"))
                    mongoCollection.updateMany(queryFilter, updateDocument).getAsync { task ->
                        if (task.isSuccess) {
                            val count = task.get().modifiedCount
                            if (count != 0L) {
                                Log.v("EXAMPLE", "successfully updated $count documents.")
                            } else {
                                Log.v("EXAMPLE", "did not update any documents.")
                            }
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to update documents with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun upsertASingleDocument() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: upsert-a-single-document
                    val queryFilter = Document("sunlight", "full")
                        .append("type", "perennial")
                        .append("color", "green")
                        .append("_partition", "Store 47")
                    val updateDocument = Document("\$set", Document("name", "sweet basil"))
                    val updateOptions = UpdateOptions().upsert(true)
                    mongoCollection.updateOne(queryFilter, updateDocument, updateOptions)
                        .getAsync { task ->
                            if (task.isSuccess) {
                                if (task.get().upsertedId != null) {
                                    Log.v("EXAMPLE", "successfully upserted a document with id ${task.get().upsertedId}")
                                    // :remove-start:
                                    expectation.fulfill()
                                    // :remove-end:
                                } else {
                                    Log.v("EXAMPLE", "successfully updated a document.")
                                }
                            } else {
                                Log.e("EXAMPLE", "failed to update or insert document with: ${task.error}")
                            }
                        }
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.error.errorMessage)
                }
            }
        }
        expectation.await()
    }

    @Test
    fun deleteASingleDocument() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: delete-a-single-document
                    val queryFilter = Document("color", "green")
                    mongoCollection.deleteOne(queryFilter).getAsync { task ->
                        if (task.isSuccess) {
                            val count = task.get().deletedCount
                            if (count == 1L) {
                                Log.v("EXAMPLE", "successfully deleted a document.")
                            } else {
                                Log.v("EXAMPLE", "did not delete a document.")
                            }
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to delete document with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun deleteMultipleDocuments() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: delete-documents
                    val queryFilter = Document("sunlight", "full").append("type", "annual")
                    mongoCollection.deleteMany(queryFilter).getAsync { task ->
                        if (task.isSuccess) {
                            val count = task.get().deletedCount
                            if (count != 0L) {
                                Log.v("EXAMPLE", "successfully deleted $count documents.")
                            } else {
                                Log.v("EXAMPLE", "did not delete any documents.")
                            }
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to delete documents with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun watchDocuments() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: watch-documents
                    val watcher = mongoCollection.watchAsync()
                    watcher[{ result ->
                        if (result.isSuccess) {
                            Log.v("EXAMPLE", "Event type: ${result.get().operationType} full document: ${result.get().fullDocument}")
                        } else {
                            Log.e("EXAMPLE", "failed to subscribe to changes in the collection with : ${result.error}")
                        }
                    }]
                    val triffid =
                        Plant(
                            ObjectId(),
                            "triffid",
                            "low",
                            "green",
                            "perennial",
                            "Store 47"
                        )
                    mongoCollection.insertOne(triffid).getAsync { task ->
                        if (task.isSuccess) {
                            val insertedId = task.get().insertedId.asObjectId()
                            Log.v("EXAMPLE", "successfully inserted a document with id $insertedId")
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to insert document with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun watchDocumentsWithFilter() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    val mongoClient =
                        user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    // registry to handle POJOs (Plain Old Java Objects)
                    val pojoCodecRegistry = CodecRegistries.fromRegistries(
                        AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                        CodecRegistries.fromProviders(
                            PojoCodecProvider.builder().automatic(true).build()))
                    val mongoCollection =
                        mongoDatabase.getCollection(
                            "plant-data-collection",
                            Plant::class.java).withCodecRegistry(pojoCodecRegistry)
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: watch-documents-with-filter
                    val watcher = mongoCollection
                        .watchWithFilterAsync(Document("fullDocument._partition", "Store 42"))
                    watcher[{ result ->
                        if (result.isSuccess) {
                            Log.v("EXAMPLE", "Event type: ${result.get().operationType} full document: ${result.get().fullDocument}")
                        } else {
                            Log.e("EXAMPLE", "failed to subscribe to filtered changes in the collection with : ${result.error}")
                        }
                    }]
                    val plants = listOf(
                        Plant(
                            ObjectId(),
                            "triffid",
                            "low",
                            "green",
                            "perennial",
                            "Store 47"
                        ),
                        Plant(
                            ObjectId(),
                            "venomous tentacula",
                            "low",
                            "brown",
                            "annual",
                            "Store 42"
                        )
                    )
                    mongoCollection.insertMany(plants).getAsync { task ->
                        if (task.isSuccess) {
                            val insertedCount = task.get().insertedIds.size
                            Log.v("EXAMPLE", "successfully inserted $insertedCount documents into the collection.")
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to insert documents with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.error.errorMessage)
                }
            }
        }
        expectation.await()
    }


    @Test
    fun aggregateDocumentsFilter() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()

                    // connect to a mongodb cluster linked to the realm app
                    val mongoClient = user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("plant-data-collection")
                    Log.v("EXAMPLE",
                        "Successfully instantiated the MongoDB collection handle")

                    // :snippet-start: aggregate-documents-filter
                    // create an aggregation pipeline
                    val pipeline =
                        listOf(
                            Document("\$match",
                                Document("type",
                                    Document("\$eq", "perennial")
                                )
                            )
                        )

                    // query mongodb using the pipeline
                    val aggregationTask = mongoCollection.aggregate(pipeline).iterator()

                    // handle success or failure of the query
                    aggregationTask.getAsync { task: App.Result<MongoCursor<Document>> ->
                        if (task.isSuccess) {
                            val results = task.get()

                            // iterate over and print the results to the log
                            Log.v("EXAMPLE",
                                "successfully aggregated the plants. Results:")
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString())
                            }
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE",
                                "failed to aggregate documents with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun aggregateDocumentsGroup() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    // connect to a mongodb cluster linked to the realm app
                    val mongoClient = user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("plant-data-collection")
                    Log.v("EXAMPLE",
                        "Successfully instantiated the MongoDB collection handle")

                    // :snippet-start: aggregate-documents-group
                    // create an aggregation pipeline
                    val pipeline =
                        listOf(
                            Document("\$group",
                                Document("_id", "\$type")
                                    .append("totalCount", Document("\$sum", 1))
                            )
                        )

                    // query mongodb using the pipeline
                    val aggregationTask = mongoCollection.aggregate(pipeline).iterator()

                    // handle success or failure of the query
                    aggregationTask.getAsync { task: App.Result<MongoCursor<Document>> ->
                        if (task.isSuccess) {
                            val results = task.get()

                            // iterate over and print the results to the log
                            Log.v("EXAMPLE",
                                "successfully aggregated the plants. Results:")
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString())
                            }
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE",
                                "failed to aggregate documents with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun aggregateDocumentsProject() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    // connect to a mongodb cluster linked to the realm app
                    val mongoClient = user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("plant-data-collection")
                    Log.v("EXAMPLE",
                        "Successfully instantiated the MongoDB collection handle")

                    // :snippet-start: aggregate-documents-project
                    // create an aggregation pipeline
                    val pipeline =
                        listOf(
                            Document("\$project",
                                Document("_id", 0)
                                    .append("name", 1)
                                    .append("storeNumber",
                                        Document("\$arrayElemAt",
                                            listOf(
                                                Document("\$split",
                                                    listOf(
                                                        "\$_partition",
                                                        " "
                                                    )
                                                ),
                                                1
                                            )
                                        )
                                    )
                            )
                        )

                    // query mongodb using the pipeline
                    val aggregationTask = mongoCollection.aggregate(pipeline).iterator()

                    // handle success or failure of the query
                    aggregationTask.getAsync { task: App.Result<MongoCursor<Document>> ->
                        if (task.isSuccess) {
                            val results = task.get()

                            // iterate over and print the results to the log
                            Log.v("EXAMPLE",
                                "successfully aggregated the plants. Results:")
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString())
                            }
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE",
                                "failed to aggregate documents with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun aggregateDocumentsAddFields() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    // connect to a mongodb cluster linked to the realm app
                    val mongoClient = user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("plant-data-collection")
                    Log.v("EXAMPLE",
                        "Successfully instantiated the MongoDB collection handle")
                    // :snippet-start: aggregate-documents-addfields
                    // create an aggregation pipeline
                    val pipeline =
                        listOf(
                            Document("\$addFields",
                                Document("storeNumber",
                                    Document("\$arrayElemAt",
                                        listOf(
                                            Document("\$split",
                                                listOf(
                                                    "\$_partition",
                                                    " "
                                                )
                                            ),
                                            1
                                        )
                                    )
                                )
                            )
                        )

                    // query mongodb using the pipeline
                    val aggregationTask = mongoCollection.aggregate(pipeline).iterator()

                    // handle success or failure of the query
                    aggregationTask.getAsync { task: App.Result<MongoCursor<Document>> ->
                        if (task.isSuccess) {
                            val results = task.get()

                            // iterate over and print the results to the log
                            Log.v("EXAMPLE",
                                "successfully aggregated the plants. Results:")
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString())
                            }
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE",
                                "failed to aggregate documents with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }

    @Test
    fun aggregateDocumentsUnwindArrays() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val user = app.currentUser()
                    // connect to a mongodb cluster linked to the realm app
                    val mongoClient = user!!.getMongoClient("mongodb-atlas")
                    val mongoDatabase =
                        mongoClient.getDatabase("plant-data-database")
                    val mongoCollection =
                        mongoDatabase.getCollection("plant-data-collection")
                    Log.v("EXAMPLE",
                        "Successfully instantiated the MongoDB collection handle")

                    // :snippet-start: aggregate-documents-unwind-arrays
                    // create an aggregation pipeline
                    val pipeline =
                        listOf(
                            Document("\$unwind", Document("path", "\$items")
                                    .append("includeArrayIndex", "itemIndex"))
                        )

                    // query mongodb using the pipeline
                    val aggregationTask = mongoCollection.aggregate(pipeline).iterator()

                    // handle success or failure of the query
                    aggregationTask.getAsync { task: App.Result<MongoCursor<Document>> ->
                        if (task.isSuccess) {
                            val results = task.get()

                            // iterate over and print the results to the log
                            Log.v("EXAMPLE",
                                "successfully aggregated the plants. Results:")
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString())
                            }
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE",
                                "failed to aggregate documents with: ${task.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed login: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }
}
