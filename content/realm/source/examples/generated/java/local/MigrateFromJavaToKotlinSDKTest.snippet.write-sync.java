realm.executeTransaction(
        transactionRealm -> {
    Sample sample = new Sample();
    sample.stringField = "Sven";
    transactionRealm.copyToRealm(sample);
});
