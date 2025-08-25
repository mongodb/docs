val tasksQuery = realm.where(ProjectTask::class.java)
Log.i("EXAMPLE", "Ali has completed " +
            tasksQuery.equalTo("assignee", "Ali").and()
                .equalTo("isComplete", true).findAll().size + " tasks.")
