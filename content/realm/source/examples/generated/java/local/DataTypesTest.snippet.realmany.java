  Frog frog = realm.createObject(Frog.class);
  frog.setName("Jonathan Livingston Applesauce");

  // set RealmAny field to a null value
  frog.setBestFriend(RealmAny.nullValue());
  Log.v("EXAMPLE", "Best friend: " + frog.bestFriendToString());

  // possible types for RealmAny are defined in RealmAny.Type
  Assert.assertTrue(frog.getBestFriend().getType() == RealmAny.Type.NULL);

  // set RealmAny field to a string with RealmAny.valueOf a string value
  frog.setBestFriend(RealmAny.valueOf("Greg"));
  Log.v("EXAMPLE", "Best friend: " + frog.bestFriendToString());

  // RealmAny instances change type as you reassign to different values
  Assert.assertTrue(frog.getBestFriend().getType() == RealmAny.Type.STRING);

  // set RealmAny field to a realm object, also with valueOf
  Person person = new Person("Jason Funderburker");

  frog.setBestFriend(RealmAny.valueOf(person));
  Log.v("EXAMPLE", "Best friend: " + frog.bestFriendToString());

  // You can also extract underlying Realm Objects from RealmAny with asRealmModel
  Person bestFriendObject = frog.getBestFriend().asRealmModel(Person.class);
  Log.v("EXAMPLE", "Best friend: " + bestFriendObject.getName());

  // RealmAny fields referring to any Realm Object use the OBJECT type
  Assert.assertTrue(frog.getBestFriend().getType() == RealmAny.Type.OBJECT);

  // you can't put a RealmList in a RealmAny field directly,
  // ...but you can set a RealmAny field to a RealmObject that contains a list
  GroupOfPeople persons = new GroupOfPeople();
  // GroupOfPeople contains a RealmList of people
  persons.getPeople().add("Rand");
  persons.getPeople().add("Perrin");
  persons.getPeople().add("Mat");

  frog.setBestFriend(RealmAny.valueOf(persons));
  Log.v("EXAMPLE", "Best friend: " +
          frog.getBestFriend().asRealmModel(GroupOfPeople.class).getPeople().toString());
