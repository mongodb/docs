using System;
using System.Linq;
using System.Xml.Linq;
using Examples.Models;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using Realms.Sync.ErrorHandling;

namespace Examples
{
    public partial class Asymmetrics
    {
        App app;
        Realms.Sync.User user;
        Realm realm;
        const string myRealmAppId = Config.FSAppId;

        [OneTimeSetUp]
        public void Setup()
        {
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(
                Credentials.Anonymous()).Result;

            var config = new FlexibleSyncConfiguration(user)
            {
                Schema = new[] { typeof(Measurement) }
            };


            realm = Realm.GetInstance(config);

            // You cannot add a subscription for an AsymmetricObject
            // This causes a compile-time error:
            // :uncomment-start:
            //realm.Subscriptions.Update(() =>
            //{
            //    realm.Subscriptions.Add(realm.All<Measurement>());
            //});
            // :uncomment-end:
        }

        // :snippet-start: asymmetry
        // :remove-start:
        [Realms.Explicit]
        // :remove-end:
        private partial class Measurement : IAsymmetricObject
        {
            [PrimaryKey, MapTo("_id")]
            public Guid Id { get; private set; } = Guid.NewGuid();
            public double Value { get; set; }
            public DateTimeOffset Timestamp { get; private set; } = DateTimeOffset.UtcNow;
        }

        // :remove-start:
        [Test]
        // :remove-end:
        public void SendMeasurementToRealm()
        {
            var measurement = new Measurement
            {
                Value = 9.876
            };

            realm.Write(() =>
            {
                realm.Add(measurement);
            });

            // The following line will cause a compile time error
            // _ = realm.All<Measurement>();
            // The following line will compile but throw a
            // Realms.Exceptions.RealmInvalidObjectException at runtime
            // _ = measurement.Value;
        }
        // :snippet-end:
    }
}
