private val listener =
    RealmObjectChangeListener<T> { obj, objectChangeSet ->
        if (!objectChangeSet!!.isDeleted) {
            setValue(obj)
        } else { // Because invalidated objects are unsafe to set in LiveData, pass null instead.
            setValue(null)
        }
    }