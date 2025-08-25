// set up realm SDK components to be mocked. The order of these matters
mockStatic(RealmCore.class);
mockStatic(RealmLog.class);
mockStatic(Realm.class);
mockStatic(RealmConfiguration.class);
Realm.init(RuntimeEnvironment.application);
// boilerplate to mock realm components -- this prevents us from hitting any
// native code
doNothing().when(RealmCore.class);
RealmCore.loadLibrary(any(Context.class));
