val tadpoles = realm.query<Frog>("age <= $0", 2)
for (tadpole in tadpoles.find()) {
    realm.write {
        findLatest(tadpole)?.name = tadpole.name + " Jr."
    }
}
