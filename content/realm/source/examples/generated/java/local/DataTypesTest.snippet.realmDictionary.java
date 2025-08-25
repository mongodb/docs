Frog frog = realm.createObject(Frog.class);
frog.setName("George Washington");

// get the RealmDictionary field from the object we just created
RealmDictionary<Frog> dictionary = frog.getNicknamesToFriends();

// add key/value to the dictionary
Frog wirt = realm.createObject(Frog.class);
wirt.setName("Wirt");
dictionary.put("tall frog", wirt);

// add multiple keys/values to the dictionary
Frog greg = realm.createObject(Frog.class);
greg.setName("Greg");
Frog beatrice = realm.createObject(Frog.class);
beatrice.setName("Beatrice");
dictionary.putAll(Map.of("small frog", greg, "feathered frog", beatrice));

// check for the presence of a key
Assert.assertTrue(dictionary.containsKey("small frog"));

// check for the presence of a value
Assert.assertTrue(dictionary.containsValue(greg));

// remove a key
dictionary.remove("feathered frog");
Assert.assertFalse(dictionary.containsKey("feathered frog"));

// deleting a Realm object does NOT remove it from the dictionary
int sizeOfDictionaryBeforeDelete = dictionary.size();
greg.deleteFromRealm();
// deleting greg object did not reduce the size of the dictionary
Assert.assertEquals(sizeOfDictionaryBeforeDelete, dictionary.size());
// but greg object IS now null:
Assert.assertEquals(dictionary.get("small frog"), null);
