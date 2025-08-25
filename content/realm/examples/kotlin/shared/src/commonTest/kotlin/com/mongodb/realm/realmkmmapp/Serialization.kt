// :snippet-start: serialize-type-in-file
@file:UseSerializers(RealmSetKSerializer::class)
package com.mongodb.realm.realmkmmapp // :remove:
import io.realm.kotlin.ext.realmSetOf
import io.realm.kotlin.serializers.RealmSetKSerializer
import io.realm.kotlin.types.RealmSet
import kotlinx.serialization.UseSerializers
// :snippet-end:
// :snippet-start: serialization-imports
import kotlinx.serialization.Serializable
import io.realm.kotlin.annotations.ExperimentalRealmSerializerApi
import org.mongodb.kbson.ExperimentalKBsonSerializerApi
import kotlinx.serialization.modules.SerializersModule
import io.realm.kotlin.serializers.RealmListKSerializer
// :snippet-end:
import io.realm.kotlin.ext.query
import io.realm.kotlin.types.RealmList
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.AppConfiguration
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.ext.call
import io.realm.kotlin.mongodb.ext.customData
import io.realm.kotlin.mongodb.ext.customDataAsBsonDocument
import io.realm.kotlin.mongodb.ext.profile
import io.realm.kotlin.mongodb.ext.profileAsBsonDocument
import io.realm.kotlin.query.RealmResults
import kotlin.test.Test
import kotlin.test.assertEquals
import io.realm.kotlin.types.RealmObject
import kotlinx.coroutines.delay
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Contextual
import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.modules.contextual
import org.mongodb.kbson.BsonDocument
import org.mongodb.kbson.BsonInt32
import org.mongodb.kbson.BsonInt64
import org.mongodb.kbson.BsonString
import org.mongodb.kbson.serialization.EJson

// :replace-start: {
//    "terms": {
//       "Serialization_": ""
//    }
// }

class SerializationTest: RealmTest() {
    @Test
    fun serializeSingleProperty() {
        // :snippet-start: serialize-single-property
        class Serialization_Frog : RealmObject {
            var name: String = ""
            @Serializable(RealmListKSerializer::class)
            var favoritePonds: RealmList<String> = realmListOf()
        }
        // :snippet-end:

        // Just perform some CRUD to verify we can use the object
        runBlocking {
            val config = RealmConfiguration.Builder(
                schema = setOf(Serialization_Frog::class) // Pass the defined class as the object schema
            )
                .directory("/tmp/") // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // Delete frogs to make this test successful on consecutive reruns
            realm.write {
                // fetch all frogs from the realm
                val frogs: RealmResults<Serialization_Frog> = this.query<Serialization_Frog>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(frogs)
                assertEquals(0, frogs.size)
            }

            realm.write {
                this.copyToRealm(Serialization_Frog().apply {
                    name = "Jeremiah"
                    favoritePonds = realmListOf("Picnic Pond", "Linya")
                })
            }

            val frogs: RealmResults<Serialization_Frog> = realm.query<Serialization_Frog>().find()
            assertEquals(1, frogs.size)
            val thisFrog = frogs.first()
            assertEquals(2, thisFrog.favoritePonds.size)
            realm.close()
        }
    }

    @Test
    fun serializeAllTypeOccurrances() {
        // :snippet-start: serialize-all-type-occurrences
        // These objects have RealmSet properties that get serializers
        // from declaring `@file:UseSerializers(RealmSetKSerializer::class)`.
        // No need to individually declare them on every `RealmSet` property in the file.
        class Serialization_Movie : RealmObject {
            var movieTitle: String = ""
            var actors: RealmSet<String> = realmSetOf()
        }

        class Serialization_TVSeries : RealmObject {
            var seriesTitle: String = ""
            var episodeTitles: RealmSet<String> = realmSetOf()
        }
        // :snippet-end:

        // Just perform some CRUD to verify we can use the objects
        runBlocking {
            val config = RealmConfiguration.Builder(
                schema = setOf(Serialization_Movie::class, Serialization_TVSeries::class) // Pass the defined class as the object schema
            )
                .directory("/tmp/") // default location for jvm is... in the project root
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // Delete objects to make this test successful on consecutive reruns
            realm.write {
                val movies: RealmResults<Serialization_Movie> = this.query<Serialization_Movie>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(movies)
                assertEquals(0, movies.size)
                val tvSeries: RealmResults<Serialization_TVSeries> = this.query<Serialization_TVSeries>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(tvSeries)
                assertEquals(0, tvSeries.size)
            }

            realm.write {
                this.copyToRealm(Serialization_Movie().apply {
                    movieTitle = "Guardians of the Galaxy Vol. 3"
                    actors = realmSetOf("Chris Pratt", "Chukwudi Iwuji", "Bradley Cooper", "Pom Klementieff")
                })
                this.copyToRealm(Serialization_TVSeries().apply {
                    seriesTitle = "Silo"
                    episodeTitles = realmSetOf("Freedom Day", "Holston's Pick", "Machines", "Truth")
                })
            }

            val movieResults: RealmResults<Serialization_Movie> = realm.query<Serialization_Movie>().find()
            assertEquals(1, movieResults.size)
            val thisMovie = movieResults.first()
            assertEquals(4, thisMovie.actors.size)
            Log.v(thisMovie.actors.toString())
            val seriesResults: RealmResults<Serialization_TVSeries> = realm.query<Serialization_TVSeries>().find()
            assertEquals(1, seriesResults.size)
            val thisSeries = seriesResults.first()
            assertEquals(4, thisSeries.episodeTitles.size)
            Log.v(thisSeries.episodeTitles.toString())
            realm.close()
        }
    }

