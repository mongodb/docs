// set up realm SDK components to be mocked. The order of these matters
PowerMockito.mockStatic(RealmCore::class.java)
PowerMockito.mockStatic(RealmLog::class.java)
PowerMockito.mockStatic(Realm::class.java)
PowerMockito.mockStatic(RealmConfiguration::class.java)
Realm.init(RuntimeEnvironment.application)
PowerMockito.doNothing().`when`(RealmCore::class.java)
RealmCore.loadLibrary(ArgumentMatchers.any(Context::class.java))
