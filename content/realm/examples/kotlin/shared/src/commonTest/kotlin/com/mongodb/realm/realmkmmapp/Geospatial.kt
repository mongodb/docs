package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.annotations.ExperimentalGeoSpatialApi
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.types.EmbeddedRealmObject
import io.realm.kotlin.types.RealmList
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.Ignore
import io.realm.kotlin.types.annotations.PrimaryKey
import io.realm.kotlin.types.geo.*
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals


class Geospatial : RealmTest() {

    // :snippet-start: geopoint-model
    class Company : RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId()
        var location: CustomGeoPoint? = null
    }
    // :snippet-end:

    // :snippet-start: custom-geopoint
    class CustomGeoPoint : EmbeddedRealmObject {
        constructor(latitude: Double, longitude: Double) {
            coordinates.apply {
                add(longitude)
                add(latitude)
            }
        }
        // Empty constructor required by Realm
        constructor() : this(0.0, 0.0)

        // Name and type required by Realm
        var coordinates: RealmList<Double> = realmListOf()

        // Name, type, and value required by Realm
        private var type: String = "Point"

        @Ignore
        var latitude: Double
            get() = coordinates[1]
            set(value) {
                coordinates[1] = value
            }

        @Ignore
        var longitude: Double
            get() = coordinates[0]
            set(value) {
                coordinates[0] = value
            }
    }
    // :snippet-end:

    @OptIn(ExperimentalGeoSpatialApi::class)
    @Test
    fun geospatialTest() {
        val REALM_NAME = getRandom()
        runBlocking {
            val config = RealmConfiguration.Builder(schema = setOf(Company::class, CustomGeoPoint::class))
                .directory(TMP_PATH)
                .name(REALM_NAME)
                .build()
            val realm = Realm.open(config)

            // :snippet-start: create-geopoint
            realm.writeBlocking {
                copyToRealm(
                    Company().apply {
                        location = CustomGeoPoint(47.68, -122.35)
                    }
                )
                copyToRealm(
                    Company().apply {
                        location = CustomGeoPoint(47.9, -121.85)
                    }
                )
            }
            // :snippet-end:
            // :snippet-start: geocircle
            val circle1 = GeoCircle.create(
                center = GeoPoint.create(47.8, -122.6),
                radius = Distance.fromKilometers(44.4)
            )
            val circle2 = GeoCircle.create(
                center = GeoPoint.create(47.3, -121.9),
                radius = Distance.fromDegrees(0.25)
            )
            // :snippet-end:
            // :snippet-start: geobox
            val box1 = GeoBox.create(
                bottomLeft = GeoPoint.create(47.3, -122.7),
                topRight = GeoPoint.create(48.1, -122.1)
            )
            val box2 = GeoBox.create(
                bottomLeft = GeoPoint.create(47.5, -122.4),
                topRight = GeoPoint.create(47.9, -121.8)
            )
            // :snippet-end:

            // :snippet-start: geopolygon
            // Create a basic polygon
            val basicPolygon = GeoPolygon.create(
                listOf(
                    GeoPoint.create(48.0, -122.8),
                    GeoPoint.create(48.2, -121.8),
                    GeoPoint.create(47.6, -121.6),
                    GeoPoint.create(47.0, -122.0),
                    GeoPoint.create(47.2, -122.6),
                    GeoPoint.create(48.0, -122.8)
                )
            )

            // Create a polygon with a single hole
            val outerRing = listOf(
                    GeoPoint.create(48.0, -122.8),
                    GeoPoint.create(48.2, -121.8),
                    GeoPoint.create(47.6, -121.6),
                    GeoPoint.create(47.0, -122.0),
                    GeoPoint.create(47.2, -122.6),
                    GeoPoint.create(48.0, -122.8)
            )

            val hole1 = listOf(
                    GeoPoint.create(47.8, -122.6),
                    GeoPoint.create(47.7, -122.2),
                    GeoPoint.create(47.4, -122.6),
                    GeoPoint.create(47.6, -122.5),
                    GeoPoint.create(47.8, -122.6)
            )

            val polygonWithOneHole = GeoPolygon.create(outerRing, hole1)

            // Add a second hole to the polygon
            val hole2 = listOf(
                GeoPoint.create(47.55, -122.05),
                GeoPoint.create(47.5, -121.9),
                GeoPoint.create(47.3, -122.1),
                GeoPoint.create(47.55, -122.05)
            )

            val polygonWithTwoHoles = GeoPolygon.create(outerRing, hole1, hole2)
            // :snippet-end:

            // :snippet-start: geocircle-query
            val companiesInLargeCircle =
                realm.query<Company>("location GEOWITHIN $circle1").find()
            println("Companies in large circle: ${companiesInLargeCircle.size}")

            val companiesInSmallCircle =
                realm.query<Company>("location GEOWITHIN $circle2").find()
            println("Companies in small circle: ${companiesInSmallCircle.size}")
            // :snippet-end:
            // :snippet-start: geobox-query
            val companiesInLargeBox =
                realm.query<Company>("location GEOWITHIN $box1").find()
            println("Companies in large box: ${companiesInLargeBox.size}")

            val companiesInSmallBox =
                realm.query<Company>("location GEOWITHIN $box2").find()
            println("Companies in small box: ${companiesInSmallBox.size}")
            // :snippet-end:
            // :snippet-start: geopolygon-query
            val companiesInBasicPolygon =
                realm.query<Company>("location GEOWITHIN $basicPolygon").find()
            println("Companies in basic polygon: ${companiesInBasicPolygon.size}")

            val companiesInPolygonWithHoles =
                realm.query<Company>("location GEOWITHIN $polygonWithTwoHoles").find()
            println("Companies in polygon with holes: ${companiesInPolygonWithHoles.size}")
            // :snippet-end:
            assertEquals(1, companiesInLargeCircle.size)
            assertEquals(0, companiesInSmallCircle.size)
            assertEquals(1, companiesInLargeBox.size)
            assertEquals(2, companiesInSmallBox.size)
            assertEquals(2, companiesInBasicPolygon.size)
            assertEquals(1, companiesInPolygonWithHoles.size)
            realm.close()
            Realm.deleteRealm(config)
        }
    }
}