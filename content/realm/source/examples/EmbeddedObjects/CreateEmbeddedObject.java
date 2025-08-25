User user = app.currentUser();
String partitionValue = "My Project";
SyncConfiguration config = new SyncConfiguration.Builder(user, partitionValue)
        .build();

Realm realm = Realm.getInstance(config);

Address address = new Address("123 Fake St.", "Springfield", "USA", "90710");
Contact contact = new Contact("Nick Riviera", address);

realm.executeTransaction(transactionRealm -> {
    transactionRealm.insert(contact);
});

realm.close();
