// We can use an empty string as the partitionValue here because we're
// injecting the user.id as an environment value from the LoginView.
@AutoOpen(appId: YOUR_APP_SERVICES_APP_ID_HERE, partitionValue: "", timeout: 4000) var autoOpen
