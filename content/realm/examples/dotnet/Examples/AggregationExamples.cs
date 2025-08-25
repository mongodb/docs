using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examples;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using Examples.Models;

namespace Examples
{
    public class AggregationExamples
    {
        App app;
        Realms.Sync.User user;
        PartitionSyncConfiguration config;
        const string myRealmAppId = Config.AppId;

        MongoClient mongoClient;
        MongoClient.Database dbPlantInventory;
        MongoClient.Collection<Plant> plantsCollection;

        Plant venus;
        Plant sweetBasil;
        Plant thaiBasil;
        Plant helianthus;
        Plant petunia;

        [OneTimeSetUp]
        public async Task Setup()
        {
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(Config.EPCreds).Result;
            config = new PartitionSyncConfiguration("myPart", user);
            //:remove-start:
            config.Schema = new[] { typeof(Plant) };
            //:remove-end:
            SetupPlantCollection();

            //await plantsCollection.DeleteManyAsync();

            venus = new Plant
            {
                Name = "Venus Flytrap",
                Sunlight = Sunlight.Full.ToString(),
                Color = PlantColor.White.ToString(),
                Type = PlantType.Perennial.ToString(),
                Partition = "Store 42"
            };
            sweetBasil = new Plant
            {
                Name = "Sweet Basil",
                Sunlight = Sunlight.Partial.ToString(),
                Color = PlantColor.Green.ToString(),
                Type = PlantType.Annual.ToString(),
                Partition = "Store 42"
            };
            thaiBasil = new Plant
            {
                Name = "Thai Basil",
                Sunlight = Sunlight.Partial.ToString(),
                Color = PlantColor.Green.ToString(),
                Type = PlantType.Perennial.ToString(),
                Partition = "Store 42"
            };
            helianthus = new Plant
            {
                Name = "Helianthus",
                Sunlight = Sunlight.Full.ToString(),
                Color = PlantColor.Yellow.ToString(),
                Type = PlantType.Annual.ToString(),
                Partition = "Store 42"
            };
            petunia = new Plant
            {
                Name = "Petunia",
                Sunlight = Sunlight.Full.ToString(),
                Color = PlantColor.Purple.ToString(),
                Type = PlantType.Annual.ToString(),
                Partition = "Store 47"
            };

            var listofPlants = new List<Plant>
            {
                venus,
                sweetBasil,
                thaiBasil,
                helianthus,
                petunia
            };

            var insertResult = await plantsCollection.InsertManyAsync(listofPlants);



            return;
        }

        private void SetupPlantCollection()
        {
            mongoClient = user.GetMongoClient("mongodb-atlas");
            dbPlantInventory = mongoClient.GetDatabase("dotnet_tests");
            plantsCollection = dbPlantInventory.GetCollection<Plant>("plants");
        }

