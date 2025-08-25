using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Examples.Models;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Exceptions;
using Realms.Sync;
using static Examples.WorkWithRealm;
using User = Examples.Models.User;

namespace Examples
{
    public class QuickStartExamples
    {
        ObjectId testItemId;
        Realms.Sync.User user;
        PartitionSyncConfiguration config;
        App app;
        const string myRealmAppId = Config.AppId;

        [OneTimeSetUp]
        public async Task Setup()
        {
            // :snippet-start: initialize-realm
            app = App.Create(myRealmAppId);
            // :snippet-end:

            user = await app.LogInAsync(Config.EPCreds);
            config = new PartitionSyncConfiguration("myPart", user);
            config.Schema = new[]
            {
                typeof(Item),
                typeof(User),
                typeof(Person),
                typeof(PersonN),
                typeof(Dog)
            };

            Realm realm = Realm.GetInstance(config);

            await realm.WriteAsync(() =>
            {
                realm.Add<Item>(new Item() { Name = "Fydaeu", Assignee = String.Empty });
            });
        }


        [Test]
        public async Task WriteAndUpdate()
        {
            Realm realm = Realm.GetInstance(config);
            // :snippet-start: create
            var testItem = new Item
            {
                Name = "Do this thing",
                Status = ItemStatus.Open.ToString(),
                Assignee = "Aimee"
            };

            await realm.WriteAsync(() =>
            {
                realm.Add(testItem);
            });

            // Or 

            var testItem2 =
                await realm.WriteAsync(() =>
                {
                    return realm.Add<Item>(new Item
                    {
                        Name = "Do this thing, too",
                        Status = ItemStatus.InProgress.ToString(),
                        Assignee = "Satya"
                    });
                }
            );

            // :snippet-end:
            testItemId = testItem.Id;

            //:snippet-start:read-all
            var allItems = realm.All<Item>();
            // :snippet-end:

            //:snippet-start:read-open-items
            var openItems = realm.All<Item>()
                .Where(i => i.Status == "Open");
            // :snippet-end:

            //:snippet-start:sort-items
            var sortedItems = realm.All<Item>()
                .OrderBy(i => i.Status);
            // :snippet-end:


            // :snippet-start: upsert
            var id = ObjectId.GenerateNewId();

            var item1 = new Item
            {
                Id = id,
                Name = "Defibrillate the Master Oscillator",
                Assignee = "Aimee"
            };

            // Add a new person to the realm. Since nobody with the existing Id
            // has been added yet, this person is added.
            await realm.WriteAsync(() =>
            {
                realm.Add(item1, update: true);
            });

            var item2 = new Item
            {
                Id = id,
                Name = "Fluxify the Turbo Encabulator",
                Assignee = "Aimee"
            };

            // Based on the unique Id field, we have an existing person,
            // but with a different name. When `update` is true, you overwrite
            // the original entry.
            await realm.WriteAsync(() =>
            {
                realm.Add(item2, update: true);
            });
            // item1 now has a Name of "Fluxify the Turbo Encabulator"
            // and item2 was not added as a new Item in the collection.
            // :snippet-end:

            var someItems = realm.All<Item>();

            Assert.IsTrue(item1.Name == "Fluxify the Turbo Encabulator");

            var myid = ObjectId.GenerateNewId();
            // :snippet-start: modify-collection
            // :replace-start: {
            //  "terms": {
            //   "myid" : "id",
            //   "PersonN": "Person"}
            // }
            realm.Write(() =>
            {
                // Create someone to take care of some dogs.
                var ali = new PersonN { Id = myid, Name = "Ali" };
                realm.Add(ali);
                // Find dogs younger than 2.
                var puppies = realm.All<Dog>().Where(dog => dog.Age < 2);
                // Loop through one by one to update.
                foreach (var puppy in puppies)
                {
                    // Add Ali to the list of Owners for each puppy
                    puppy.Owners.Add(ali);
                }
            });
            // :replace-end:
            // :snippet-end:
            var puppies = realm.All<Dog>().Where(dog => dog.Age < 2);
            var ali = realm.All<PersonN>().Where(p => p.Id == myid).FirstOrDefault();
            if (ali != null)
            {
                foreach (var puppy in puppies)
                {
                    Assert.IsTrue(puppy.Owners.Contains(ali));
                }
            }
        }

        [Test]
        public async Task GetsSyncedTasks()
        {
            App app = App.Create(myRealmAppId);
            // :snippet-start: anon-login
            var user = await app.LogInAsync(Credentials.Anonymous());
            // :snippet-end:

            return;
        }

        // [Test]
        public async Task ModifiesATask()
        {
            // App app = App.Create(myRealmAppId);
            config = new PartitionSyncConfiguration("myPart", user);
            //:remove-start:
            config.Schema = new[]
            {
                typeof(Item),
                typeof(User)
            };
            //:remove-end:
            var realm = await Realm.GetInstanceAsync(config);

            var i = realm.All<Item>()
                .FirstOrDefault(i => i.Id == testItemId);

            realm.Write(() =>
            {
                i.Status = ItemStatus.InProgress.ToString();
            });


            var ttest = realm.All<Item>().FirstOrDefault(x => x.Id == i.Id);
            Assert.AreEqual(ItemStatus.InProgress.ToString(), ttest.Status);

            return;
        }



        [OneTimeTearDown]
        public async Task TearDown()
        {
            App app = App.Create(myRealmAppId);
            using (var realm = Realm.GetInstance(config))
            {
                var myItem = new Item() { Name = "foo2", Status = ItemStatus.Complete.ToString(), Assignee = String.Empty };
                realm.Write(() =>
                {
                    realm.Add(myItem);
                });

                //:snippet-start:delete-one-item
                realm.Write(() =>
                {
                    realm.Remove(myItem);
                });

                realm.Write(() =>
                {
                    realm.RemoveAll<Item>();
                });

                //:snippet-end:
                var user = await app.LogInAsync(Credentials.Anonymous());
                // :snippet-start: logout
                await user.LogOutAsync();
                // :snippet-end:
            }
            return;
        }
    }

}