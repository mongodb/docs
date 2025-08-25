package com.mongodb.realm.livedataquickstart.model


import androidx.annotation.MainThread
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.realm.RealmModel
import io.realm.RealmObject
import io.realm.RealmObjectChangeListener


/**
 * This class represents a RealmObject wrapped inside a LiveData.
 *
 * The provided RealmObject must be a managed object that exists in a realm on creation.
 *
 * When the enclosing LifecycleOwner is killed, the listener is automatically unsubscribed.
 *
 * Realm keeps the managed RealmObject up-to-date whenever a change occurs on any thread.
 * When the RealmObject changes, LiveRealmObject notifies the observer.
 *
 * LiveRealmObject observes the object until it is invalidated. You can invalidate the RealmObject by
 * deleting it or by closing the realm that owns it.
 *
 * @param <T> the type of the RealmModel
</T> */
class LiveRealmObject<T : RealmModel?> @MainThread constructor(obj: T?) : MutableLiveData<T>() {

    // :snippet-start: listener
    private val listener =
        RealmObjectChangeListener<T> { obj, objectChangeSet ->
            if (!objectChangeSet!!.isDeleted) {
                setValue(obj)
            } else { // Because invalidated objects are unsafe to set in LiveData, pass null instead.
                setValue(null)
            }
        }
    // :snippet-end:

    /**
     * Starts observing the RealmObject if we have observers and the object is still valid.
     */
    // :snippet-start: onactive
    override fun onActive() {
        super.onActive()
        val obj = value
        if (obj != null && RealmObject.isValid(obj)) {
            RealmObject.addChangeListener(obj, listener)
        }
    }
    // :snippet-end:

    /**
     * Stops observing the RealmObject.
     */
    // :snippet-start: oninactive
    override fun onInactive() {
        super.onInactive()
        val obj = value
        if (obj != null && RealmObject.isValid(obj)) {
            RealmObject.removeChangeListener(obj, listener)
        }
    }
    // :snippet-end:

    var value : T? = obj
}