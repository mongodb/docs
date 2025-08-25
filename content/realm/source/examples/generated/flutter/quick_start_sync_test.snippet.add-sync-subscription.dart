// Check if the subscription already exists before adding
final userTodoSub = realm.subscriptions.findByName('getUserTodos');
if (userTodoSub == null) {
  realm.subscriptions.update((mutableSubscriptions) {
    // server-side rules ensure user only downloads their own Todos
    mutableSubscriptions.add(realm.all<Todo>(), name: 'getUserTodos');
  });
}
