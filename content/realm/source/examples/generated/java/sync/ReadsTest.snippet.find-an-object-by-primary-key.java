ProjectTask task = realm.where(ProjectTask.class).equalTo("_id", PRIMARY_KEY_VALUE.get()).findFirst();
Log.v("EXAMPLE", "Fetched object by primary key: " + task);
