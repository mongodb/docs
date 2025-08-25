class Student : RealmObject {
    var notes: RealmList<String> =
        realmListOf()
    var nullableNotes: RealmList<String?> =
        realmListOf()
}
