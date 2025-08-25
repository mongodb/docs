using System;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using System.Threading.Tasks;

namespace Examples
{
    public class FunctionExamples
    {
        App app;
        User user;
        PartitionSyncConfiguration config;
        const string myRealmAppId = Config.AppId;

        [OneTimeSetUp]
        public async Task Setup()
        {

            app = App.Create(myRealmAppId);
            user = await app.LogInAsync(Config.EPCreds);
            config = new PartitionSyncConfiguration("myPart", user);
            config.Schema = new[]
            {
                typeof(MyClass)
            };
            return;
        }

        [Test]
        public async Task CallsAFunction()
        {
            try
            {
                // :snippet-start: callfunc
                var bsonValue = await
                    user.Functions.CallAsync("sum", 2, 40);

                // The result must now be cast to Int32:
                var sum = bsonValue.ToInt32();

                // Or use the generic overloads to avoid casting the BsonValue:
                sum = await
                   user.Functions.CallAsync<int>("sum", 2, 40);
                // :snippet-end:
                Assert.AreEqual(42, sum);
                // :snippet-start: callfuncWithPOCO
                var item = await user.Functions.CallAsync<MyClass>
                    ("getItem", "5f7f7638024a99f41a3c8de4");

                var name = item.Name;
                // :snippet-end:
                return;
            }
            catch (Exception) { }
            //{ "_id":{ "$oid":"5f0f69dc4eeabfd3366be2be"},"_partition":"myPart","name":"do this NOW","status":"Closed"}
        }
    }

    public partial class MyClass : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; }

        [MapTo("name")]
        public string Name { get; set; }

        public MyClass()
        {
            this.Id = ObjectId.GenerateNewId();
        }
    }


}
