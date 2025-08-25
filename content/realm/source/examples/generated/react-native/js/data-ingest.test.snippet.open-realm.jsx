// Create a configuration object
const realmConfig = {schema: [WeatherSensor]};

// Create a realm context
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

// Expose a sync realm
function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider sync={{flexible: true}}>
          <App />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