    @Test
    fun customFunctionCredentialStableSerializerTest() {
        val app: App = App.create(FLEXIBLE_APP_ID)
        runBlocking {
            // :snippet-start: create-custom-credential-using-stable-serializer
            val credentials = Credentials.customFunction(
                mapOf(
                    "userId" to 500,
                    "password" to "securePassword"
                )
            )

            val bsonCredentials = Credentials.customFunction(
                BsonDocument(
                    mapOf(
                        "userId" to BsonInt32(500),
                        "password" to BsonString("securePassword")
                    )
                )
            )
            app.login(credentials)
            // :snippet-end:

        }
    }

    @Test
    fun callFunctionStableSerializerTest() {
        val app: App = App.create(FLEXIBLE_APP_ID)
        val credentials = Credentials.anonymous(reuseExisting = false)

        runBlocking {
            val user = app.login(credentials)

            // :snippet-start: call-function-stable-serializer
            // The `getMailingAddress` function takes a first name and last name and returns an address as a BsonDocument
            val address = user.functions.call<BsonDocument>("getMailingAddress", "Bob", "Smith")
            // :snippet-end:

            // The line below is failing after upgrading dependencies. This is now returning
            // <BsonInt64(value=123)> - but the document in Atlas contains a string field
            // whose value is "123 Any Street", and the function that I'm calling to
            // retrieve the result hasn't changed.
            // assertEquals(BsonString("123 Any Street"), address["street"])
        }
    }

    @Test
    fun customUserDataStableSerializerTest() {
        val app: App = App.create(FLEXIBLE_APP_ID)
        runBlocking {
            app.login(Credentials.anonymous(reuseExisting = false))
            // :snippet-start: custom-user-data-stable-serializer
            val user = app.currentUser!!
            // :remove-start:
            val functionResponse = user.functions
                .call<BsonDocument>("writeCustomUserData",
                    mapOf("userId" to user.id, "favoriteColor" to "blue")
                )
            delay(10)
            user.refreshCustomData()
            // :remove-end:
            val customUserData = user.customDataAsBsonDocument()

            assertEquals(BsonString("blue"), customUserData?.get("favoriteColor"))
            // :snippet-end:
            val deleteResponse = user.functions
                .call<BsonDocument>("deleteCustomUserData")
            assertEquals(deleteResponse["deletedCount"], BsonInt32(1))
            user.logOut()
        }
    }

    @Test
    fun customProfileDataStableSerializerTest() {
        val app: App = App.create(FLEXIBLE_APP_ID)
        val email = "my.email@example.com"
        val password = getRandom()
        val credentials = Credentials.emailPassword(email, password)
        runBlocking {
            app.emailPasswordAuth.registerUser(email, password)
            app.login(credentials)
            // :snippet-start: user-profile-stable-serializer
            val user = app.currentUser!!
            val userProfile = user.profileAsBsonDocument()

            assertEquals(userProfile["email"], BsonString("my.email@example.com"))
            // :snippet-end:
            user.delete()
        }
    }

