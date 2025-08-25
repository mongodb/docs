// items in the realm whose name begins with the letter 'D'
val itemsThatBeginWIthD: RealmResults<Item> =
    realm.query<Item>("summary BEGINSWITH $0", "D")
        .find()
//  todo items that have not been completed yet
val incompleteItems: RealmResults<Item> =
    realm.query<Item>("isComplete == false")
        .find()
