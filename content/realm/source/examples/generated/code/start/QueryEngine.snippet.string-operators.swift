// Use [c] for case-insensitivity.
let startWithE = projects.filter("name BEGINSWITH[c] 'e'")
print("Projects that start with 'e': \(startWithE.count)")

let containIe = projects.filter("name CONTAINS 'ie'")
print("Projects that contain 'ie': \(containIe.count)")

// [d] for diacritic insensitivty: contains 'e', 'E', 'é', etc.
let containElike = projects.filter("name CONTAINS[cd] 'e'")
print("Projects that contain 'e', 'E', 'é', etc.: \(containElike.count)")
