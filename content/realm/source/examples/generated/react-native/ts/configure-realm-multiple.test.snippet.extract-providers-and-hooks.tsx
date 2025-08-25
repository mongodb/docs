// Namespace the Shared Document context's providers and hooks.
const {
  RealmProvider: SharedDocumentRealmProvider,
  useRealm: useSharedDocumentRealm,
} = SharedRealmContext;

// Namespace the Local Document context's providers and hooks.
const {
  RealmProvider: LocalDocumentRealmProvider,
  useRealm: useLocalDocumentRealm,
} = LocalRealmContext;
