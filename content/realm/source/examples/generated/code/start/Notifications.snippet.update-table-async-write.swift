func delete(at index: Int) throws {
    func delete(at index: Int) throws {
        @ThreadSafe var object = results[index]
        DispatchQueue.global().async {
            guard let object = object else { return }
            let realm = object.realm!
            try! realm.write {
                if !object.isInvalidated {
                    realm.delete(object)
                }
            }
        }
    }
}
