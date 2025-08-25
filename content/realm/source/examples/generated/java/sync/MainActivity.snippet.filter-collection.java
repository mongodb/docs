// you can also filter a collection
RealmResults<Task> tasksThatBeginWithN = tasks.where().beginsWith("name", "N").findAll();
RealmResults<Task> openTasks = tasks.where().equalTo("status", TaskStatus.Open.name()).findAll();
