val frog = realm.createObject(Frog::class.java)
frog.name = "Jonathan Livingston Applesauce"
// set the state using the enum
frog.stateEnum = FrogState.FROG

// fetching the state returns an enum
val currentJonathanState: FrogState = frog.stateEnum
