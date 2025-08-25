package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.Plant;

import org.bson.BsonObjectId;
import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.RealmEventStreamAsyncTask;
import io.realm.mongodb.RealmResultTask;
import io.realm.mongodb.User;
import io.realm.mongodb.mongo.MongoClient;
import io.realm.mongodb.mongo.MongoCollection;
import io.realm.mongodb.mongo.MongoDatabase;
import io.realm.mongodb.mongo.iterable.MongoCursor;
import io.realm.mongodb.mongo.options.UpdateOptions;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class MongoDBDataAccessTest extends RealmTest {
    @Before
    public void setUpData() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    // :snippet-start: example-data
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    mongoCollection.insertMany(Arrays.asList(
                            new Plant(new ObjectId(),
                                    "venus flytrap",
                                    "full",
                                    "white",
                                    "perennial",
                                    "Store 42"),
                            new Plant(new ObjectId(),
                                    "sweet basil",
                                    "partial",
                                    "green",
                                    "annual",
                                    "Store 42"),
                            new Plant(new ObjectId(),
                                    "thai basil",
                                    "partial",
                                    "green",
                                    "perennial",
                                    "Store 42"),
                            new Plant(new ObjectId(),
                                    "helianthus",
                                    "full",
                                    "yellow",
                                    "annual",
                                    "Store 42"),
                            new Plant(new ObjectId(),
                                    "petunia",
                                    "full",
                                    "purple",
                                    "annual",
                                    "Store 47")));
                    Log.v("EXAMPLE", "Successfully inserted the sample data.");
                    // :remove-start:
                    expectation.fulfill();
                    // :remove-end:
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void instantiateAMongoDBCollectionHandle() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    // :snippet-start: instantiate-a-mongodb-collection-handle
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :remove-start:
                    expectation.fulfill();
                    // :remove-end:
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void insertASingleDocument() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: insert-a-single-document
                    Plant plant = new Plant(
                            new ObjectId(),
                            "lily of the valley",
                            "full",
                            "white",
                            "perennial",
                            "Store 47");
                    mongoCollection.insertOne(plant).getAsync(task -> {
                        if (task.isSuccess()) {
                            Log.v("EXAMPLE", "successfully inserted a document with id: " + task.get().getInsertedId());
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to insert documents with: " + task.getError().getErrorMessage());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void insertMultipleDocuments() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: insert-multiple-documents
                    List<Plant> plants  = Arrays.asList(
                            new Plant(new ObjectId(),
                                    "rhubarb",
                                    "full",
                                    "red",
                                    "perennial",
                                    "Store 47"),
                            new Plant(new ObjectId(),
                                    "wisteria lilac",
                                    "partial",
                                    "purple",
                                    "perennial",
                                    "Store 42"),
                            new Plant(new ObjectId(),
                                    "daffodil",
                                    "full",
                                    "yellow",
                                    "perennial",
                                    "Store 42"));
                    mongoCollection.insertMany(plants).getAsync(task -> {
                        if (task.isSuccess()) {
                            int insertedCount = task.get().getInsertedIds().size();
                            Log.v("EXAMPLE", "successfully inserted " + insertedCount + " documents into the collection.");
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to insert documents with: ", task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void findASingleDocument() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: find-a-single-document
                    Document queryFilter  = new Document("type", "perennial");
                    mongoCollection.findOne(queryFilter).getAsync(task -> {
                        if (task.isSuccess()) {
                            Plant result = task.get();
                            Log.v("EXAMPLE", "successfully found a document: " + result);
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to find document with: ", task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void findMultipleDocuments() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: find-multiple-documents
                    Document queryFilter  = new Document("_partition", "Store 42");
                    RealmResultTask<MongoCursor<Plant>> findTask = mongoCollection.find(queryFilter).iterator();
                    findTask.getAsync(task -> {
                        if (task.isSuccess()) {
                            MongoCursor<Plant> results = task.get();
                            Log.v("EXAMPLE", "successfully found all plants for Store 42:");
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString());
                            }
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to find documents with: ", task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void countDocuments() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: count-documents
                    mongoCollection.count().getAsync(task -> {
                        if (task.isSuccess()) {
                            long count = task.get();
                            Log.v("EXAMPLE",
                                    "successfully counted, number of documents in the collection: " +
                                            count);
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to count documents with: ", task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void updateASingleDocument() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: update-a-single-document
                    Document queryFilter = new Document("name", "petunia");
                    Document updateDocument = new Document("$set", new Document("sunlight", "partial"));
                    mongoCollection.updateOne(queryFilter, updateDocument).getAsync(task -> {
                        if (task.isSuccess()) {
                            long count = task.get().getModifiedCount();
                            if (count == 1) {
                                Log.v("EXAMPLE", "successfully updated a document.");
                            } else {
                                Log.v("EXAMPLE", "did not update a document.");
                            }
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to update document with: ", task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void updateMultipleDocuments() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: update-multiple-documents
                    Document queryFilter = new Document("_partition", "Store 47");
                    Document updateDocument = new Document("$set", new Document("_partition", "Store 51"));
                    mongoCollection.updateMany(queryFilter, updateDocument).getAsync(task -> {
                        if (task.isSuccess()) {
                            long count = task.get().getModifiedCount();
                            if (count != 0) {
                                Log.v("EXAMPLE", "successfully updated " + count + " documents.");
                            } else {
                                Log.v("EXAMPLE", "did not update any documents.");
                            }
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to update documents with: ", task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void upsertASingleDocument() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: upsert-a-single-document
                    Document queryFilter = new Document("sunlight", "full")
                            .append("type", "perennial")
                            .append("color", "green")
                            .append("_partition", "Store 47");
                    Document updateDocument = new Document("$set", new Document("name", "sweet basil"));
                    UpdateOptions updateOptions = new UpdateOptions().upsert(true);
                    mongoCollection.updateOne(queryFilter, updateDocument, updateOptions).getAsync(task -> {
                        if (task.isSuccess()) {
                            if(task.get().getUpsertedId() != null) {
                                Log.v("EXAMPLE", "successfully upserted a document with id " +
                                        task.get().getUpsertedId());
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            } else {
                                Log.v("EXAMPLE", "successfully updated a document.");
                            }
                        } else {
                            Log.e("EXAMPLE", "failed to update or insert document with: ",
                                    task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void deleteASingleDocument() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: delete-a-single-document
                    Document queryFilter = new Document("color", "green");
                    mongoCollection.deleteOne(queryFilter).getAsync(task -> {
                        if (task.isSuccess()) {
                            long count = task.get().getDeletedCount();
                            if (count == 1) {
                                Log.v("EXAMPLE", "successfully deleted a document.");
                            } else {
                                Log.v("EXAMPLE", "did not delete a document.");
                            }
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to delete document with: ", task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void deleteMultipleDocuments() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: delete-documents
                    Document queryFilter = new Document("sunlight", "full")
                            .append("type", "annual");
                    mongoCollection.deleteMany(queryFilter).getAsync(task -> {
                        if (task.isSuccess()) {
                            long count = task.get().getDeletedCount();
                            if (count != 0) {
                                Log.v("EXAMPLE", "successfully deleted " + count + " documents.");
                            } else {
                                Log.v("EXAMPLE", "did not delete any documents.");
                            }
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to delete documents with: ", task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void watchDocuments() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: watch-documents
                    RealmEventStreamAsyncTask<Plant> watcher = mongoCollection.watchAsync();
                    watcher.get(result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Event type: " +
                                    result.get().getOperationType() + " full document: " +
                                    result.get().getFullDocument());
                        } else {
                            Log.e("EXAMPLE", "failed to subscribe to changes in the collection with : ",
                                    result.getError());
                        }
                    });
                    Plant triffid = new Plant(
                            new ObjectId(),
                            "triffid",
                            "low",
                            "green",
                            "perennial",
                            "Store 47");
                    mongoCollection.insertOne(triffid).getAsync(task -> {
                        if (task.isSuccess()) {
                            BsonObjectId insertedId = task.get().getInsertedId().asObjectId();
                            Log.v("EXAMPLE", "successfully inserted a document with id " + insertedId);
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to insert document with: ", task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void watchDocumentsWithFilter() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    // registry to handle POJOs (Plain Old Java Objects)
                    CodecRegistry pojoCodecRegistry = fromRegistries(AppConfiguration.DEFAULT_BSON_CODEC_REGISTRY,
                            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
                    MongoCollection<Plant> mongoCollection =
                            mongoDatabase.getCollection(
                                    "plant-data-collection",
                                    Plant.class).withCodecRegistry(pojoCodecRegistry);
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: watch-documents-with-filter
                    RealmEventStreamAsyncTask<Plant> watcher = mongoCollection
                            .watchWithFilterAsync(new Document("fullDocument._partition", "Store 42"));
                    watcher.get(result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Event type: " +
                                    result.get().getOperationType() + " full document: " +
                                    result.get().getFullDocument());
                        } else {
                            Log.e("EXAMPLE",
                                    "failed to subscribe to filtered changes in the collection with : ",
                                    result.getError());
                        }
                    });
                    List<Plant> plants  = Arrays.asList(
                            new Plant(
                                    new ObjectId(),
                                    "triffid",
                                    "low",
                                    "green",
                                    "perennial",
                                    "Store 47"),
                            new Plant(
                                    new ObjectId(),
                                    "venomous tentacula",
                                    "low",
                                    "brown",
                                    "annual",
                                    "Store 42"
                            ));
                    mongoCollection.insertMany(plants).getAsync(task -> {
                        if (task.isSuccess()) {
                            int insertedCount = task.get().getInsertedIds().size();
                            Log.v("EXAMPLE", "successfully inserted " +
                                    insertedCount + " documents into the collection.");
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to insert documents with: ",
                                    task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void aggregateDocumentsFilter() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    // connect to a mongodb cluster linked to the realm app
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("plant-data-collection");
                    Log.v("EXAMPLE",
                            "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: aggregate-documents-filter
                    // create an aggregation pipeline
                    List<Document> pipeline = Arrays.asList(
                            new Document("$match",
                                    new Document("type",
                                            new Document("$eq", "perennial"))));

                    // query mongodb using the pipeline
                    RealmResultTask<MongoCursor<Document>> aggregationTask =
                            mongoCollection.aggregate(pipeline).iterator();

                    // handle success or failure of the query
                    aggregationTask.getAsync(task -> {
                        if (task.isSuccess()) {
                            MongoCursor<Document> results = task.get();

                            // iterate over and print the results to the log
                            Log.v("EXAMPLE", "successfully aggregated the plants. Results:");
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString());
                            }
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to aggregate documents with: ",
                                    task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void aggregateDocumentsGroup() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    // connect to a mongodb cluster linked to the realm app
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("plant-data-collection");
                    Log.v("EXAMPLE",
                            "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: aggregate-documents-group
                    // create an aggregation pipeline
                    List<Document> pipeline = Arrays.asList(
                            new Document("$group", new Document("_id", "$type")
                                    .append("totalCount", new Document("$sum", 1))));

                    // query mongodb using the pipeline
                    RealmResultTask<MongoCursor<Document>> aggregationTask =
                            mongoCollection.aggregate(pipeline).iterator();

                    // handle success or failure of the query
                    aggregationTask.getAsync(task -> {
                        if (task.isSuccess()) {
                            MongoCursor<Document> results = task.get();

                            // iterate over and print the results to the log
                            Log.v("EXAMPLE", "successfully aggregated the plants. Results:");
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString());
                            }
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to aggregate documents with: ",
                                    task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void aggregateDocumentsProject() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    // connect to a mongodb cluster linked to the realm app
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("plant-data-collection");
                    Log.v("EXAMPLE",
                            "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: aggregate-documents-project
                    // create an aggregation pipeline
                    List<Document> pipeline = Arrays.asList(
                            new Document("$project",
                                    new Document("_id", 0)
                                        .append("name", 1)
                                        .append("storeNumber",
                                            new Document("$arrayElemAt",
                                                Arrays.asList(
                                                        new Document("$split",
                                                                Arrays.asList("$_partition", " ")),
                                                        1)))));

                    // query mongodb using the pipeline
                    RealmResultTask<MongoCursor<Document>> aggregationTask =
                            mongoCollection.aggregate(pipeline).iterator();

                    // handle success or failure of the query
                    aggregationTask.getAsync(task -> {
                        if (task.isSuccess()) {
                            MongoCursor<Document> results = task.get();

                            // iterate over and print the results to the log
                            Log.v("EXAMPLE", "successfully aggregated the plants. Results:");
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString());
                            }
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to aggregate documents with: ",
                                    task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void aggregateDocumentsAddFields() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    // connect to a mongodb cluster linked to the realm app
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("plant-data-collection");
                    Log.v("EXAMPLE",
                            "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: aggregate-documents-addfields
                    // create an aggregation pipeline
                    List<Document> pipeline = Arrays.asList(
                            new Document("$addFields",
                                    new Document("storeNumber",
                                            new Document("$arrayElemAt", Arrays.asList(
                                                    new Document("$split", Arrays.asList(
                                                            "$_partition", " ")), 1)))));

                    // query mongodb using the pipeline
                    RealmResultTask<MongoCursor<Document>> aggregationTask =
                            mongoCollection.aggregate(pipeline).iterator();

                    // handle success or failure of the query
                    aggregationTask.getAsync(task -> {
                        if (task.isSuccess()) {
                            MongoCursor<Document> results = task.get();

                            // iterate over and print the results to the log
                            Log.v("EXAMPLE", "successfully aggregated the plants. Results:");
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString());
                            }
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to aggregate documents with: ",
                                    task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void aggregateDocumentsUnwindArrays() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    // connect to a mongodb cluster linked to the realm app
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas");
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("plant-data-collection");
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :snippet-start: aggregate-documents-unwind-arrays
                    // create an aggregation pipeline
                    List<Document> pipeline = Arrays.asList(
                            new Document("$unwind", new Document("path", "$items")
                                    .append("includeArrayIndex", "itemIndex")));

                    // query mongodb using the pipeline
                    RealmResultTask<MongoCursor<Document>> aggregationTask = mongoCollection.aggregate(pipeline).iterator();

                    // handle success or failure of the query
                    aggregationTask.getAsync(task -> {
                        if (task.isSuccess()) {
                            MongoCursor<Document> results = task.get();

                            // iterate over and print the results to the log
                            Log.v("EXAMPLE", "successfully aggregated the plants. Results:");
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString());
                            }
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "failed to aggregate documents with: ",
                                    task.getError());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }
}
