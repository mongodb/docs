// create the mocked realm
val mockRealm = PowerMockito.mock(Realm::class.java)
val mockRealmConfig = PowerMockito.mock(
    RealmConfiguration::class.java
)
// use this mock realm config for all new realm configurations
PowerMockito.whenNew(RealmConfiguration::class.java).withAnyArguments()
    .thenReturn(mockRealmConfig)
// use this mock realm for all new default realms
PowerMockito.`when`(Realm.getDefaultInstance()).thenReturn(mockRealm)
