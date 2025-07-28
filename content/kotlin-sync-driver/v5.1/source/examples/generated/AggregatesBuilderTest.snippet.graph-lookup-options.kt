Aggregates.graphLookup(
    "contacts",
    "\$${Users::friends.name}", Users::friends.name, Users::name.name, "socialNetwork",
    GraphLookupOptions().maxDepth(1).restrictSearchWithMatch(
        Filters.eq(Users::hobbies.name, "golf")
    )
)
