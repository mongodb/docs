@RunWith(RobolectricTestRunner::class)
@Config(sdk = [28])
@PowerMockIgnore(
    "org.mockito.*",
    "org.robolectric.*",
    "android.*",
    "jdk.internal.reflect.*",
    "androidx.*"
)
@SuppressStaticInitializationFor("io.realm.internal.Util")
@PrepareForTest(
    Realm::class,
    RealmConfiguration::class,
    RealmQuery::class,
    RealmResults::class,
    RealmCore::class,
    RealmLog::class
)
