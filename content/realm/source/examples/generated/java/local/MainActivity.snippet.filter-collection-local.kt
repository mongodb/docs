// you can also filter a collection
val tasksThatBeginWithN : List<Task> = tasks.where().beginsWith("name", "N").findAll()
val openTasks : List<Task> = tasks.where().equalTo("status", TaskStatus.Open.name).findAll()
