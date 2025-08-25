// delete the first item in the realm
realm.writeBlocking {
    val writeTransactionItems = query<Item>().find()
    delete(writeTransactionItems.first())
}
