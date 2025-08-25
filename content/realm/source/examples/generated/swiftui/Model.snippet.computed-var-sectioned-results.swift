var firstLetter: String {
    guard let char = name.first else {
        return ""
    }
    return String(char)
}
