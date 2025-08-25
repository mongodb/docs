func delete(at index: Int) throws {
    try realm.write {
        realm.delete(results[index])
    }
    realm.refresh()
}
