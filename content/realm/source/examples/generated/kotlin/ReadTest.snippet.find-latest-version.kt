// Open a write transaction to access the MutableRealm
realm.write {  // this: MutableRealm
    for (frog in frozenFrogs) {
        // Call 'findLatest()' on an earlier query's frozen results
        // to return the latest live objects that you can modify
        // within the current write transaction
        findLatest(frog)?.also { liveFrog ->  
            copyToRealm(liveFrog.apply { age += 1 })
            println(liveFrog.name + " is now " + liveFrog.age + " years old")
        }
    }
}
