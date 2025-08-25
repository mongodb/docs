// all tasks in the realm
val tasks : RealmResults<Task> = backgroundThreadRealm.where<Task>().findAll()
