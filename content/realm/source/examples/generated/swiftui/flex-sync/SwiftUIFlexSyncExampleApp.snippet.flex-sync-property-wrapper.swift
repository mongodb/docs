// We've injected a `flexibleSyncConfiguration` as an environment value,
// so `@AsyncOpen` here opens a realm using that configuration.
@AsyncOpen(appId: YOUR_APP_SERVICES_APP_ID_HERE, timeout: 4000) var asyncOpen
