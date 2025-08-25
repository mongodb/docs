class Profile: Projection<Person> {
    @Projected(\Person.firstName) var firstName // Passthrough from original object
    @Projected(\Person.lastName.localizedCapitalized.first) var lastNameInitial // Access and transform the original property
    @Projected(\Person.personId) var personId
    @Projected(\Person.businessUnit) var businessUnit
    @Projected(\Person.profileImageUrl) var profileImageUrl
    @Projected(\Person.dogs) var dogs
}
