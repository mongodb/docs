class Person: Object {
    // Required string property
    @Persisted var name = ""

    // Optional string property
    @Persisted var address: String?

    // Required numeric property
    @Persisted var ageYears = 0

    // Optional numeric property
    @Persisted var heightCm: Float?
}
