package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.ext.backlinks
import io.realm.kotlin.ext.realmDictionaryOf
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.ext.realmSetOf
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.*
import io.realm.kotlin.types.annotations.*
import org.mongodb.kbson.ObjectId


// :replace-start: {
//    "terms": {
//       "ExampleRealmObject_": "",
//       "ExampleEmbeddedObject_": "",
//       "RealmObjectProperties_": "",
//       "RealmEmbeddedObject_": "",
//       "ExampleRelationship_": "",
//       "ExampleEmbeddedRelationship_": "",
//       "ExampleRealmList_": "",
//       "RealmList_": "",
//       "ExampleRealmDictionary_": "",
//       "RealmDictionary_": "",
//       "ExampleRealmSet_": "",
//       "RealmSet_": "",
//       "ExamplePropertyAnnotations_": ""
//   }
// }

/*
******** Define Realm Object Model page examples *********
*/

// ** Object types tested in SchemaTest.kt file unless otherwise noted **
// :snippet-start: define-realm-object
// Implements the `RealmObject` interface
class ExampleRealmObject_Frog : RealmObject { // Empty constructor required by Realm
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int = 0
    var species: String? = null
    var owner: String? = null
}
// :snippet-end:

class ExampleRealmObject_Pond : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var frogsThatLiveHere: RealmList<ExampleRealmObject_Frog> = realmListOf()
}
class ExampleEmbeddedObject_EmbeddedForest : EmbeddedRealmObject {
    var id: ObjectId = ObjectId()
    var name: String = ""
}


// ** Tested in Create, Read, Update, and Delete.kt files **

// :snippet-start: create-realm-properties
class RealmObjectProperties_Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var birthdate: RealmInstant? = null
    var fliesEaten: MutableRealmInt? = null
    var favoriteThings: RealmList<RealmAny?> = realmListOf()
    var favoriteThing: RealmAny? = null // :remove:
}
// :snippet-end:


// :snippet-start: define-embedded-object
// Implements `EmbeddedRealmObject` interface
class ExampleEmbeddedObject_EmbeddedAddress : EmbeddedRealmObject {
    // CANNOT have primary key
    var street: String? = null
    var city: String? = null
    var state: String? = null
    var postalCode: String? = null
    var propertyOwner: ExampleRelationship_Contact? = null
}
// :snippet-end:

// ** Tested in AsymmetricSyncTest.kt **
// :snippet-start: define-asymmetric-model
// Implements the `AsymmetricRealmObject` interface
class WeatherSensor : AsymmetricRealmObject {
    @PersistedName("_id")
    @PrimaryKey
    var id: ObjectId = ObjectId()
    var deviceId: String = ""
    var temperatureInFarenheit: Float = 0.0F
    var barometricPressureInHg: Float = 0.0F
    var windSpeedInMph: Int = 0
}
// :snippet-end:

// :snippet-start: define-a-realm-list
// RealmList<E> can be any supported primitive
// or BSON type, a RealmObject, or an EmbeddedRealmObject
class ExampleRealmList_Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // List of RealmObject type (CANNOT be nullable)
    var favoritePonds: RealmList<ExampleRealmList_Pond> = realmListOf()
    // List of EmbeddedRealmObject type (CANNOT be nullable)
    var favoriteForests: RealmList<ExampleEmbeddedObject_EmbeddedForest> = realmListOf()
    // List of primitive type (can be nullable)
    var favoriteWeather: RealmList<String?> = realmListOf()
}

class ExampleRealmList_Pond : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
}
// :snippet-end:

// :snippet-start: define-a-realm-set
// RealmSet<E> can be any supported primitive or
// BSON type or a RealmObject
class ExampleRealmSet_Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Set of RealmObject type (CANNOT be nullable)
    var favoriteSnacks: RealmSet<ExampleRealmSet_Snack> = realmSetOf()
    // Set of primitive type (can be nullable)
    var favoriteWeather: RealmSet<String?> = realmSetOf()
}

class ExampleRealmSet_Snack : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
}
// :snippet-end:

// ** Tested in Create, Read, Update, and Delete.kt files **
class RealmSet_Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var favoriteSnacks: RealmSet<RealmSet_Snack> = realmSetOf()
}

class RealmSet_Snack : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
}

// :snippet-start: define-realm-dictionary-property
// RealmDictionary<K, V> can be any supported
// primitive or BSON types, a RealmObject, or
// an EmbeddedRealmObject
class ExampleRealmDictionary_Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Dictionary of RealmObject type (value MUST be nullable)
    var favoriteFriendsByPond: RealmDictionary<ExampleRealmDictionary_Frog?> = realmDictionaryOf()
    // Dictionary of EmbeddedRealmObject type (value MUST be nullable)
    var favoriteTreesInForest: RealmDictionary<ExampleEmbeddedObject_EmbeddedForest?> = realmDictionaryOf()
    // Dictionary of primitive type (value can be nullable)
    var favoritePondsByForest: RealmDictionary<String?> = realmDictionaryOf()
}
// :snippet-end:

// ** Tested in Create, Read, Update, and Delete.kt files **
class RealmDictionary_Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var favoriteFriendsByForest: RealmDictionary<RealmDictionary_Frog?> = realmDictionaryOf()
    var favoritePondsByForest: RealmDictionary<String?> = realmDictionaryOf()
}

/*
******** Relationship page examples *********
*/

