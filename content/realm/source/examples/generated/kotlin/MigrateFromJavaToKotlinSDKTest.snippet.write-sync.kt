realm.writeBlocking {
    // this: MutableRealm
    val sample = Sample()
    sample.stringField = "Sven"
    this.copyToRealm(sample)
}
