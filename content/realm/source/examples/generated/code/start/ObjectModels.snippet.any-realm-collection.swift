class ViewController {
//    let collection: RealmCollection
//                    ^
//                    error: protocol 'RealmCollection' can only be used
//                    as a generic constraint because it has Self or
//                    associated type requirements
//
//    init<C: RealmCollection>(collection: C) where C.ElementType == MyModel {
//        self.collection = collection
//    }

    let collection: AnyRealmCollection<MyModel>

    init<C: RealmCollection & _ObjcBridgeable>(collection: C) where C.ElementType == MyModel {
        self.collection = AnyRealmCollection(collection)
    }
}
