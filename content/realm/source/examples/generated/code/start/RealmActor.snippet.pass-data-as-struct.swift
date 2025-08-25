struct TodoStruct {
    var id: ObjectId
    var name, owner, status: String
}

func getTodoAsStruct(forTodoNamed name: String) -> TodoStruct {
    let todo = realm.objects(Todo.self).where {
        $0.name == name
    }.first!
    return TodoStruct(id: todo._id, name: todo.name, owner: todo.owner, status: todo.status)
}
