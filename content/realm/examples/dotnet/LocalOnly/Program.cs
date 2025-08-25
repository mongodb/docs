using System;
using System.Linq;
using MongoDB.Bson;
using Realms;

namespace LocalOnly
{
    class Program
    {
        static ObjectId someGuitarId = ObjectId.Empty;

        static void Main(string[] args)
        {
            //:snippet-start:get-instance
            var realm = Realm.GetInstance();
            //:snippet-end:

            var allGuitars = realm.All<Guitar>();

            realm.Write(() =>
            {
                realm.Add(new Guitar()
                {
                    Make = "Gibson",
                    Model = "Les Paul Custom",
                    Price = 649.99,
                    Owner = "N. Young"
                });
            });
            var lessExpensiveGuitars = realm.All<Guitar>().Where(g => g.Price < 400);

            var guitarsSortedByMake = realm.All<Guitar>().OrderBy(g => g.Make);

            var specifiGuitarById = realm.Find<Guitar>(someGuitarId);

            var davidsStrat = realm.All<Guitar>().FirstOrDefault(
                g => g.Owner == "D. Gilmour"
                && g.Make == "Fender"
                && g.Model == "Stratocaster");

            realm.Write(() =>
            {
                davidsStrat!.Price = 1700345.56;
            });

            var mostExpensiveGuitar = realm.All<Guitar>()
                .OrderByDescending(g => g.Price).First();

            realm.Write(() =>
            {
                realm.Remove(mostExpensiveGuitar);
            });

            // Watch for Guitar collection changes.
            var token = realm.All<Guitar>()
                .SubscribeForNotifications((sender, changes) =>
                {
                    foreach (var i in changes!.DeletedIndices)
                    {
                        // ... handle deletions ...
                    }

                    foreach (var i in changes!.InsertedIndices)
                    {
                        // ... handle insertions ...
                    }

                    foreach (var i in changes!.NewModifiedIndices)
                    {
                        // ... handle modifications ...
                    }
                });

            // Later, when you no longer wish to receive notifications
            token.Dispose();
        }

        public void DeleteAndStartAgain()
        {
            //:snippet-start:delete-realm-file
            var config = new RealmConfiguration("FileWeThrowAway.realm");
            Realm.DeleteRealm(config);
            var freshRealm = Realm.GetInstance(config);
            //:snippet-end:
        }
    }
}