    // :snippet-start: experimental-serializer-opt-in
    @OptIn(ExperimentalRealmSerializerApi::class)
    // :snippet-end:
    @Test
    fun callFunctionExperimentalSerializerTest() {
        // :snippet-start: define-serializable-class
        @Serializable
        class Serialization_Address(
            // The `street` field in the Atlas document is a string,
            // but is coming back as an `Int` since upgrading to realm-kotlin 1.13.0
            val street: Int,
            val city: String,
            val state: String,
            val country: String,
            val postalCode: String
        )

        // :snippet-start: define-a-class-as-serializable
        @Serializable
        class Serialization_Person(
            val firstName: String,
            val lastName: String
        )
        // :snippet-end:
        // :snippet-end:

        val app: App = App.create(FLEXIBLE_APP_ID)
        val credentials = Credentials.anonymous(reuseExisting = false)

        runBlocking {
            val user = app.login(credentials)

            // :snippet-start: call-function-experimental-serializer
            // The `getMailingAddressForPerson` function takes a Serialization_Person object and returns an Serialization_Address object using the experimental serializer
            val address = user.functions.call<Serialization_Address>("getMailingAddressForPerson"){
                add(Serialization_Person("Bob", "Smith"))
            }
            // :snippet-end:

            // The line below is failing after upgrading to realm-kotlin 1.13.0. This is now returning
            // <BsonInt64(value=123)> - but the document in Atlas contains a string field
            // whose value is "123 Any Street", and the function that I'm calling to
            // retrieve the result hasn't changed.
            // assertEquals("123 Any Street", address.street)
        }
    }

    @OptIn(ExperimentalRealmSerializerApi::class)
    @Test
    fun customFunctionCredentialExperimentalSerializerTest() {
        // :snippet-start: custom-function-credential-serializer
        @Serializable
        class CustomUserCredential(
            val userId: Int,
            val password: String
        )
        // :snippet-end:

        val app: App = App.create(FLEXIBLE_APP_ID)
        runBlocking {
            // :snippet-start: create-custom-credential-using-serializer
            val credentials = Credentials.customFunction(
                CustomUserCredential(
                    userId = 500,
                    password = "securePassword"
                )
            )
            app.login(credentials)
            // :snippet-end:
        }
    }

    @OptIn(ExperimentalRealmSerializerApi::class)
    @Test
    fun customUserDataExperimentalSerializerTest() {
        // :snippet-start: custom-data-serializer
        @Serializable
        class UserCustomData(
            val favoriteColor: String
        )
        // :snippet-end:

        val app: App = App.create(FLEXIBLE_APP_ID)
        runBlocking {
            app.login(Credentials.anonymous(reuseExisting = false))
            // :snippet-start: custom-user-data-experimental-serializer
            val user = app.currentUser!!
            // :remove-start:
            val functionResponse = user.functions
                .call<BsonDocument>("writeCustomUserData",
                    mapOf("userId" to user.id, "favoriteColor" to "blue")
                )
            delay(10)
            user.refreshCustomData()
            // :remove-end:
            val customUserData = user.customData<UserCustomData>()
            assertEquals("blue", customUserData!!.favoriteColor)
            // :snippet-end:
            val deleteResponse = user.functions
                .call<BsonDocument>("deleteCustomUserData")
            assertEquals(deleteResponse["deletedCount"], BsonInt32(1))
            user.logOut()
        }
    }

    @OptIn(ExperimentalRealmSerializerApi::class)
    @Test
    fun customProfileDataExperimentalSerializerTest() {
        // :snippet-start: user-profile-serializer
        @Serializable
        class UserProfile(
            val email: String
        )
        // :snippet-end:

        val app: App = App.create(FLEXIBLE_APP_ID)
        val email = "my.email@example.com"
        val password = getRandom()
        val credentials = Credentials.emailPassword(email, password)
        runBlocking {
            app.emailPasswordAuth.registerUser(email, password)
            app.login(credentials)
            // :snippet-start: user-profile-experimental-serializer
            val user = app.currentUser!!
            val userProfile = user.profile<UserProfile>()

            assertEquals(userProfile.email, "my.email@example.com")
            // :snippet-end:
            user.delete()
        }
    }

    object DateAsIntsSerializer : KSerializer<LocalDateTime> {
        override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("Date", PrimitiveKind.INT)
        override fun serialize(encoder: Encoder, value: LocalDateTime) = encoder.encodeInt(value.dayOfYear)
        override fun deserialize(decoder: Decoder): LocalDateTime = LocalDateTime(decoder.decodeInt(),decoder.decodeInt(),decoder.decodeInt(),decoder.decodeInt(),decoder.decodeInt())
    }

    @OptIn(ExperimentalKBsonSerializerApi::class, ExperimentalRealmSerializerApi::class)
    @Test
    fun setEjsonEncoderInAppConfiguration() {
        // :snippet-start: set-custom-ejson-serializer-for-app-configuration
        @Serializable
        class Serialization_Frogger(
            val name: String,
            @Contextual
            val date: LocalDateTime
        )

        AppConfiguration.Builder(FLEXIBLE_APP_ID)
            .ejson(
                EJson(
                    serializersModule = SerializersModule {
                        contextual(DateAsIntsSerializer)
                    }
                )
            )
            .build()
        // :snippet-end:
    }
}
// :replace-end: