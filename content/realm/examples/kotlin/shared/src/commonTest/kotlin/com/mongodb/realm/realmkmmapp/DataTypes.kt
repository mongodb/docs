package com.mongodb.realm.realmkmmapp
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.*
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.*
import org.mongodb.kbson.Decimal128
import org.mongodb.kbson.ObjectId
import kotlin.test.*

class CustomObjectType : RealmObject {
    var uuid: RealmUUID = RealmUUID.random()
}
class AnotherCustomObjectType : RealmObject {
    var uuid: RealmUUID = RealmUUID.random()
    // :snippet-start: realm-object-optional
    var realmObjectPropertyOpt: CustomObjectType? = null
    // :snippet-end:
    // :snippet-start: embedded-object-optional
    var embeddedProperty: EmbeddedObjectType? = null
    // :snippet-end:
}

class EmbeddedObjectType : EmbeddedRealmObject {
    var uuid: RealmUUID = RealmUUID.random()
    var nullable: RealmUUID? = null
    var id: ObjectId = ObjectId()
}

class ParentObjectType : RealmObject {
    var uuid: RealmUUID = RealmUUID.from("00000000-0000-0000-0000-000000000000")
    // :snippet-start: backlinks-parent-object
    var children: RealmSet<ChildObjectType> = realmSetOf()
    var embeddedChildren: RealmList<EmbeddedChildType> = realmListOf() // RealmSets cannot contain embedded objects
    var embeddedChildrenDictionary: RealmDictionary<EmbeddedChildType?> = realmDictionaryOf()
    // :snippet-end:
}

class ChildObjectType : RealmObject {
    var uuid: RealmUUID = RealmUUID.from("11111111-1111-1111-1111-111111111111")
    // :snippet-start: backlinks-realm-object
    val child: RealmResults<ParentObjectType> by backlinks(ParentObjectType::children)
    // :snippet-end:
}

class EmbeddedChildType : EmbeddedRealmObject {
    var uuid: RealmUUID = RealmUUID.from("22222222-2222-2222-2222-222222222222")
    // :snippet-start: backlinks-embedded-object
    val embeddedChild: ParentObjectType by backlinks(ParentObjectType::embeddedChildren)
    // :snippet-end:
}

// :snippet-start: enum-workaround
enum class EnumClass(var state: String) {
    NOT_STARTED("NOT_STARTED"),
    IN_PROGRESS("IN_PROGRESS"),
    COMPLETE("COMPLETE")
}

