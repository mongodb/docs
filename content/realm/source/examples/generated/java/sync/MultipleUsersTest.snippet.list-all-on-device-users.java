Map<String, User> users = app.allUsers();
for (Map.Entry<String, User> user : users.entrySet()) {
    Log.v("EXAMPLE", "User: " + user.getKey());
}
