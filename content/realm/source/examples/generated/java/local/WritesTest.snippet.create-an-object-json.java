// Insert from a string
realm.executeTransaction(new Realm.Transaction() {
    @Override
    public void execute(Realm realm) {
        realm.createObjectFromJson(Frog.class,
                "{ name: \"Doctor Cucumber\", age: 1, species: \"bullfrog\", owner: \"Wirt\" }");
    }
});

// Insert multiple items using an InputStream
realm.executeTransaction(new Realm.Transaction() {
    @Override
    public void execute(Realm realm) {
        try {
            InputStream inputStream = new FileInputStream(
                    new File("path_to_file"));
            realm.createAllFromJson(Frog.class, inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
});
