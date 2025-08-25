using System;
using System.IO;
using System.Linq;
using MongoDB.Bson;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Collections.Generic;
using Examples.Models;
using System.Reflection;
using System.Threading.Channels;

namespace Examples
{
    public class WorkWithRealm
    {
        App app;
        Realms.Sync.User user;
        string myRealmAppId = Config.AppId;

        [OneTimeSetUp]
        public async System.Threading.Tasks.Task Setup()
        {
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };

            app = App.Create(appConfig);

            // :snippet-start: observe-auth-change
            app.CurrentUser.Changed += (change, _) =>
            {
                Debug.WriteLine($"Auth change: {change}, {_}");
                // :remove-start:
                Assert.IsInstanceOf<System.EventArgs>(_);
                // :remove-end:
            };
            // :snippet-end:

            user = await app.LogInAsync(Config.EPCreds);
            return;
        }

        public async System.Threading.Tasks.Task LotsaStuff()
        {
            string userEmail = "bob@example.com";

            // :snippet-start: initialize-realm
            var myRealmAppId = "<your_app_id>";
            var app = App.Create(myRealmAppId);
            //:snippet-end:
            // :snippet-start: appConfig
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };

            app = App.Create(appConfig);
            //:snippet-end:
            // :snippet-start: register-user
            await app.EmailPasswordAuth.RegisterUserAsync(userEmail, "sekrit");
            //:snippet-end:
            // :snippet-start: confirm-user
            await app.EmailPasswordAuth.ConfirmUserAsync("<token>", "<token-id>");
            //:snippet-end:
            // :snippet-start: reset-user-1
            await app.EmailPasswordAuth.SendResetPasswordEmailAsync(userEmail);
            //:snippet-end:
            string myNewPassword = "";
            // :snippet-start: reset-user-2
            await app.EmailPasswordAuth.ResetPasswordAsync(
                myNewPassword, "<token>", "<token-id>");
            //:snippet-end:
            // :snippet-start: reset-user-3
            await app.EmailPasswordAuth.CallResetPasswordFunctionAsync(
                userEmail, myNewPassword,
                "<security-question-1-answer>",
                "<security-question-2-answer>");
            //:snippet-end:
            // :snippet-start: reset-password-function-pending
            await app.EmailPasswordAuth.CallResetPasswordFunctionAsync(
                userEmail, myNewPassword);
            //:snippet-end:
            // :snippet-start: resend-confirmation
            await app.EmailPasswordAuth.ResendConfirmationEmailAsync("<userEmail>");
            // :snippet-end:
            // :snippet-start: retry-custom-confirmation
            await app.EmailPasswordAuth.RetryCustomConfirmationAsync("<userEmail>");
            // :snippet-end:

            user = await app.LogInAsync(Config.EPCreds);

