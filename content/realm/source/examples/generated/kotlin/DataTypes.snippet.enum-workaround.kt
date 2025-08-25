enum class EnumClass(var state: String) {
    NOT_STARTED("NOT_STARTED"),
    IN_PROGRESS("IN_PROGRESS"),
    COMPLETE("COMPLETE")
}

class EnumObject : RealmObject {
    var name: String? = null
    private var state: String = EnumClass.NOT_STARTED.state
    var stateEnum: EnumClass
        get() = EnumClass.valueOf(state)
        set(value) {
            state = value.state
        }
}
