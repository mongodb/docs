// Filter Tasks through the User's backlink property
// using `@links.<ObjectType>.<PropertyName>` syntax
final jarjarsIncompleteTasks = realm.query<Task>(
    "ALL @links.User.tasks.username == 'jarjar_binks' AND isComplete == false");

final tasksForHan =
    realm.query<Task>("ALL @links.User.tasks.username == 'han'");
