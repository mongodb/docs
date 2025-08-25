using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examples.Models;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class Geospatial
    {
        App app;
        Realm realm;

        [OneTimeSetUp]
        public void Setup()
        {
            app = App.Create(Config.FSAppId);
            realm = Realm.GetInstance();
            // :snippet-start: geopoint
            realm.WriteAsync(() =>
            {
                realm.Add(new Company
                {
                    Location = new CustomGeoPoint(47.68, -122.35)
                });
                realm.Add(new Company
                {
                    Location = new CustomGeoPoint(47.9, -121.85)
                });
            });
            // :snippet-end:
        }

        [Test]
        public void TestGeospatials()
        {
            // :snippet-start: geocircle
            var circle1 = new GeoCircle((47.8, -122.6),
                Distance.FromKilometers(44.4));
            var circle2 = new GeoCircle(
                new GeoPoint(latitude: 47.3, longitude: -121.9),
                Distance.FromDegrees(0.25));
            // :snippet-end:

            // :snippet-start: geopolygon
            var basicPolygon = new GeoPolygon((48, -122.8),
                (48.2, -121.8), (47.6, -121.6), (47.0, -122.0),
                (47.2, -122.6), (48, -122.8));

            // Create a polygon with a single hole
            var outerRing = new GeoPoint[] {
                (48, -122.8), (48.2, -121.8),
                (47.6, -121.6), (47.0, -122.0), (47.2, -122.6),
                (48, -122.8) };

            var hole1 = new GeoPoint[] {
                (47.8, -122.6), (47.7, -122.2),
                (47.4, -122.6), (47.6, -122.5),
                (47.8, -122.6) };

            var polygonWithOneHole = new GeoPolygon(outerRing, hole1);

            // Add a second hole to the polygon
            var hole2 = new GeoPoint[] {
                (47.55, -122.05), (47.5, -121.9),(47.3, -122.1),
                (47.55, -122.05) };

            var polygonWithTwoHoles =
                new GeoPolygon(outerRing, hole1, hole2);
            // :snippet-end:

            // :snippet-start: geobox
            var box1 = new GeoBox(bottomLeftCorner: (47.3, -122.7),
                topRightCorner: (48.1, -122.1));

            var box2 = new GeoBox(new GeoPoint(47.5, -122.4),
               new GeoPoint(47.9, -121.8));
            // :snippet-end:

            // ***** QUERIES ***** //

            // :snippet-start: rql-geowithin
            var GeoWthinExample = realm.All<Company>()
                .Where(c => QueryMethods.GeoWithin(c.Location, circle1));

            var RQLExample = realm.All<Company>()
                .Filter("Location geoWithin $0", circle2);
            // :snippet-end:

            // :snippet-start: geopolygon-query
            var companiesInBasicPolygon = realm.All<Company>()
                .Where(c => QueryMethods
                   .GeoWithin(c.Location, basicPolygon));

            var companiesInPolygon = realm.All<Company>()
                .Where(c => QueryMethods
                   .GeoWithin(c.Location, polygonWithTwoHoles));
            //:snippet-end:

            // :snippet-start: geocircle-query
            var companiesInCircle = realm.All<Company>()
                .Where(c => QueryMethods.GeoWithin(c.Location, circle1));

            var companiesInSmallerCircle = realm.All<Company>()
                .Where(c => QueryMethods.GeoWithin(c.Location, circle2));
            // :snippet-end:

            // :snippet-start: geobox-query
            var companiesInBox1 = realm.All<Company>()
                .Where(c => QueryMethods.GeoWithin(c.Location, box1));

            var companiesInBox2 = realm.All<Company>()
                .Where(c => QueryMethods.GeoWithin(c.Location, box2));
            // :snippet-end:

            Assert.AreEqual(2, realm.All<Company>().Count());
            Assert.AreEqual(1, companiesInCircle.Count());
            Assert.AreEqual(0, companiesInSmallerCircle.Count());

            Assert.AreEqual(0, basicPolygon.Holes.Count);
            Assert.AreEqual(6, basicPolygon.OuterRing.Count);
            Assert.AreEqual(1, polygonWithOneHole.Holes.Count);
            Assert.AreEqual(2, polygonWithTwoHoles.Holes.Count);

            Assert.AreEqual(2, companiesInBasicPolygon.Count());
            Assert.AreEqual(1, companiesInPolygon.Count());

            Assert.AreEqual(1, companiesInBox1.Count());
            Assert.AreEqual(2, companiesInBox2.Count());
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            realm.Write(() => { realm.RemoveAll<Company>(); });
            return;
        }
    }

    //:snippet-start:usingcustomgeopoint
    public partial class Company : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public Guid Id { get; private set; } = Guid.NewGuid();

        public CustomGeoPoint? Location { get; set; }

        public Company() { }
    }
    //:snippet-end:
}
