val frog = realm.createObject(Frog::class.java)
frog.name = "Jonathan Livingston Applesauce"

// get the RealmSet field from the object we just created
val set = frog.favoriteSnacks

// add value to the RealmSet
val flies = realm.createObject(Snack::class.java)
flies.name = "flies"
set.add(flies)

// add multiple values to the RealmSet
val water = realm.createObject(Snack::class.java)
water.name = "water"
val verySmallRocks = realm.createObject(Snack::class.java)
verySmallRocks.name = "verySmallRocks"
set.addAll(listOf(water, verySmallRocks))

// check for the presence of a key with contains
Assert.assertTrue(set.contains(flies))

// check for the presence of multiple keys with containsAll
val biscuits = realm.createObject(Snack::class.java)
biscuits.name = "biscuits"
Assert.assertTrue(set.containsAll(Arrays.asList(water, biscuits)) == false)

// remove string from a set
set.remove(verySmallRocks)

// set no longer contains that string
Assert.assertTrue(set.contains(verySmallRocks) == false)

// deleting a Realm object also removes it from any RealmSets
val sizeOfSetBeforeDelete = set.size
flies.deleteFromRealm()
// deleting flies object reduced the size of the set by one
Assert.assertTrue(sizeOfSetBeforeDelete == set.size + 1)
