// With RealmObject
frogRealmObject.isValid();
frogRealmObject.addChangeListener(listener);

// With RealmModel
RealmObject.isValid(frogRealmModel);
RealmObject.addChangeListener(frogRealmModel, listener);
