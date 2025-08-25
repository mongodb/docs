import io.realm.RealmObject;

public class Frog extends RealmObject {
    String name;
    String state = FrogState.TADPOLE.getState();
    // realm-required empty constructor
    public Frog() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public FrogState getState() {
        // because state is actually a String and another client could assign an invalid value,
        // default the state to "TADPOLE" if the state is unreadable
        FrogState currentState = null;
        try {
            // fetches the FrogState enum value associated with the current internal string value
            currentState = FrogState.valueOf(state);
        } catch (IllegalArgumentException e) {
            currentState = FrogState.TADPOLE;
        }
        return currentState;
    }
    public void setState(FrogState value) {
        // users set state using a FrogState, but it is saved as a string internally
        this.state = value.getState();
    }
}