class EnumObject : RealmObject {
    var name: String? = null
    private var state: String = EnumClass.NOT_STARTED.state
    var stateEnum: EnumClass
        get() = EnumClass.valueOf(state)
        set(value) {
            state = value.state
        }
}
// :snippet-end:
class KotlinSupportedTypes : RealmObject {
    // :snippet-start: bool-required
    var boolReq: Boolean = false
    // :snippet-end:
    // :snippet-start: bool-optional
    var boolOpt: Boolean? = null
    // :snippet-end:
    // :snippet-start: int-required
    var intReq: Int = 0
    // :snippet-end:
    // :snippet-start: int-optional
    var intOpt: Int? = null
    // :snippet-end:
    // :snippet-start: long-required
    var longReq: Long = 0L
    // :snippet-end:
    // :snippet-start: long-optional
    var longOpt: Long? = null
    // :snippet-end:
    // :snippet-start: float-required
    var floatReq: Float = 0.0f
    // :snippet-end:
    // :snippet-start: float-optional
    var floatOpt: Float? = null
    // :snippet-end:
    // :snippet-start: double-required
    var doubleReq: Double = 0.0
    // :snippet-end:
    // :snippet-start: double-optional
    var doubleOpt: Double? = null
    // :snippet-end:
    // :snippet-start: short-required
    var shortReq: Short = 0
    // :snippet-end:
    // :snippet-start: short-optional
    var shortOpt: Short? = null
    // :snippet-end:
    // :snippet-start: string-required
    var stringReq: String = ""
    // :snippet-end:
    // :snippet-start: string-optional
    var stringOpt: String? = null
    // :snippet-end:
    // :snippet-start: byte-required
    var byteReq: Byte = 0
    // :snippet-end:
    // :snippet-start: byte-optional
    var byteOpt: Byte? = null
    // :snippet-end:
    // :snippet-start: char-required
    var charReq: Char = 'a'
    // :snippet-end:
    // :snippet-start: char-optional
    var charOpt: Char? = null
    // :snippet-end:
}
class BSONSupportedTypes : RealmObject {
    // :snippet-start: decimal128-required
    var decimal128Req: Decimal128 = Decimal128("123.456")
    // :snippet-end:
    // :snippet-start: decimal128-optional
    var decimal128Opt: Decimal128? = null
    // :snippet-end:
    // :snippet-start: objectId-required
    var objectIdReq: ObjectId = ObjectId()
    // :snippet-end:
    // :snippet-start: objectId-optional
    var objectIdOpt: ObjectId? = null
    // :snippet-end:
}
class RealmSupportedTypes : RealmObject {
    // :snippet-start: realmInstant-required
    var realmInstantReq: RealmInstant = RealmInstant.now()
    // :snippet-end:
    // :snippet-start: realmInstant-optional
    var realmInstantOpt: RealmInstant? = null
    // :snippet-end:
    // :snippet-start: mutableRealmInt-required
    var mutableRealmIntReq: MutableRealmInt = MutableRealmInt.create(0)
    // :snippet-end:
    // :snippet-start: mutableRealmInt-optional
    var mutableRealmIntOpt: MutableRealmInt? = null
    // :snippet-end:
    // :snippet-start: list-required
    var listReq: RealmList<CustomObjectType> = realmListOf()
    // :snippet-end:
    // :snippet-start: set-required
    var setReq: RealmSet<String> = realmSetOf()
    // :snippet-end:
    // :snippet-start: dictionary-required
    var dictionaryReq: RealmDictionary<String> = realmDictionaryOf()
    // :snippet-end:
    var dictionaryOpt: RealmDictionary<String?> = realmDictionaryOf()
    // :snippet-start: realmAny-optional
    var realmAnyOpt: RealmAny? = RealmAny.create("foo")
    // :snippet-end:
    // :snippet-start: uuid-required
    var uuidReq: RealmUUID = RealmUUID.random()
    // :snippet-end:
    // :snippet-start: uuid-optional
    var uuidOpt: RealmUUID? = null
    // :snippet-end:
}

