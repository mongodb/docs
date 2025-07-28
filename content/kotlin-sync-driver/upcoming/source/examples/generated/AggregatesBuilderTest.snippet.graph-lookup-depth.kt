Aggregates.graphLookup(
    "contacts",
    "\$${Users::friends.name}", Users::friends.name, Users::name.name,
    "socialNetwork",
    GraphLookupOptions().maxDepth(2).depthField("degrees")
)
