val projectsQuery = realm.where(Project::class.java)
// Pass Case.INSENSITIVE as the third argument for case insensitivity.
Log.i("EXAMPLE", "Projects that start with 'e': "
            + projectsQuery.beginsWith("name", "e", Case.INSENSITIVE).count())
Log.i("EXAMPLE", "Projects that contain 'ie': "
        + projectsQuery.contains("name", "ie").count())
