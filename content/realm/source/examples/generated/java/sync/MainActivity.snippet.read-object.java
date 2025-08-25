// all tasks in the realm
RealmResults<Task> tasks = backgroundThreadRealm.where(Task.class).findAll();
