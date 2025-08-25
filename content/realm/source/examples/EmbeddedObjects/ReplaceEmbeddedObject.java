// assumes that at least one contact already exists in this partition 
Contact oldContact = realm.where(Contact.class).findFirst();

realm.executeTransaction(transactionRealm -> {
    Address newAddress = new Address(
        "Hollywood Upstairs Medical College",
        "Los Angeles",
        "USA"
        "90210"
        );
    oldContact.address = newAddress;
    Log.v("EXAMPLE", "Replaced contact: " + oldContact);
});

realm.close();
