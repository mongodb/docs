class Person: Object, ObjectKeyIdentifiable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    @Persisted var personId = ""
    @Persisted var company = "MongoDB"
    @Persisted var businessUnit = BusinessUnitEnum.engineering
    @Persisted var profileImageUrl: URL?
    @Persisted var dogs: List<Dog>
}

enum BusinessUnitEnum: String, PersistableEnum, CaseIterable {
    case customerEngineering = "Customer Engineering"
    case educationCommunityAndDocs = "Education, Community and Docs"
    case engineering = "Engineering"
    case financeAndOperations = "Finance and Operations"
    case humanResourcesAndRescruiting = "Human Resources and Recruiting"
    case management = "Management"
    case marketing = "Marketing"
    case product = "Product"
    case sales = "Sales"
}

class Dog: Object, ObjectKeyIdentifiable {
    @Persisted(primaryKey: true) var _id: UUID
    @Persisted var name = ""
    @Persisted var breed = ""
    @Persisted var weight = 0
    @Persisted var favoriteToy = ""
    @Persisted var profileImageUrl: URL?
    @Persisted var dateLastUpdated = Date()
    @Persisted(originProperty: "dogs") var person: LinkingObjects<Person>
    var firstLetter: String {
        guard let char = name.first else {
            return ""
        }
        return String(char)
    }
}
