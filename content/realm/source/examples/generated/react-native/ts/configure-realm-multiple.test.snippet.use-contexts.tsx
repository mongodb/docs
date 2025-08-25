function TwoRealmsWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <UserProvider fallback={LogIn}>
          {/* This is a Flexible Sync realm. */}
          <SharedDocumentRealmProvider sync={{flexible: true}}>
            <AppSectionOne />
          </SharedDocumentRealmProvider>
        </UserProvider>
      </AppProvider>

      {/* This is a separate local-only realm. */}
      <LocalDocumentRealmProvider>
        <AppSectionTwo />
      </LocalDocumentRealmProvider>
    </View>
  );
}

function AppSectionOne() {
  const realm = useSharedDocumentRealm();

  // Work with shared documents...
}

function AppSectionTwo() {
  const realm = useLocalDocumentRealm();

  // Work with local documents...
}
