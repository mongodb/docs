Asymmetric objects broadly support the same property types as ``RealmObject``, 
with a few exceptions:

- Asymmetric objects can only be used in synced realms configured with 
  Flexible Sync. However, you cannot create subscriptions to 
  asymmetric objects.
- An ``AsymmetricRealmObject`` can contain ``EmbeddedRealmObject`` 
  types, but *cannot* contain ``RealmObject`` types or other 
  ``AsymmetricRealmObject`` types.
- ``AsymmetricRealmObject`` types *cannot* be used as properties in other 
  Realm objects.

Additionally, asymmetric objects do not function in the same way as other Realm objects. 
You cannot add, read, update, or delete an asymmetric object from the realm.
You can only create an asymmetric object, which then syncs unidirectionally 
to the Atlas database linked to your App with Device Sync.
Realm then deletes this object after syncing. 