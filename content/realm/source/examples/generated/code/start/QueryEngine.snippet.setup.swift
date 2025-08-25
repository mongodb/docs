let realm = try! Realm()
try! realm.write {
    // Add tasks and projects here.
    let project = Project()
    project.name = "New Project"
    let task = Task()
    task.assignee = "Alex"
    task.priority = 5
    project.tasks.append(task)
    realm.add(project)
    // ...
}
let tasks = realm.objects(Task.self)
let projects = realm.objects(Project.self)
