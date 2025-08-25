using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examples.Models;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;

namespace Examples
{
    public class DataTypes
    {
        Realm realm;

        [OneTimeSetUp]
        public void Init()
        {
            var config = new InMemoryConfiguration("in_memory");
            realm = Realm.GetInstance(config);
        }

        [Test]
        public void Increment()
        {
            var mrc = new MyRealmClass()
            {
                Counter = 0
            };

            realm.Write(() =>
            {
                realm.Add(mrc);
            });

            var id = mrc._id;
            //:snippet-start:realmint-use
            var myObject = realm.Find<MyRealmClass>(id);
            // myObject.Counter == 0

            realm.Write(() =>
            {
                // Increment the value of the RealmInteger
                myObject.Counter.Increment(); // 1
                myObject.Counter.Increment(5); // 6

                //:remove-start:
                Assert.AreEqual(6, myObject.Counter);
                //:remove-end:
                // Decrement the value of the RealmInteger
                // Note the use of Increment with a negative number
                myObject.Counter.Decrement(); // 5
                //:remove-start:
                Assert.AreEqual(5, myObject.Counter);
                //:remove-end:
                myObject.Counter.Increment(-3); // 2
                //:remove-start:
                Assert.AreEqual(2, myObject.Counter);
                //:remove-end:

                // Reset the RealmInteger
                myObject.Counter = 0;

                // RealmInteger<T> is implicitly convertable to T:
                int bar = myObject.Counter;
            });
            //:snippet-end:
            Assert.AreEqual(0, myObject.Counter);
        }

        [Test]
        public async Task WorkWithDictionaries()
        {
            if (realm == null) realm = await Realm.GetInstanceAsync();
            //:snippet-start:query-dictionaries
            var storeInventory = new Inventory()
            {
                Id = ObjectId.GenerateNewId().ToString()
            };

            storeInventory.Plants.Add("Petunia", new Plant());
            storeInventory.NullableIntDictionary.Add("random things", 7);
            storeInventory.RequiredStringsDictionary.Add("foo", "bar");

            var storeInventory2 = new Inventory()
            {
                Id = ObjectId.GenerateNewId().ToString()
            };

            storeInventory2.RequiredStringsDictionary.Add("foo", "Bar");

            realm.Write(() =>
            {
                realm.Add(storeInventory);
                realm.Add(storeInventory2);
            });

            // Find all Inventory items that have "Petunia"
            // as a key in their Plants dictionary.
            var petunias = realm.All<Inventory>()
                .Filter("Plants.@keys == 'Petunia'");

            // Find all Inventory items that have at least one value in their
            // IntDictionary that is larger than 5 using RQL
            var matchesMoreThanFive = realm.All<Inventory>()
                .Filter("NullableIntDictionary.@values > 5");

            // Find all Inventory items where the RequiredStringsDictionary has a key
            // "Foo", and the value of that key contains the phrase "bar"
            // (case insensitive)
            var matches = realm.All<Inventory>()
                .Filter("RequiredStringsDictionary['foo'] CONTAINS[c] 'bar'");
            // matches.Count() == 2

            // Query the Plants dictionary of an Inventory object
            // for a specific plant
            var myStoreInventory = realm
                .All<Inventory>().FirstOrDefault();

            var petunia = myStoreInventory.Plants.AsRealmQueryable()
                .Where(p => p.Name == "Petunia");
            //:snippet-end:

            Assert.IsNotNull(petunias);
            Assert.IsNotNull(petunia);
            Assert.IsNotNull(matchesMoreThanFive);
            Assert.AreEqual(2, matches.Count());
        }

        // [Test]
        public async Task WorkWithSets()
        {
            if (realm == null) realm = await Realm.GetInstanceAsync();

            //:snippet-start:query-sets
            //:replace-start: {
            //  "terms": {
            //   "PlantInventory": "Inventory"}
            // }
            var inventory = new PlantInventory();
            inventory.PlantSet.Add(new Plant() { Name = "Prickly Pear" });
            inventory.DoubleSet.Add(123.45);

            realm.Write(() =>
            {
                realm.Add<PlantInventory>(inventory);
            });

            // convert the Plant Set to an IQueryable and apply a filter
            var pricklyPear = inventory.PlantSet.AsRealmQueryable()
                .Where(p => p.Name == "Prickly Pear");
            // Alternatively, apply a filter directly on the Plant Set
            var pricklyPearPlants = inventory.PlantSet
                .Filter("Name == 'Prickly Pear'");

            // Find all Inventory items that have at least one value in their
            // DoubleSet that is larger than 5
            var moreThan100 = realm.All<PlantInventory>()
                .Filter("DoubleSet.@values > 100");
            // :replace-end:
            //:snippet-end:

            Assert.IsNotNull(pricklyPear);
            Assert.IsNotNull(pricklyPearPlants);
            Assert.IsNotNull(moreThan100);
        }

