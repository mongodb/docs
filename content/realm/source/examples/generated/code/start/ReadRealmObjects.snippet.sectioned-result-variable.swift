// Computed variable that is not persisted, but only
// used to section query results.
var firstLetter: String {
    return name.first.map(String.init(_:)) ?? ""
}
