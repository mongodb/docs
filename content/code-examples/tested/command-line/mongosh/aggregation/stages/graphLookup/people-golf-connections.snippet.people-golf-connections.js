db.people.aggregate( [
  { $match: { "name": "Tanya Jordan" } },
  { $graphLookup: {
      from: "people",
      startWith: "$friends",
      connectFromField: "friends",
      connectToField: "name",
      as: "golfers",
      restrictSearchWithMatch: { "hobbies": "golf" }
    }
  },
  { $project: {
      "name": 1,
      "friends": 1,
      "connections who play golf": "$golfers.name"
    }
  }
] )
