import io.realm.RealmObject
import java.lang.IllegalArgumentException

open class Frog  // realm-required empty constructor
    : RealmObject() {
    var name: String? = null
    private var state: String = FrogState.TADPOLE.state
    var stateEnum: FrogState
        get() {
            // because state is actually a String and another client could assign an invalid value,
            // default the state to "TADPOLE" if the state is unreadable
            return try {
                // fetches the FrogState enum value associated with the current internal string value
                FrogState.valueOf(state)
            } catch (e: IllegalArgumentException) {
                FrogState.TADPOLE
            }
        }
        set(value) {
            // users set state using a FrogState, but it is saved as a string internally
            state = value.state
        }
}
