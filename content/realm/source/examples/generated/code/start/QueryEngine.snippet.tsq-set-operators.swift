let projectsWithGivenLabels = projects.where {
    $0.tasks.labels.containsAny(in: ["quick win", "bug"])
}
print("Projects with quick wins: \(projectsWithGivenLabels.count)")

let projectsWithRatingsOver3 = projects.where {
    $0.tasks.ratings > 3
}
print("Projects with any ratings over 3: \(projectsWithRatingsOver3.count)")