// :snippet-start: define-to-one-relationship
// Relationships of Realm objects must be of RealmObject type
class ExampleRelationship_Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int = 0
    // Property of RealmObject type (MUST be null)
    var favoritePond: ExampleRelationship_Pond? = null
    var bestFriend: ExampleRelationship_Frog? = null
}
// :snippet-end:
class ExampleRelationship_Pond : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
}

// :snippet-start: define-to-many-relationship
// Relationships of RealmList<E> or RealmSet<E> must be of RealmObject type
class ExampleRelationship_Forest : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Set of RealmObject type (CANNOT be null)
    var frogsThatLiveHere: RealmSet<ExampleRelationship_Frog> = realmSetOf()
    // List of RealmObject type (CANNOT be null)
    var nearbyPonds: RealmList<ExampleRelationship_Pond> = realmListOf()
}
// :snippet-end:

// :snippet-start: define-inverse-property-parent
// Parent object must have RealmList<E>, RealmSet<E>, or
// RealmDictionary<K,V> property of child type
class ExampleRelationship_User : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // List of child RealmObject type (CANNOT be nullable)
    var posts: RealmList<ExampleRelationship_Post> = realmListOf()
    // Set of child RealmObject type (CANNOT be nullable)
    var favoritePosts: RealmSet<ExampleRelationship_Post> = realmSetOf()
    // Dictionary of child RealmObject type (value MUST be nullable)
    var postByYear: RealmDictionary<ExampleRelationship_Post?> = realmDictionaryOf()
}
// :snippet-end:
// :snippet-start: define-inverse-property-child
// Backlink of RealmObject must be RealmResults<E> of parent object type
class ExampleRelationship_Post : RealmObject {
    var title: String = ""
    var date: RealmInstant = RealmInstant.now()
    // Backlink to parent RealmObject type (CANNOT be null & MUST be val)
    val user: RealmResults<ExampleRelationship_User> by backlinks(ExampleRelationship_User::posts)
}
// :snippet-end:

// :snippet-start: define-to-one-embedded-relationship
// To-one embedded relationships must be of EmbeddedRealmObject type
class ExampleRelationship_Contact : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Property of EmbeddedRealmObject type (MUST be null)
    var address: ExampleRelationship_EmbeddedAddress? = null
}

class ExampleRelationship_EmbeddedAddress : EmbeddedRealmObject {
    var propertyOwner: ExampleRelationship_Contact? = null
    var street: String? = ""
    // Embed another EmbeddedRealmObject type
    var country: ExampleRelationship_EmbeddedCountry? = null
}

class ExampleRelationship_EmbeddedCountry : EmbeddedRealmObject {
    var name: String = ""
}
// :snippet-end:
// :snippet-start: define-to-many-embedded-relationship
// To-many embedded relationships must be a RealmList<E> or
// RealmDictionary<K, V> property of EmbeddedRealmObject type
class ExampleRelationship_Business : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // List of EmbeddedRealmObject type (CANNOT be null)
    var addresses: RealmList<ExampleRelationship_EmbeddedAddress> = realmListOf()
    // Dictionary of EmbeddedRealmObject type (value MUST be nullable)
    var addressByYear: RealmDictionary<ExampleRelationship_EmbeddedAddress?> = realmDictionaryOf()
}
// :snippet-end:

// :snippet-start: define-inverse-embedded-property-parent
// Parent object must have RealmList<E> or RealmDictionary<K, V>
// property of child EmbeddedRealmObject type
class ExampleEmbeddedRelationship_User : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // List of child EmbeddedRealmObject type (CANNOT be nullable)
    var posts: RealmList<ExampleEmbeddedRelationship_Post> = realmListOf()
    // Dictionary of child EmbeddedRealmObject type (value MUST be nullable)
    var postByYear: RealmDictionary<ExampleEmbeddedRelationship_Post?> = realmDictionaryOf()
}
// :snippet-end:
// :snippet-start: define-inverse-embedded-property-child
// Backlink of EmbeddedRealmObject must be parent object type
class ExampleEmbeddedRelationship_Post : EmbeddedRealmObject {
    var title: String = ""
    var date: RealmInstant = RealmInstant.now()
    // Backlink to parent RealmObject type (CANNOT be null & MUST be val)
    val user: ExampleEmbeddedRelationship_User by backlinks(ExampleEmbeddedRelationship_User::posts)
}
// :snippet-end:

/*
******** Property Annotations page examples *********
*/
// :snippet-start: define-property-annotations
class ExamplePropertyAnnotations_Frog : RealmObject {
    // :snippet-start: define-primary-key
    @PrimaryKey
    var _id: ObjectId = ObjectId() // Primary key property
    // :snippet-end:
    // :snippet-start: define-index
    @Index
    var name: String = "" // Indexed property
    // :snippet-end:
    // :snippet-start: define-ignored
    @Ignore
    var age: Int = 0 // Ignored property
    // :snippet-end:
    // :snippet-start: define-persisted-name
    @PersistedName("latin_name")
    var species: String? = null // Remapped property
    // :snippet-end:
    // :snippet-start: define-fts
    @FullText
    var physicalDescription: String? = null // Full-text search indexed property
    // :snippet-end:
}
// :snippet-end:
// :snippet-start: define-persisted-class
@PersistedName(name = "Frog_Entity") // Remapped class name
class Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int = 0
    var species: String? = null
    var owner: String? = null
}
// :snippet-end:


// :replace-end: