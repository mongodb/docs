package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogEnumKt": "Frog",
//       "FrogStateKt": "FrogState"
//    }
// }
import io.realm.RealmObject
import java.lang.IllegalArgumentException

open class FrogEnumKt  // realm-required empty constructor
    : RealmObject() {
    var name: String? = null
    private var state: String = FrogStateKt.TADPOLE.state
    var stateEnum: FrogStateKt
        get() {
            // because state is actually a String and another client could assign an invalid value,
            // default the state to "TADPOLE" if the state is unreadable
            return try {
                // fetches the FrogState enum value associated with the current internal string value
                FrogStateKt.valueOf(state)
            } catch (e: IllegalArgumentException) {
                FrogStateKt.TADPOLE
            }
        }
        set(value) {
            // users set state using a FrogState, but it is saved as a string internally
            state = value.state
        }
}
// :replace-end:
// :snippet-end: