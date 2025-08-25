let taskAssigneeInAliOrJamie = tasks.where {
    let assigneeNames = ["Ali", "Jamie"]
    return $0.assignee.in(assigneeNames)
}
print("Tasks IN Ali or Jamie: \(taskAssigneeInAliOrJamie.count)")
