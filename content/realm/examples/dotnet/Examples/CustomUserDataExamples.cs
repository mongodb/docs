using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examples;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class CustomUserDataExamples
    {
        App app;
        User user;
        const string myRealmAppId = Config.AppId;
        MongoClient mongoClient;
        MongoClient.Database dbTracker;
        MongoClient.Collection<CustomUserData> userDataCollection;


        [OneTimeSetUp]
        public async Task Creates()
        {
            // :snippet-start: create
            // :replace-start: {
            //  "terms": {
            //   "dotnet_tests": "tracker"}
            // }
            app = App.Create(myRealmAppId);
            user = await app.LogInAsync(Credentials.Anonymous());

            mongoClient = user.GetMongoClient("mongodb-atlas");
            dbTracker = mongoClient.GetDatabase("dotnet_tests");
            userDataCollection = dbTracker.GetCollection<CustomUserData>("user_data");

            var cud = new CustomUserData(user.Id)
            {
                FavoriteColor = "pink",
                LocalTimeZone = "+8",
                HasPets = true
            };

            var insertResult = await userDataCollection.InsertOneAsync(cud);
            // :replace-end:
            // :snippet-end:
            Assert.AreEqual(user.Id, insertResult.InsertedId);
        }

        [Test, Order(0)]
        public async Task Reads()
        {
            // :snippet-start: read
            await user.RefreshCustomDataAsync();

            // Tip: define a class that represents the custom data
            // and use the gerneic overload of GetCustomData<>()
            var customUserData = user.GetCustomData<CustomUserData>();

            Console.WriteLine($"User has pets: {customUserData.HasPets}");
            Console.WriteLine($"User's favorite color is {customUserData.FavoriteColor}");
            Console.WriteLine($"User's timezone is {customUserData.LocalTimeZone}");
            // :snippet-end:
            Assert.IsTrue(customUserData.HasPets);
        }

        [Test, Order(1)]
        public async Task Updates()
        {
            // :snippet-start: update
            var updateResult = await userDataCollection.UpdateOneAsync(
                new BsonDocument("_id", user.Id),
                new BsonDocument("$set", new BsonDocument("HasPets", false)));

            await user.RefreshCustomDataAsync();
            var customUserData = user.GetCustomData<CustomUserData>();

            Console.WriteLine($"User has pets: {customUserData.HasPets}");
            Console.WriteLine($"User's favorite color is {customUserData.FavoriteColor}");
            Console.WriteLine($"User's timezone is {customUserData.LocalTimeZone}");
            // :snippet-end:
            Assert.AreEqual(1, updateResult.ModifiedCount);
            Assert.IsFalse(customUserData.HasPets);
        }

        [OneTimeTearDown]
        public async Task TearDown()
        {
            // :snippet-start: delete
            var deleteResult = await userDataCollection.DeleteOneAsync(
                new BsonDocument("_id", user.Id));

            // The `DeletedCount` should be 1
            Console.WriteLine(deleteResult.DeletedCount);

            // There should no longer be a custom user document for the user
            var customData = await userDataCollection.FindOneAsync(
                new BsonDocument("_id", user.Id));

            Console.WriteLine(customData == null);

            // :snippet-end:

            //await userDataCollection.DeleteManyAsync();
        }

    }

    // :snippet-start: cud
    public class CustomUserData
    {
        public string _id { get; private set; }

        public string _partition { get; private set; }

        public string FavoriteColor { get; set; }

        public string LocalTimeZone { get; set; }

        public bool HasPets { get; set; }

        public CustomUserData(string id, string partition = "myPart")
        {
            this._id = id;
            this._partition = partition;
        }
    }
    // :snippet-end:
}