class SupportedDataTypesTest : RealmTest() {
    @Test
    fun populateEnumPropertiesTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(EnumObject::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            val enumObject1 = EnumObject().apply {
                name = "MyEnum"
                stateEnum = EnumClass.IN_PROGRESS
            }
            val enumObject2 = EnumObject().apply {
                name = "MyOtherEnum"
            }
            realm.write {
                copyToRealm(enumObject1)
                copyToRealm(enumObject2)
                val enumObjectResult1 = query<EnumObject>().find().first()
                val enumObjectResult2 = query<EnumObject>().find().last()
                assertEquals("MyEnum", enumObjectResult1.name)
                assertEquals(EnumClass.IN_PROGRESS, enumObjectResult1.stateEnum)
                assertEquals("MyOtherEnum", enumObjectResult2.name)
                assertEquals(EnumClass.NOT_STARTED, enumObjectResult2.stateEnum)
                delete(enumObjectResult1)
                delete(enumObjectResult2)
            }
            realm.close()
        }
    }
    @Test
    fun populateKotlinDefaultPropertiesTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(KotlinSupportedTypes::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            val kotlinSupportedTypes = KotlinSupportedTypes().apply{}
            realm.write {
                copyToRealm(kotlinSupportedTypes)
                val kotlinSupportedTypesResult = query<KotlinSupportedTypes>().find().first()
                assertFalse(kotlinSupportedTypesResult.boolReq)
                assertNull(kotlinSupportedTypesResult.boolOpt)
                assertEquals(0, kotlinSupportedTypesResult.intReq)
                assertNull(kotlinSupportedTypesResult.intOpt)
                assertEquals(0L, kotlinSupportedTypesResult.longReq)
                assertNull(kotlinSupportedTypesResult.longOpt)
                assertEquals(0.0f, kotlinSupportedTypesResult.floatReq)
                assertNull(kotlinSupportedTypesResult.floatOpt)
                assertEquals(0.0, kotlinSupportedTypesResult.doubleReq)
                assertNull(kotlinSupportedTypesResult.doubleOpt)
                assertEquals(0, kotlinSupportedTypesResult.shortReq)
                assertNull(kotlinSupportedTypesResult.shortOpt)
                assertEquals("", kotlinSupportedTypesResult.stringReq)
                assertNull(kotlinSupportedTypesResult.stringOpt)
                assertEquals(0, kotlinSupportedTypesResult.byteReq)
                assertNull(kotlinSupportedTypesResult.byteOpt)
                assertEquals('a', kotlinSupportedTypesResult.charReq)
                assertNull(kotlinSupportedTypesResult.charOpt)
                delete(kotlinSupportedTypesResult)
            }
            realm.close()
        }
    }
    @Test
    fun populateKotlinPropertiesWithValuesTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(KotlinSupportedTypes::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            val kotlinSupportedTypes = KotlinSupportedTypes().apply {
                boolReq = true
                boolOpt = false
                intReq = 1
                intOpt = 2
                longReq = 3L
                longOpt = 4L
                floatReq = 5.0f
                floatOpt = 6.0f
                doubleReq = 7.0
                doubleOpt = 8.0
                shortReq = 9
                shortOpt = 10
                stringReq = "string1"
                stringOpt = "string2"
                byteReq = 11
                byteOpt = 12
                charReq = 'a'
                charOpt = 'b'
            }
            realm.write {
                copyToRealm(kotlinSupportedTypes)
            }
            val kotlinSupportedTypesResult = realm.query<KotlinSupportedTypes>().find().first()
            assertTrue(kotlinSupportedTypesResult.boolReq)
            assertFalse(kotlinSupportedTypesResult.boolOpt!!)
            assertEquals(1, kotlinSupportedTypesResult.intReq)
            assertEquals(2, kotlinSupportedTypesResult.intOpt!!)
            assertEquals(3L, kotlinSupportedTypesResult.longReq)
            assertEquals(4L, kotlinSupportedTypesResult.longOpt!!)
            assertEquals(5.0f, kotlinSupportedTypesResult.floatReq)
            assertEquals(6.0f, kotlinSupportedTypesResult.floatOpt!!)
            assertEquals(7.0, kotlinSupportedTypesResult.doubleReq)
            assertEquals(8.0, kotlinSupportedTypesResult.doubleOpt!!)
            assertEquals(9, kotlinSupportedTypesResult.shortReq)
            assertEquals(10, kotlinSupportedTypesResult.shortOpt!!)
            assertEquals("string1", kotlinSupportedTypesResult.stringReq)
            assertEquals("string2", kotlinSupportedTypesResult.stringOpt!!)
            assertEquals(11, kotlinSupportedTypesResult.byteReq)
            assertEquals(12, kotlinSupportedTypesResult.byteOpt!!)
            assertEquals('a', kotlinSupportedTypesResult.charReq)
            assertEquals('b', kotlinSupportedTypesResult.charOpt!!)
            realm.write {
                val kotlinSupportedTypes = query<KotlinSupportedTypes>().find().first()
                delete(kotlinSupportedTypes)
            }
            realm.close()
        }
    }
    @Test
    fun populateBSONDefaultPropertiesTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(BSONSupportedTypes::class, EmbeddedObjectType::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            val bsonSupportedTypes = BSONSupportedTypes().apply {}
            realm.write {
                copyToRealm(bsonSupportedTypes)
                val bsonSupportedTypesResult = query<BSONSupportedTypes>().find().first()
                assertEquals(Decimal128("123.456"), bsonSupportedTypesResult.decimal128Req)
                assertNull(bsonSupportedTypesResult.decimal128Opt)
                assertNotNull(bsonSupportedTypesResult.objectIdReq)
                assertTrue(bsonSupportedTypesResult.objectIdReq.isObjectId())
                assertNull(bsonSupportedTypesResult.objectIdOpt)
                delete(bsonSupportedTypesResult)
            }
            realm.close()
        }
    }

    @Test
    fun populateBSONPropertiesWithValuesTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(BSONSupportedTypes::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            val oidReq = ObjectId()
            val oidOpt = ObjectId()
            val bsonSupportedTypes = BSONSupportedTypes().apply{
                decimal128Req = Decimal128("111.222")
                decimal128Opt = Decimal128("222.333")
                objectIdReq = oidReq
                objectIdOpt = oidOpt
            }
            realm.write {
                copyToRealm(bsonSupportedTypes)
            }
            val bsonSupportedTypesResult = realm.query<BSONSupportedTypes>().find().first()
            assertEquals(Decimal128("111.222"), bsonSupportedTypesResult.decimal128Req)
            assertEquals(Decimal128("222.333"), bsonSupportedTypesResult.decimal128Opt)
            assertEquals(oidReq, bsonSupportedTypesResult.objectIdReq)
            assertEquals(oidOpt, bsonSupportedTypesResult.objectIdOpt)
            realm.write {
                val bsonSupportedTypes = query<BSONSupportedTypes>().find().first()
                delete(bsonSupportedTypes)
            }
            realm.close()
        }
    }

    @Test
    fun populateRealmDefaultPropertiesTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmSupportedTypes::class, CustomObjectType::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            val realmSupportedTypes = RealmSupportedTypes().apply {}
            realm.write {
                copyToRealm(realmSupportedTypes)

                val realmSupportedTypesResult = query<RealmSupportedTypes>().find().first()
                assertNotNull(realmSupportedTypesResult.realmInstantReq)
                assertNull(realmSupportedTypesResult.realmInstantOpt)
                assertEquals(0, realmSupportedTypesResult.mutableRealmIntReq.get())
                assertNull(realmSupportedTypesResult.mutableRealmIntOpt)
                assertEquals(0, realmSupportedTypesResult.listReq.size)
                assertEquals(0, realmSupportedTypesResult.setReq.size)
                assertEquals(0, realmSupportedTypesResult.dictionaryReq.size)
                assertEquals("foo", realmSupportedTypesResult.realmAnyOpt?.asString())
                assertNotNull(realmSupportedTypesResult.uuidReq)
                assertNull(realmSupportedTypesResult.uuidOpt)
                delete(realmSupportedTypesResult)
            }
            realm.close()
        }
    }

    @Test
    fun populateRealmPropertiesWithValuesTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmSupportedTypes::class, CustomObjectType::class))
                .name("populatePropertiesWithValues.realm")
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            // :snippet-start: create-uuid
            val uuid1 = RealmUUID.from("46423f1b-ce3e-4a7e-812f-004cf9c42d76")
            val uuid2 = RealmUUID.random()
            // :snippet-end:
            val date1 = RealmInstant.from(0, 1)
            val date2 = RealmInstant.from(1, 0)
            val int1 = MutableRealmInt.create(1)
            val int2 = MutableRealmInt.create(2)
            val realmSupportedTypes = RealmSupportedTypes().apply {
                realmInstantReq = date1
                realmInstantOpt = date2
                mutableRealmIntReq = int1
                mutableRealmIntOpt = int2
                listReq.add(CustomObjectType().apply { uuid = uuid1})
                setReq.add("hello")
                dictionaryReq["bing"] = "bong"
                realmAnyOpt = RealmAny.create(123)
                uuidReq = uuid1
                uuidOpt = uuid2
            }
            realm.write {
                copyToRealm(realmSupportedTypes)
            }
            val realmSupportedTypesResult = realm.query<RealmSupportedTypes>().find().first()
            val customObjectTypeResult = realm.query<CustomObjectType>().find().first()
            assertEquals(date1, realmSupportedTypesResult.realmInstantReq)
            assertEquals(date2, realmSupportedTypesResult.realmInstantOpt)
            assertEquals(1, realmSupportedTypesResult.mutableRealmIntReq.get())
            assertEquals(2, realmSupportedTypesResult.mutableRealmIntOpt!!.get())
            assertEquals(1, realmSupportedTypesResult.listReq.size)
            assertEquals(uuid1, realmSupportedTypesResult.listReq.first().uuid)
            assertEquals(1, realmSupportedTypesResult.setReq.size)
            assertEquals("hello", realmSupportedTypesResult.setReq.first())
            assertEquals(1, realmSupportedTypesResult.dictionaryReq.size)
            assertEquals("bong", realmSupportedTypesResult.dictionaryReq["bing"])
            assertEquals(123, realmSupportedTypesResult.realmAnyOpt!!.asInt())
            assertEquals(uuid1, realmSupportedTypesResult.uuidReq)
            assertEquals(uuid2, realmSupportedTypesResult.uuidOpt)
            assertEquals(uuid1, customObjectTypeResult.uuid)
            realm.write {
                val realmSupportedTypes = query<RealmSupportedTypes>().find().first()
                val customObjectType = query<CustomObjectType>().find().first()
                delete(realmSupportedTypes)
                delete(customObjectType)
            }
            realm.close()
        }
    }

    @Test
    fun populateRealmObjectDefaultPropertiesTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(EmbeddedObjectType::class, EmbeddedChildType::class, AnotherCustomObjectType::class, CustomObjectType::class, ParentObjectType::class, ChildObjectType::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            val anotherCustomObjectType = AnotherCustomObjectType().apply {
            }

            val parent = ParentObjectType().apply {
                children.add(ChildObjectType().apply {})
                embeddedChildren.add(EmbeddedChildType().apply {})
                embeddedChildrenDictionary["key"] = EmbeddedChildType().apply {}
            }

            realm.write {
                copyToRealm(parent)
                copyToRealm(anotherCustomObjectType)
                val anotherCustomObjectTypeResult = query<AnotherCustomObjectType>().find().first()
                val parentResult = query<ParentObjectType>().find().first()
                assertNull(anotherCustomObjectTypeResult.realmObjectPropertyOpt)
                assertNull(anotherCustomObjectTypeResult.embeddedProperty)
                assertEquals("00000000-0000-0000-0000-000000000000", parentResult.uuid.toString())
                assertEquals(1, parentResult.children.size)
                assertEquals("11111111-1111-1111-1111-111111111111", parentResult.children.first().uuid.toString())
                delete(parentResult)
            }
            realm.close()
        }
    }

    @Test
    fun populateRealmObjectPropertiesWithValuesTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(EmbeddedObjectType::class, AnotherCustomObjectType::class, CustomObjectType::class))
                .name("populateObjectPropertiesWithValues.realm")
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            val anotherCustomObjectType = AnotherCustomObjectType().apply {
                realmObjectPropertyOpt = CustomObjectType().apply {
                    uuid = RealmUUID.from("00000000-0000-0000-0000-000000000000")
                }
                embeddedProperty = EmbeddedObjectType().apply {uuid = RealmUUID.from("11111111-1111-1111-1111-111111111111")}

            }

            realm.write{
                copyToRealm(anotherCustomObjectType)
                val anotherCustomObjectTypeResult = query<AnotherCustomObjectType>().find().first()
                assertEquals("00000000-0000-0000-0000-000000000000", anotherCustomObjectTypeResult.realmObjectPropertyOpt?.uuid.toString())
                assertEquals("11111111-1111-1111-1111-111111111111", anotherCustomObjectTypeResult.embeddedProperty?.uuid.toString())
                delete(anotherCustomObjectTypeResult)
            }
            realm.close()
        }
    }
}