Frog frog = realm.createObject(Frog.class);
frog.setName("George Washington");

// get the RealmSet field from the object we just created
RealmSet<Snack> set = frog.getFavoriteSnacks();

// add value to the RealmSet
Snack flies = realm.createObject(Snack.class);
flies.setName("flies");
set.add(flies);

// add multiple values to the RealmSet
Snack water = realm.createObject(Snack.class);
water.setName("water");
Snack verySmallRocks = realm.createObject(Snack.class);
verySmallRocks.setName("verySmallRocks");
set.addAll(Arrays.asList(water, verySmallRocks));

// check for the presence of a key with contains
Assert.assertTrue(set.contains(flies));

// check for the presence of multiple keys with containsAll
Snack biscuits = realm.createObject(Snack.class);
biscuits.setName("biscuits");
Assert.assertTrue(set.containsAll(Arrays.asList(water, biscuits)) == false);

// remove string from a set
set.remove(verySmallRocks);

// set no longer contains that string
Assert.assertTrue(set.contains(verySmallRocks) == false);

// deleting a Realm object also removes it from any RealmSets
int sizeOfSetBeforeDelete = set.size();
flies.deleteFromRealm();
// deleting flies object reduced the size of the set by one
Assert.assertTrue(sizeOfSetBeforeDelete == set.size() + 1);
