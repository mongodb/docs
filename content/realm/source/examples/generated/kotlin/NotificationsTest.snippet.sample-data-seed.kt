val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
    .name(realmName)
    .build()
val realm = Realm.open(config)

val frodo = Character("Frodo", "Hobbit", 51)
val samwise = Character("Samwise", "Hobbit", 39)
val aragorn = Character("Aragorn", "Dúnedain", 87)
val legolas = Character("Legolas", "Elf", 2931)
val gimli = Character("Gimli", "Dwarf", 140)
val gollum = Character("Gollum", "Hobbit", 589)

val fellowshipOfTheRing = Fellowship(
    "Fellowship of the Ring",
    realmListOf(frodo, samwise, aragorn, legolas, gimli))

realm.writeBlocking{
    this.copyToRealm(fellowshipOfTheRing)
    this.copyToRealm(gollum) // not in fellowship
}

realm.close()
