// Handle possible types with a 'when' statement
frogsFavoriteThings.forEach { realmAny ->
    if (realmAny != null) {
        when (realmAny.type) {
            RealmAny.Type.INT -> {
                val intValue = realmAny.asInt()
                // Do something with intValue ...
            }
            RealmAny.Type.STRING -> {
                val stringValue = realmAny.asString()
                // Do something with stringValue ...
            }
            RealmAny.Type.OBJECT -> {
                val objectValue = realmAny.asRealmObject(Frog::class)
                // Do something with objectValue ...
            }
            // Handle other possible types...
            else -> {
                // Debug or perform a default action for unhandled types
                Log.d("Unhandled type: ${realmAny.type}")
            }
        }
    }
}
