val frog = realm.createObject(Frog::class.java)
frog.name = "George Washington"

// set RealmAny field to a null value

// set RealmAny field to a null value
frog.bestFriend = RealmAny.nullValue()
Log.v("EXAMPLE", "Best friend: " + frog.bestFriendToString())

// possible types for RealmAny are defined in RealmAny.Type
Assert.assertEquals(frog.bestFriend?.type, RealmAny.Type.NULL)

// set RealmAny field to a string with RealmAny.valueOf a string value
frog.bestFriend = RealmAny.valueOf("Greg")
Log.v("EXAMPLE", "Best friend: " + frog.bestFriendToString())

// RealmAny instances change type as you reassign to different values
Assert.assertEquals(frog.bestFriend?.type, RealmAny.Type.STRING)

// set RealmAny field to a realm object, also with valueOf
val person = Person("Jason Funderburker")

frog.bestFriend = RealmAny.valueOf(person)
Log.v("EXAMPLE", "Best friend: " + frog.bestFriendToString())

// You can also extract underlying Realm Objects from RealmAny with asRealmModel
val bestFriendObject = frog.bestFriend?.asRealmModel(Person::class.java)
Log.v("EXAMPLE", "Best friend: " + bestFriendObject?.name)

// RealmAny fields referring to any Realm Object use the OBJECT type
Assert.assertEquals(frog.bestFriend?.type, RealmAny.Type.OBJECT)

// you can't put a RealmList in a RealmAny field directly,
// ...but you can set a RealmAny field to a RealmObject that contains a list
val persons = GroupOfPeople()
// GroupOfPeople contains a RealmList of people
persons.people.add("Rand")
persons.people.add("Perrin")
persons.people.add("Mat")

frog.bestFriend = RealmAny.valueOf(persons)
Log.v("EXAMPLE", "Best friend: " +
        frog.bestFriend?.asRealmModel(GroupOfPeople::class.java)
                ?.people.toString())
