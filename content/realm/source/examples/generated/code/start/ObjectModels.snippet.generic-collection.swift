func operateOn<C: RealmCollection>(collection: C) {
    // Collection could be either Results or List
    print("operating on collection containing \(collection.count) objects")
}
