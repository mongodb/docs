val sample: Sample? =
    realm.query<Sample>()
        .first().find()

// delete one object synchronously
realm.writeBlocking {
    if (sample != null) {
        findLatest(sample)
            ?.also { delete(it) }
    }
}

// delete a query result asynchronously
GlobalScope.launch {
    realm.write {
        query<Sample>()
            .first()
            .find()
            ?.also { delete(it) }
    }
}
