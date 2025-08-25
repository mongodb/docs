let mutateScope = events.beginScope(activity: "mutate object with completion")
// Write event
try! realm.write {
    // Add a userId
    person.userId = "tony.stark@starkindustries.com"
}
mutateScope.commit(completion: { error in
    if let error = error {
        print("Error recording write event: \(error.localizedDescription)")
        return
    }
    print("Successfully recorded a write event")
})
