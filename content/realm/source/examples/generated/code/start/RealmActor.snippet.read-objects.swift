let actor = try await RealmActor()

// Read objects in functions isolated to the actor and pass primitive values to the caller
func getObjectId(in actor: isolated RealmActor, forTodoNamed name: String) async -> ObjectId {
    let todo = actor.realm.objects(Todo.self).where {
        $0.name == name
    }.first!
    return todo._id
}
let objectId = await getObjectId(in: actor, forTodoNamed: "Keep it safe")
