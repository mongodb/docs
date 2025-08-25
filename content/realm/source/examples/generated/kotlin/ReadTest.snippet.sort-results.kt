// Query for all frogs owned by Jim Henson, then:
// 1. Sort results by age in descending order
// 2. Limit results to only distinct names
// 3. Limit results to only the first 2 objects

val organizedWithMethods = realm.query<Frog>("owner == $0", "Jim Henson")
    .sort("age", Sort.DESCENDING)
    .distinct("name")
    .limit(2)
    .find()
organizedWithMethods.forEach { frog ->
    Log.v("Method sort: ${frog.name} is ${frog.age}")
}

val organizedWithRql = realm.query<Frog>()
    .query("owner == $0 SORT(age DESC) DISTINCT(name) LIMIT(2)", "Jim Henson") 
    .find()
organizedWithRql.forEach { frog ->
    Log.v("RQL sort: ${frog.name} is ${frog.age}")
}

val organizedWithBoth = realm.query<Frog>()
    .query("owner == $0 SORT(age DESC)", "Jim Henson")
    .distinct("name")
    .limit(2)
    .find()
organizedWithBoth.forEach { frog ->
    Log.v("Combined sort: ${frog.name} is ${frog.age}")
}
