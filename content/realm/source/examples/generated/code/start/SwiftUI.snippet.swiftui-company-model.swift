class Company: Object, ObjectKeyIdentifiable {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var companyName = ""
    @Persisted var employees: List<Employee>
    @Persisted var dogs: List<Dog>
}
