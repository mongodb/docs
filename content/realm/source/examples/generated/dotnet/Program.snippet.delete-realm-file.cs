var config = new RealmConfiguration("FileWeThrowAway.realm");
Realm.DeleteRealm(config);
var freshRealm = Realm.GetInstance(config);