            // :snippet-start: delete-user
            await app.DeleteUserFromServerAsync(user);
            //:snippet-end:

        }


        public async System.Threading.Tasks.Task APIKeys()
        {
            {
                //:snippet-start:apikey-create
                var newKey = await user.ApiKeys.CreateAsync("someKeyName");
                Console.WriteLine($"I created a key named {newKey.Name}. " +
                    $"Is it enabled? {newKey.IsEnabled}");
                //:snippet-end:
            }
            {
                //:snippet-start:apikey-fetch
                var key = await user.ApiKeys.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
                Console.WriteLine($"I fetched the key named {key.Name}. " +
                    $"Is it enabled? {key.IsEnabled}");
                //:snippet-end:
            }
            {
                //:snippet-start:apikey-fetch-all
                var allKeys = await user.ApiKeys.FetchAllAsync();
                foreach (var key in allKeys)
                {
                    Console.WriteLine($"I fetched the key named {key.Name}. " +
                        $"Is it enabled? {key.IsEnabled}");
                }
                //:snippet-end:
            }
            {
                //:snippet-start:apikey-enable-disable
                var key = await user.ApiKeys.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
                if (!key.IsEnabled)
                {
                    // enable the key
                    await user.ApiKeys.EnableAsync(key.Id);
                }
                else
                {
                    // disable the key
                    await user.ApiKeys.DisableAsync(key.Id);
                }
                //:snippet-end:
            }
            {
                //:snippet-start:apikey-delete
                await user.ApiKeys.DeleteAsync(ObjectId.Parse("00112233445566778899aabb"));
                //:snippet-end:
            }
        }


        [Test]
        public void Notifications()
        {
            myRealmAppId = Config.AppId;
            var app = App.Create(myRealmAppId);
            var realm = Realm.GetInstance("");

            // :snippet-start:notifications
            // Observe realm notifications.
            realm.RealmChanged += (sender, eventArgs) =>
            {
                // The "sender" object is the realm that has changed.
                // "eventArgs" is reserved for future use.
                // ... update UI ...
            };
            //:snippet-end:

            //:snippet-start:collection-notifications
            // Watch for collection notifications.
            var subscriptionToken = realm.All<Dog>()
                .SubscribeForNotifications((sender, changes) =>
            {
                if (changes == null)
                {
                    // This is the case when the notification is called
                    // for the first time.
                    // Populate tableview/listview with all the items
                    // from `collection`
                    return;
                }

                // Handle individual changes
                foreach (var i in changes.DeletedIndices)
                {
                    // ... handle deletions ...
                }

                foreach (var i in changes.InsertedIndices)
                {
                    // ... handle insertions ...
                }

                foreach (var i in changes.NewModifiedIndices)
                {
                    // ... handle modifications ...
                }

                if (changes.IsCleared)
                {
                    // A special case if the collection has been cleared:
                    // i.e., all items have been deleted by calling
                    // the Clear() method.
                }
            });
            //:snippet-end:

            NotificationCallbackDelegate<Person> notificationCallback 
            = new NotificationCallbackDelegate<Person>((sender,changes) => {});
            //:snippet-start:field-notifications
            var query = realm.All<Person>();
            KeyPathsCollection kpc;

            // Use one of these equivalent declarations to 
            // specify the fields you want to monitor for changes:

            kpc = KeyPathsCollection.Of("Email", "Name");
            kpc = new List<KeyPath> {"Email", "Name"};
            
            // To get all notifications for top-level properties
            // and 4 nested levels of properties, use the `Full` 
            // static value:

            kpc = KeyPathsCollection.Full;

            // To receive notifications for changes to the
            // collection only and none of the properties,
            // use the `Shallow` static value:
            
            kpc = KeyPathsCollection.Shallow;

            query.SubscribeForNotifications(notificationCallback, kpc);
            //:snippet-end:

            //:snippet-start:unsub-collection-notifications
            // Watch for collection notifications.
            // Call Dispose() when you are done observing the
            // collection.
            var token = realm.All<Dog>()
                .SubscribeForNotifications((sender, changes) =>
                {
                    // etc.
                });
            // When you no longer want to receive notifications:
            token.Dispose();
            //:snippet-end:

            var dog = realm.All<Dog>()
            .FirstOrDefault(p => p.Name == "Laura V.");

            realm.Write(() =>
            {
                realm.Add(new PersonN { Id = ObjectId.GenerateNewId(), Name = "Elvis Presley" });
            });
            //:snippet-start:object-notifications
            // :replace-start: {
            //  "terms": {
            //   "PersonN": "Person" }
            // }
            var artist = realm.All<PersonN>()
                .FirstOrDefault(p => p.Name == "Elvis Presley");

            artist.PropertyChanged += (sender, eventArgs) =>
            {
                var changedProperty = eventArgs.PropertyName!;

                Debug.WriteLine(
                    $@"New value set for 'artist':
                    '{changedProperty}' is now {artist.GetType()
                    .GetProperty(changedProperty).GetValue(artist)}");
            };

            realm.Write(() =>
            {
                artist.Name = "Elvis Costello";
            });

            realm.Refresh();
        }
        // :replace-end:
        //:snippet-end:

        [Test]
        public void ChangeSetCleared()
        {
            var config = new RealmConfiguration("");

            myRealmAppId = Config.AppId;
            var app = App.Create(myRealmAppId);
            var realm = Realm.GetInstance("");

            realm.Write(() =>
            {
                realm.RemoveAll<Dog>();
            });

            var fido = new Dog()
            {
                Id = ObjectId.GenerateNewId(),
                Name = "Fido"
            };

            realm.Write(() =>
            {
                fido = realm.Add<Dog>(fido);
            });

            var johnWick = new PersonN() { Id = ObjectId.GenerateNewId(), Name = "John Wick" };
            var helenWick = new PersonN() { Id = ObjectId.GenerateNewId(), Name = "Helen Wick" };

            realm.Write(() =>
            {
                fido.Owners.Add(johnWick);
                fido.Owners.Add(helenWick);
            });

            var token2 = fido.Owners.SubscribeForNotifications((sender, changes) =>
            {
                if (changes == null) return;
            });
            token2.Dispose();
        }
        private void CollectionChanged()
        // :snippet-start: call-handle-collection-changed
        {
            //:remove-start:
            var realm = Realm.GetInstance("");
            var gracie = new Dog();
            // :remove-end:
            // Subscribe to a query
            realm.All<Dog>().AsRealmCollection().CollectionChanged +=
                HandleCollectionChanged;

            // Subscribe to a property collection
            gracie.Owners.AsRealmCollection().CollectionChanged +=
                HandleCollectionChanged;
            //:remove-start:
        }
        //:remove-end:
        // :uncomment-start:
        //    ...
        //}
        //
        // :uncomment-end:
        private void HandleCollectionChanged(object? sender,
            NotifyCollectionChangedEventArgs e)
        {
            // Use e.Action to get the
            // NotifyCollectionChangedAction type.
            if (e.Action == NotifyCollectionChangedAction.Add)
            {
                // etc.
            }
        }
        // :snippet-end:


        class NotificationUnsub
        {
            Realm realm;

            public NotificationUnsub()
            {
                realm = Realm.GetInstance("");
            }
            private IQueryable<Item> items = null!;
            private void foo()
            {
                //:snippet-start:unsubscribe
                // Unsubscribe from notifications on a
                // realm listener
                realm.RealmChanged -= OnRealmChanged;

                // Unsubscribe from notifications on a
                // collection of realm objects
                realm.All<Item>().AsRealmCollection()
                    .CollectionChanged -= OnItemsChangedHandler;

                // Unsubscribe from notifications on a
                // collection property
                items.AsRealmCollection().CollectionChanged -= OnItemsChangedHandler;
                // :snippet-end:
            }

            private void OnRealmChanged(object sender, EventArgs e)
            {
                throw new NotImplementedException();
            }

            private void OnItemsChangedHandler(object? sender, NotifyCollectionChangedEventArgs e)
            {
                throw new NotImplementedException();
            }
        }

        public class PersonN : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; }

            public string Name { get; set; }
        }

        // used only in this class
        public class Dog : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

            public string Name { get; set; }

            public int Age { get; set; }
            public string Breed { get; set; }
            public IList<PersonN> Owners { get; }
        }
    }
}