        // [Test]
        public async Task GroupsAndCounts()
        {
            if (plantsCollection == null)
            {
                SetupPlantCollection();
            }
            // :snippet-start: agg_group
            var groupStage =
                new BsonDocument("$group",
                    new BsonDocument
                    {
                        { "_id", "$type" },
                        { "count", new BsonDocument("$sum", 1) }
                    });

            var sortStage = new BsonDocument("$sort",
                new BsonDocument("_id", 1));

            var aggResult = await plantsCollection.AggregateAsync(groupStage, sortStage);
            foreach (var item in aggResult)
            {
                var id = item["_id"];
                var count = item["count"];
                Console.WriteLine($"Plant type: {id}; count: {count}");
            }

            // :snippet-end:
            Assert.AreEqual(PlantType.Annual.ToString(), aggResult[0]["_id"] != null ? aggResult[0]["_id"].AsString : "null");
            Assert.AreEqual(PlantType.Perennial.ToString(), aggResult[1]["_id"].AsString);
            Assert.AreEqual(3, aggResult[0]["count"].AsInt32);
            Assert.AreEqual(2, aggResult[1]["count"].AsInt32);

            // :snippet-start: agg_group_alt
            var groupStep = BsonDocument.Parse(@"
              {
                $group: {
                  _id: '$type', 
                  count: {
                    $sum: 1
                  }
                }
              }
            ");

            var sortStep = BsonDocument.Parse("{$sort: { _id: 1}}");

            aggResult = await plantsCollection.AggregateAsync(groupStep, sortStep);
            foreach (var item in aggResult)
            {
                var id = item["_id"];
                var count = item["count"];
                Console.WriteLine($"Id: {id}, Count: {count}");
            }
            // :snippet-end:
            Assert.AreEqual(PlantType.Annual.ToString(), aggResult[0]["_id"].AsString);
            Assert.AreEqual(PlantType.Perennial.ToString(), aggResult[1]["_id"].AsString);
            Assert.AreEqual(3, aggResult[0]["count"].AsInt32);
            Assert.AreEqual(2, aggResult[1]["count"].AsInt32);
        }

        // [Test]
        public async Task Filters()
        {
            if (plantsCollection == null)
            {
                SetupPlantCollection();
            }
            // :snippet-start: agg_filter
            var matchStage = new BsonDocument("$match",
                    new BsonDocument("type",
                        new BsonDocument("$eq",
                            PlantType.Perennial)));

            // Alternate approach using BsonDocument.Parse(...)
            matchStage = BsonDocument.Parse(@"{
              $match: {
                type: { $eq: '" + PlantType.Perennial + @"' }
              }}");

            var sortStage = BsonDocument.Parse("{$sort: { _id: 1}}");

            var aggResult = await plantsCollection.AggregateAsync<Plant>(matchStage, sortStage);
            foreach (var plant in aggResult)
            {
                Console.WriteLine($"Plant Name: {plant.Name}, Color: {plant.Color}");
            }
            // :snippet-end:
            Assert.AreEqual(venus.Id, aggResult[0].Id);
            Assert.AreEqual(venus.Name, aggResult[0].Name);
            Assert.AreEqual(thaiBasil.Id, aggResult[1].Id);
            Assert.AreEqual(thaiBasil.Partition, aggResult[1].Partition);
        }

        // [Test]
        public async Task Projects()
        {
            if (plantsCollection == null)
            {
                SetupPlantCollection();
            }
            // :snippet-start: agg_project
            var projectStage = new BsonDocument("$project",
                new BsonDocument
                {
                    { "_id", 0 },
                    { "_partition", 1 },
                    { "type", 1 },
                    { "name", 1 },
                    { "storeNumber",
                        new BsonDocument("$arrayElemAt",
                            new BsonArray {
                                new BsonDocument("$split",
                                new BsonArray
                                {
                                    "$_partition",
                                    " "
                                }), 1 }) }
                });

            var sortStage = BsonDocument.Parse("{$sort: { storeNumber: 1}}");

            var aggResult = await plantsCollection.AggregateAsync(projectStage, sortStage);
            foreach (var item in aggResult)
            {
                Console.WriteLine($"{item["name"]} is in store #{item["storeNumber"]}.");
            }
            // :snippet-end:
            // :snippet-start: agg_project_alt
            projectStage = BsonDocument.Parse(@"
                {
                  _id:0,
                  _partition: 1,
                  type: 1,
                  name: 1,
                  storeNumber: {
                    $arrayElemAt: [
                      { $split:[
                        '$_partition', ' '
                        ]
                      }, 1 ]
                  }
                }");
            // :snippet-end:
            Assert.AreEqual(5, aggResult.Length);
            //Assert.Throws<KeyNotFoundException>(() => aggResult[0].GetElement("_id"));
            Assert.AreEqual("storeNumber=42", aggResult[0].GetElement("storeNumber").ToString());
        }

        [OneTimeTearDown]
        public async Task TearDown()
        {
            if (plantsCollection == null)
            {
                SetupPlantCollection();
            }
            await plantsCollection.DeleteManyAsync();

            return;
        }
    }
}