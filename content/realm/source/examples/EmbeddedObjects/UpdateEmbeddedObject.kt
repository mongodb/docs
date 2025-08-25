// assumes that at least one contact already exists in this partition
val result = realm.where<Contact>().findFirst()!!

realm.executeTransaction { transactionRealm ->
    result.address?.street = "Hollywood Upstairs Medical College"
    result.address?.city = "Los Angeles"
    result.address?.postalCode = "90210"
    Log.v("EXAMPLE", "Updated contact: ${result.name}")
}

realm.close()
