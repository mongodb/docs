val losAngelesContacts = realm.where<Contact>()
    .equalTo("address.city", "Los Angeles")
    .sort("address.street").findAll()
Log.v("EXAMPLE", "Los Angeles Contacts: $losAngelesContacts")
