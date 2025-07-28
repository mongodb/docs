val lastName = current().getString("lastName")
val employeeID = current().getString("employeeID")

listOf(
    Aggregates.project(
        Projections.fields(
            Projections.computed("username", lastName
                .append(employeeID)
                .toLower())
)))
