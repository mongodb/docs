// you can also filter a collection
RealmResults<Task> TasksThatBeginWithN = Tasks.where().beginsWith("name", "N").findAll();
RealmResults<Task> openTasks = Tasks.where().equalTo("status", TaskStatus.Open.name()).findAll();
