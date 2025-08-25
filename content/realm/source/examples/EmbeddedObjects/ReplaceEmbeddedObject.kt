// assumes that at least one contact already exists in this partition
val oldContact = realm.where<Contact>().findFirst()!!

realm.executeTransaction { transactionRealm ->
    val newAddress = Address(
        "Hollywood Upstairs Medical College",
        "Los Angeles",
        "USA",
        "90210")
    oldContact.address = newAddress
    Log.v("EXAMPLE", "Updated contact: $oldContact")
}

realm.close()
