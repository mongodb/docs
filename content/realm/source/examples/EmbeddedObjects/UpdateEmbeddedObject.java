// assumes that at least one contact already exists in this partition 
Contact resultContact = realm.where(Contact.class).findFirst();

realm.executeTransaction(transactionRealm -> {
    resultContact.address.street = "Hollywood Upstairs Medical College";
    resultContact.address.city = "Los Angeles";
    resultContact.address.postalCode = "90210";
    Log.v("EXAMPLE", "Updated contact: " + resultContact);
});

realm.close();
