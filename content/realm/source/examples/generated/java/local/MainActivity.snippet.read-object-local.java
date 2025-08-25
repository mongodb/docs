// all Tasks in the realm
RealmResults<Task> Tasks = backgroundThreadRealm.where(Task.class).findAll();
