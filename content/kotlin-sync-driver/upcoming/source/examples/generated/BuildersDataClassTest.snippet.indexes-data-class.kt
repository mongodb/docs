val ascendingIdx = Indexes.ascending(Student::name)
val descendingIdx = Indexes.descending(Student::teachers)

val ascIdxName = collection.createIndex(ascendingIdx)
val descIdxName = collection.createIndex(descendingIdx)
