using System;
using NUnit.Framework;
using Realms.Sync;
using MongoDB.Bson;
using Realms;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Examples
{

    public class QueryEngineExamples
    {
        public QueryEngineExamples()
        {
        }

        App app;
        User user;
        PartitionSyncConfiguration config;
        const string myRealmAppId = Config.AppId;

        [OneTimeSetUp]
        public async Task Setup()
        {
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(Config.EPCreds).Result;
            config = new PartitionSyncConfiguration("foo", user);
            //:remove-start:
            config.Schema = new[]
            {
                typeof(UserTask),
                typeof(UserProject)
            };
            //:remove-end:
            var realm = await Realm.GetInstanceAsync(config);
            var synchronousRealm = await Realm.GetInstanceAsync(config);

            var t = new UserTask() { Priority = 100, ProgressMinutes = 5, Assignee = "Jamie", Name = "Jamie_Task" };
            var t2 = new UserTask() { Priority = 1, ProgressMinutes = 500, Assignee = "Elvis", Name = "Elvis_Task" };
            var up = new UserProject() { Name = "A Big Project" };
            up.Items.Add(t);
            up.Items.Add(t2);
            realm.Write(() =>
            {
                realm.Add(t);
                realm.Add(t2);
                realm.Add(up);
            });
            return;
        }


        [Test]
        public async Task Comparisons()
        {
            var realm = await Realm.GetInstanceAsync(config);
            var items = realm.All<UserTask>();
            // :snippet-start: comparisons
            var highPri = items.Where(i => i.Priority > 5);

            var quickItems = items.Where(i =>
                i.ProgressMinutes >= 1 &&
                i.ProgressMinutes < 15);

            var unassignedItems = items.Where(i =>
                i.Assignee == null);

            var AliOrJamieItems = items.Where(i =>
               i.Assignee == "Ali" ||
               i.Assignee == "Jamie");
            // :snippet-end:

            Assert.AreEqual(1, highPri.Count());
            Assert.AreEqual(1, quickItems.Count());
            Assert.AreEqual(0, unassignedItems.Count());
            Assert.AreEqual(1, AliOrJamieItems.Count());
            // :snippet-start: logical
            var completedItemsForAli = items
                .Where(i => i.Assignee == "Ali" && i.IsComplete);
            // :snippet-end:
            // :snippet-start: strings

            // Note: In each of the following examples, you can replace the
            // Where() method with First(), FirstOrDefault(),
            // Single(), SingleOrDefault(),
            // Last(), or LastOrDefault().

            // Get all items where the Assignee's name starts with "E" or "e"
            var ItemssStartWithE = items.Where(i => i.Assignee.StartsWith("E",
                StringComparison.OrdinalIgnoreCase));

            // Get all items where the Assignee's name ends wth "is"
            // (lower case only)
            var endsWith = items.Where(t =>
                t.Assignee.EndsWith("is", StringComparison.Ordinal));

            // Get all items where the Assignee's name contains the
            // letters "ami" in any casing
            var itemsContains = items.Where(i => i.Assignee.Contains("ami",
                 StringComparison.OrdinalIgnoreCase));

            // Get all items that have no assignee
            var null_or_empty = items.Where(i => string.IsNullOrEmpty(i.Assignee));

            // :snippet-end:
            Assert.AreEqual(1, ItemssStartWithE.Count());
            Assert.AreEqual(1, itemsContains.Count());
            Assert.AreEqual(0, null_or_empty.Count());
            // :snippet-start: read_all
            // :replace-start: {
            // "terms": {
            //   "UserTask": "Items",
            //   "useritems": "items",
            //   "UserProject": "Project"}
            // }
            var projects = realm.All<UserProject>();
            var useritems = realm.All<UserTask>();
            // :replace-end:
            // :snippet-end:
            var projectId = projects.First().ID;
            // :snippet-start: get_by_id
            // :replace-start: {
            // "terms": {
            //   "UserProject": "Project"}
            // }
            var myProject = realm.Find<UserProject>(projectId);
            // :replace-end:
            // :snippet-end:
            // :snippet-start: aggregate
            // Get all projects with an average Item priorty > 5:
            var avgPriority = projects.Filter(
                "Items.@avg.Priority > $0", 5);

            // Get all projects where all Items are high-priority:
            var highPriProjects = projects.Filter(
                "Items.@min.Priority > $0", 5);

            // Get all projects with long-running Items:
            var longRunningProjects = projects.Filter(
                "Items.@sum.ProgressMinutes > $0", 100);
            // :snippet-end:

            // :snippet-start: rql
            var elvisProjects = projects.Filter("Items.Assignee == $0", "Elvis");
            // :snippet-end:

            Assert.AreEqual(1, avgPriority.Count());
            Assert.AreEqual(0, highPriProjects.Count()); // 0 because the project has one lower than 5
            Assert.AreEqual(1, longRunningProjects.Count());
            Assert.AreEqual(1, elvisProjects.Count());
            return;
        }

        [OneTimeTearDown]
        public void Teardown()
        {
            var realm = Realm.GetInstance(config);
            realm.Write(() =>
            {
                realm.RemoveAll<UserTask>();
                realm.RemoveAll<UserProject>();
            });
        }
    }

    // :snippet-start: classes
    // :replace-start: {
    // "terms": {
    //   "UserTask": "Items",
    // "UserProject": "Project"}
    // }
    public partial class UserTask : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        public string Name { get; set; }
        public string Assignee { get; set; }
        public bool IsComplete { get; set; }
        public int Priority { get; set; }
        public int ProgressMinutes { get; set; }
    }

    public partial class UserProject : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; } = ObjectId.GenerateNewId();
        public string Name { get; set; }
        public IList<UserTask> Items { get; }
    }
    // :replace-end:
    // :snippet-end:

}
