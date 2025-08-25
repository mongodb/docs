class Frog : RealmObject {
    var name: String = ""
    @Serializable(RealmListKSerializer::class)
    var favoritePonds: RealmList<String> = realmListOf()
}
