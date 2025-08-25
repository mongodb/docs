using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examples;
using Examples.Models;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class MongoDBExamples
    {
        App app;
        Realms.Sync.User user;
        PartitionSyncConfiguration config;
        const string myRealmAppId = Config.AppId;

        MongoClient mongoClient;
        MongoClient.Database dbPlantInventory;
        MongoClient.Collection<Plant> plantsCollection;

        [OneTimeSetUp]
        public async Task Setup()
        {
            app = App.Create(myRealmAppId);
            user = await app.LogInAsync(Config.EPCreds);
            config = new PartitionSyncConfiguration("myPart", user);

            // :snippet-start: mongo-setup
            // :replace-start: {
            //  "terms": {
            //   "dotnet_tests": "inventory"}
            // }
            mongoClient = user.GetMongoClient("mongodb-atlas");
            dbPlantInventory = mongoClient.GetDatabase("dotnet_tests");
            plantsCollection = dbPlantInventory.GetCollection<Plant>("plants");
            // :replace-end:
            // :snippet-end:

            await InsertsOne();
            await InsertsMany();
            return;
        }

        public async Task InsertsOne()
        {
            // :snippet-start: mongo-insert-one
            var plant = new Plant
            {
                Name = "Venus Flytrap",
                Sunlight = Sunlight.Full.ToString(),
                Color = PlantColor.White.ToString(),
                Type = PlantType.Perennial.ToString(),
                Partition = "Store 42"
            };

            var insertResult = await plantsCollection.InsertOneAsync(plant);
            var newId = insertResult.InsertedId;
            // :snippet-end:

        }

        public async Task InsertsMany()
        {
            // :snippet-start: mongo-insert-many
            var sweetBasil = new Plant
            {
                Name = "Sweet Basil",
                Sunlight = Sunlight.Partial.ToString(),
                Color = PlantColor.Green.ToString(),
                Type = PlantType.Annual.ToString(),
                Partition = "Store 42"
            };
            var thaiBasil = new Plant
            {
                Name = "Thai Basil",
                Sunlight = Sunlight.Partial.ToString(),
                Color = PlantColor.Green.ToString(),
                Type = PlantType.Perennial.ToString(),
                Partition = "Store 42"
            };
            var helianthus = new Plant
            {
                Name = "Helianthus",
                Sunlight = Sunlight.Full.ToString(),
                Color = PlantColor.Yellow.ToString(),
                Type = PlantType.Annual.ToString(),
                Partition = "Store 42"
            };
            var petunia = new Plant
            {
                Name = "Petunia",
                Sunlight = Sunlight.Full.ToString(),
                Color = PlantColor.Purple.ToString(),
                Type = PlantType.Annual.ToString(),
                Partition = "Store 47"
            };

            var listofPlants = new List<Plant>
            {
                sweetBasil,
                thaiBasil,
                helianthus,
                petunia
            };

            var insertResult = await plantsCollection.InsertManyAsync(listofPlants);
            var newIds = insertResult.InsertedIds;
            // :snippet-end:
        }

        // [Test]
        public async Task ReadsDocuments()
        {
            // :snippet-start: mongo-find-one
            var petunia = await plantsCollection.FindOneAsync(
               new { name = "Petunia" },
               null);
            // :snippet-end:
            Assert.AreEqual("Store 47", petunia.Partition);
            // :snippet-start: mongo-find-many
            var allPerennials = await plantsCollection.FindAsync(
                new { type = PlantType.Perennial.ToString() },
                new { name = 1 });
            // :snippet-end:
            Assert.AreEqual(2, allPerennials.Count());
            // :snippet-start: mongo-count
            var allPlants = await plantsCollection.CountAsync();
            // :snippet-end:
            Assert.AreEqual(5, allPlants);
        }

        // [Test]
        public async Task UpdatesDocuments()
        {
            {
                // :snippet-start: mongo-update-one
                var updateResult = await plantsCollection.UpdateOneAsync(
                    new { name = "Petunia" },
                    new BsonDocument("$set", new BsonDocument("sunlight", Sunlight.Partial.ToString()))
                    );
                // :snippet-end:
                Assert.AreEqual(1, updateResult.MatchedCount);
                Assert.AreEqual(1, updateResult.ModifiedCount);
            }
            {
                // :snippet-start: mongo-update-many
                var filter = new { _partition = "Store 47" };
                var updateDoc = new BsonDocument("$set",
                    new BsonDocument("_partition", "Area 51"));

                var updateResult = await plantsCollection.UpdateManyAsync(
                    filter, updateDoc);
                // :snippet-end:
                Assert.AreEqual(1, updateResult.MatchedCount);
                Assert.AreEqual(1, updateResult.ModifiedCount);
            }
            {
                // :snippet-start: mongo-upsert
                var filter = new BsonDocument()
                    .Add("name", "Pothos")
                    .Add("type", PlantType.Perennial.ToString())
                    .Add("sunlight", Sunlight.Full.ToString());

                var updateResult = await plantsCollection.UpdateOneAsync(
                    filter,
                    new BsonDocument("$set", new BsonDocument("_partition", "Store 42")),
                    upsert: true);

                /* The upsert will create the following object:

                {
                   "name": "pothos",
                   "sunlight": "full",
                   "type": "perennial",
                   "_partition": "Store 42"
                }
                */
                // :snippet-end:

                var plant = await plantsCollection.FindOneAsync(filter);
                Assert.AreEqual("Store 42", plant.Partition);
                Assert.AreEqual(plant.Id, updateResult.UpsertedId);
            }
        }

        [OneTimeTearDown]
        public async Task TearDown()
        {

            // :snippet-start: mongo-delete-one
            var filter = new BsonDocument("name", "Thai Basil");
            var deleteResult = await plantsCollection.DeleteOneAsync(filter);
            // :snippet-end:

            // :snippet-start: mongo-delete-many
            // :replace-start: {
            //  "terms": {
            //   "filter2": "filter",
            //   "deleteResult2": "deleteResult" }
            // }
            var filter2 = new BsonDocument("type", PlantType.Annual);
            var deleteResult2 = await plantsCollection.DeleteManyAsync(filter);
            // :replace-end:
            // :snippet-end:

            await plantsCollection.DeleteManyAsync();
            return;
        }
    }
}