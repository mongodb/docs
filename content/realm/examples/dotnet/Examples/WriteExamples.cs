using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class Writes
    {
        Realm realm;
        public Writes()
        {
            realm = Realm.GetInstance();
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            realm.Write(() =>
            {
                realm.RemoveAll<WriteDog>();
                realm.RemoveAll<WritePerson>();
            });
        }

        [Test]
        public void Snippets()
        {

            realm.Write(() =>
            {
                // Create someone to take care of some dogs.
                var ali = new WritePerson { Id = 44, Name = "Ali" };
                realm.Add(ali);

                // Find dogs younger than 2.
                var puppies = realm.All<WriteDog>().Where(dog => dog.Age < 2);

                // Loop through one by one to update.
                foreach (var puppy in puppies)
                {
                    // Give all the puppies to Ali.
                    puppy.Owner = ali;
                }
            });

            var myDog = new WriteDog { Id = 411, Name = "Gracie", Age = 7 };
            // :snippet-start: create-long-hand
            // :replace-start: {
            //  "terms": {
            //   "WritePerson": "Person",
            //   "WriteDog" : "Dog" }
            // }
            // Open a thread-safe transaction.
            using (var transaction = realm.BeginWrite())
            {
                // At this point, the TransactionState is "Running":
                // transaction.State == TransactionState.Running
                try
                {
                    // Perform a write op...
                    realm.Add(myDog);
                    // Do other work that needs to be included in
                    // this transaction
                    if (transaction.State == TransactionState.Running)
                    {
                        transaction.Commit();
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    // Something went wrong; roll back the transaction
                    if (transaction.State != TransactionState.RolledBack &&
                        transaction.State != TransactionState.Committed)
                    {
                        transaction.Rollback();
                    }
                }
            }
            // :replace-end:
            // :snippet-end:

            // :snippet-start: create
            // :replace-start: {
            //  "terms": {
            //   "WritePerson": "Person",
            //   "WriteDog" : "Dog" }
            // }
            // Instantiate a class, as normal.
            var dog = new WriteDog { Id = 42, Name = "Max", Age = 5 };
            // Open a thread-safe transaction.
            realm.Write(() =>
            {
                // Add the instance to the realm.
                realm.Add(dog);
            });
            // :replace-end:
            // :snippet-end:

            realm.Write(() =>
            {
                var drew = new WritePerson { Id = 1234, Name = "Drew" };
                // Add a new person to the realm. Since nobody with ID 1234
                // has been added yet, this adds the instance to the realm.
                realm.Add(drew, update: true);

                var andy = new WritePerson { Id = 1234, Name = "Andy" };
                // Judging by the ID, it's the same person, just with a different name.
                // When `update` is true, you overwrite the original entry (i.e. Drew -> Andy).
                realm.Add(andy, update: true);
            });


            // :snippet-start: modify
            // :replace-start: {
            //  "terms": {
            //   "dog2": "dog",
            //   "WriteDog" : "Dog" }
            // }
            var dog2 = realm.All<WriteDog>().First();
            realm.WriteAsync(() =>
            {
                dog2.Name = "Wolfie";
                dog2.Age += 1;
            });
            // :replace-end:
            // :snippet-end:


            realm.Write(() =>
            {
                // Create someone to take care of some dogs.
                var ali = new WritePerson { Id = 1, Name = "Ali" };
                realm.Add(ali);

                // Find dogs younger than 2.
                var puppies = realm.All<WriteDog>().Where(dog => dog.Age < 2);

                // Loop through one by one to update.
                foreach (var puppy in puppies)
                {
                    // Give all the puppies to Ali.
                    puppy.Owner = ali;
                }
            });

            var foodog = new WriteDog { Id = 123, Name = "FiFi" };
            realm.Write(() =>
            {
                realm.Add(foodog);
            });

            realm.Write(() =>
            {
                // Remove the instance from the realm.
                realm.Remove(foodog);

                // Discard the reference.
                foodog = null;
            });

            realm.Write(() =>
            {
                // Find dogs younger than 2 years old.
                var puppies = realm.All<WriteDog>().Where(dog => dog.Age < 2);

                // Remove the collection from the realm.
                realm.RemoveRange(puppies);
            });

            var ali = new WritePerson();
            realm.Write(() =>
            {
                realm.Add(ali);
            });

            realm.Write(() =>
        {
            // Remove all of Ali's dogs.
            realm.RemoveRange<WriteDog>(ali.Dogs);

            // Remove Ali.
            realm.Remove(ali);
        });

            realm.Write(() =>
            {
                // Remove all instances of Dog from the realm.
                realm.RemoveAll<WriteDog>();
            });

            realm.Write(() =>
            {
                // Remove all objects from the realm.
                realm.RemoveAll();
            });
        }
    }

    public class WriteDog : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public int Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }
        public string Breed { get; set; }
        public WritePerson? Owner { get; set; } = null!;
    }

    public class WritePerson : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public int Id { get; set; }

        public string Name { get; set; }

        [Backlink("Owner")]
        public IQueryable<WriteDog> Dogs { get; }
    }
}