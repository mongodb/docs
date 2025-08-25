realm = Realm.GetInstance(config);
session = realm.SyncSession;
session.Stop();
//later...
session.Start();
