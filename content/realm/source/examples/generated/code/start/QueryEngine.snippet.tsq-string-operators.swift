// Use the .caseInsensitive option for case-insensitivity.
let startWithE = projects.where {
    $0.name.starts(with: "e", options: .caseInsensitive)
}
print("Projects that start with 'e': \(startWithE.count)")

let containIe = projects.where {
    $0.name.contains("ie")
}
print("Projects that contain 'ie': \(containIe.count)")

let likeWildcard = tasks.where {
    $0.assignee.like("Al?x")
}
print("Tasks with assignees like Al?x: \(likeWildcard.count)")

// Use the .diacreticInsensitive option for diacritic insensitivty: contains 'e', 'E', 'é', etc.
let containElike = projects.where {
    $0.name.contains("e", options: .diacriticInsensitive)
}
print("Projects that contain 'e', 'E', 'é', etc.: \(containElike.count)")
