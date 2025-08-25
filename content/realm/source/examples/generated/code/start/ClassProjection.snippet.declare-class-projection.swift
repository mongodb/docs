class PersonProjection: Projection<Person> {
    @Projected(\Person.firstName) var firstName // Passthrough from original object
    @Projected(\Person.address?.city) var homeCity // Rename and access embedded object property through keypath
    @Projected(\Person.friends.projectTo.firstName) var firstFriendsName: ProjectedCollection<String> // Collection mapping
}
