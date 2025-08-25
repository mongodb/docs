override fun onActive() {
    super.onActive()
    val obj = value
    if (obj != null && RealmObject.isValid(obj)) {
        RealmObject.addChangeListener(obj, listener)
    }
}