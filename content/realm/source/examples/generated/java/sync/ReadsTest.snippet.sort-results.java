RealmQuery<Project> projectsQuery = realm.where(Project.class);
RealmResults<Project> results = projectsQuery.sort("name", Sort.DESCENDING).findAll();
