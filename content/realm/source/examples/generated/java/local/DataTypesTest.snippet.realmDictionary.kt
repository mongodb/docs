val frog =
    realm.createObject(Frog::class.java)
frog.name = "George Washington"

// get the RealmDictionary field from the object we just created
val dictionary = frog.nicknamesToFriends

// add key/value to the dictionary
val wirt =
    realm.createObject(Frog::class.java)
wirt.name = "Wirt"
dictionary["tall frog"] = wirt

// add multiple keys/values to the dictionary
val greg =
    realm.createObject(Frog::class.java)
greg.name = "Greg"
val beatrice =
    realm.createObject(Frog::class.java)
beatrice.name = "Beatrice"
dictionary.putAll(mapOf<String, Frog>(
    Pair("small frog", greg),
    Pair("feathered frog", beatrice)))

// check for the presence of a key
Assert.assertTrue(dictionary.containsKey("small frog"))

// check for the presence of a value
Assert.assertTrue(dictionary.containsValue(greg))

// remove a key
dictionary.remove("feathered frog")
Assert.assertFalse(dictionary.containsKey("feathered frog"))

// deleting a Realm object does NOT remove it from the dictionary
val sizeOfDictionaryBeforeDelete = dictionary.size
greg.deleteFromRealm()
// deleting greg object did not reduce the size of the dictionary
Assert.assertEquals(
    sizeOfDictionaryBeforeDelete.toLong(),
    dictionary.size.toLong()
)
// but greg object IS now null:
Assert.assertEquals(dictionary["small frog"], null)
