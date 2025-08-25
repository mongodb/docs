Sample sample =
        realm.where(Sample.class)
                .findFirst();

// delete one object synchronously
realm.executeTransaction(
        transactionRealm ->
        sample.deleteFromRealm());

// delete a query result asynchronously
realm.executeTransactionAsync(
        backgroundRealm ->
        backgroundRealm
                .where(Sample.class)
                .findFirst()
                .deleteFromRealm());
