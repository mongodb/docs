val projectsQuery = realm.where(Project::class.java)
val results = projectsQuery.sort("name", Sort.DESCENDING).findAll()
