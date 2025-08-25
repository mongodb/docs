// Get all known users on device
val allUsers = app.allUsers()
for ((key) in allUsers) {
    Log.v("User on Device $device: $key")
}
