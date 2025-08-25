override fun onInactive() {
    super.onInactive()
    val obj = value
    if (obj != null && RealmObject.isValid(obj)) {
        RealmObject.removeChangeListener(obj, listener)
    }
}