        [Test]
        public async Task WorkWithLists()
        {
            if (realm == null) realm = await Realm.GetInstanceAsync();
            var listInventory = new ListInventory()
            {
                Id = ObjectId.GenerateNewId().ToString()
            };

            listInventory.Plants.Add(new Plant() { Name = "Prickly Pear", Color = PlantColor.Green.ToString() });
            realm.Write(() =>
            {
                realm.Add<ListInventory>(listInventory);
            });

            //:snippet-start:query-lists
            //:replace-start: {
            //  "terms": {
            //   "ListInventory": "Inventory"}
            // }
            var plants = realm.All<Plant>();

            // Use the Where operator to find items
            // in the results collection
            var pricklyPear = plants
                .Where(plant => plant.Name == "Prickly Pear");

            // Or apply a filter to the results collection
            var pricklyPears = plants
                .Filter("Name == 'Prickly Pear'");

            // You can query collection properties in the same way
            var morePlants = realm.All<ListInventory>().ElementAt(0).Plants;

            // Convert the Ilist<Plant> to an IQueryable and
            // use the Where operator
            var pricklyPearCacti = morePlants.AsQueryable()
                .Where(plant => plant.Name == "Prickly Pear");

            // Or apply a filter to the collection
            var greenPlants = realm.All<ListInventory>()
                .Filter("Plants.Color CONTAINS[c] 'Green'");
            // :replace-end:
            // :snippet-end:

            Assert.IsNotNull(pricklyPearCacti);
            Assert.AreEqual(1, greenPlants.Count());
        }

        [Test]
        public void RealmValueTests()
        {
            //:snippet-start:realmValues
            // CS0029 - Cannot implicitly convert type:
            // :uncomment-start:
            // RealmValue myList = new List<Inventory>();
            // :uncomment-end:

            // These are valid uses of RealmValue:
            var rvList = new List<RealmValue>();
            var rvDict = new Dictionary<string, RealmValue>();
            //:snippet-end:
        }

        [TearDown]
        public void TearDown()
        {
            realm.Write(() =>
            {
                realm.RemoveAll<Inventory>();
                realm.RemoveAll<PlantInventory>();
                realm.RemoveAll<ListInventory>();
            });

        }
    }

    //:snippet-start:sets
    //:replace-start: {
    //  "terms": {
    //   "PlantInventory": "Inventory"}
    // }
    public partial class PlantInventory : IRealmObject
    {
        //:remove-start:
        [PrimaryKey]
        [MapTo("_id")]
        public string Id { get; set; } = MongoDB.Bson.ObjectId.GenerateNewId().ToString();
        //:remove-end:
        // A Set can contain any Realm-supported type, including
        // objects that inherit from RealmObject
        public ISet<Plant> PlantSet { get; }

        public ISet<double> DoubleSet { get; }

        // Nullable types are supported in local-only
        // Realms, but not with Sync
        public ISet<int?> NullableIntsSet { get; }

        public ISet<string> RequiredStrings { get; }
    }
    // :replace-end:
    //:snippet-end:

    //:snippet-start:dictionaries

    public partial class Inventory : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public string Id { get; set; }
        // The key must be of type string; the value can be
        // of any Realm-supported type, including objects
        // that inherit from RealmObject or EmbeddedObject
        public IDictionary<string, Plant?> Plants { get; }

        public IDictionary<string, bool> BooleansDictionary { get; }

        // Nullable types are supported in local-only
        // Realms, but not with Sync
        public IDictionary<string, int?> NullableIntDictionary { get; }

        public IDictionary<string, string> RequiredStringsDictionary { get; }
    }
    //:snippet-end:

    public partial class ListInventory : IRealmObject
    {
        //:remove-start:
        [PrimaryKey]
        [MapTo("_id")]
        public string Id { get; set; }
        //:remove-end:
        public IList<Plant> Plants { get; }
    }


    //:snippet-start:realmvalue
    public partial class MyRealmValueObject : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public Guid Id { get; set; }

        public RealmValue MyValue { get; set; }

        // A nullable RealmValue property is *not supported*
        // public RealmValue? NullableRealmValueNotAllowed { get; set; }

        private void TestRealmValue()
        {
            var obj = new MyRealmValueObject();

            // set the value to null:
            obj.MyValue = RealmValue.Null;

            // or an int...
            obj.MyValue = 1;

            // or a string...
            obj.MyValue = "abc";

            // Use RealmValueType to check the type:
            if (obj.MyValue.Type == RealmValueType.String)
            {
                var myString = obj.MyValue.AsString();
            }
        }
        //:snippet-end:
    }

    // :snippet-start:realmint-class
    public partial class MyRealmClass : IRealmObject
    {
        [PrimaryKey]
        public int _id { get; set; }
        public RealmInteger<int> Counter { get; set; }
    }
    // :snippet-end:
}
