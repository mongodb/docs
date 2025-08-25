// create the mocked realm
final Realm mockRealm = mock(Realm.class);
final RealmConfiguration mockRealmConfig = mock(RealmConfiguration.class);
// use this mock realm config for all new realm configurations
whenNew(RealmConfiguration.class).withAnyArguments().thenReturn(mockRealmConfig);
// use this mock realm for all new default realms
when(Realm.getDefaultInstance()).thenReturn(mockRealm);
