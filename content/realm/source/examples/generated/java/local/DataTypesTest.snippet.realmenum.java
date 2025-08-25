Frog frog = realm.createObject(Frog.class);
frog.setName("Jonathan Livingston Applesauce");
// set the state using the enum
frog.setState(FrogState.FROG);

// fetching the state returns an enum
FrogState currentJonathanState = frog.getState();
