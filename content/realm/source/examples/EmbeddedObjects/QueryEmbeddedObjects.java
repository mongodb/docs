RealmResults<Contact> losAngelesContacts = realm.where(Contact.class)
        .equalTo("address.city", "Los Angeles")
        .sort("address.street").findAll();
Log.v("EXAMPLE", "Los Angeles contacts: " + losAngelesContacts);
