package com.mongodb.realm.realmkmmapp

import io.github.aakira.napier.DebugAntilog
import io.github.aakira.napier.Napier
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query

class Greeting {

    fun greeting(): String {
        Napier.base(DebugAntilog()) // initialize napier
        getDogsTest()
        return "Hello, ${Platform().platform}!"
    }

    // example from realm-kotlin repo -- sanity check
    fun getDogsTest(): String {
        val configuration = RealmConfiguration.create(schema = setOf(Person::class, Dog::class))
        val realm = Realm.open(configuration)

        // plain old kotlin object
        val person = Person().apply {
            name = "Carlo"
            dog = Dog().apply { name = "Fido"; age = 16 }
        }

        // persist it in a transaction
        realm.writeBlocking {
            val managedPerson = copyToRealm(person)
        }

        // All Persons
        val all = realm.query<Person>()

        // Person named 'Carlo'
        val filteredByName = realm.query<Person>().query("name = $0", "Carlo").find()

        // Person having a dog aged more than 7 with a name starting with 'Fi'
        val filteredByDog = realm.query<Person>().query("dog.age > $0 AND dog.name BEGINSWITH $1", 7, "Fi").find()

        // Find the first Person without a dog
        realm.query<Person>("dog == NULL LIMIT(1)")
            .first()
            .find()
            ?.also { personWithoutDog ->
                // Add a dog in a transaction
                realm.writeBlocking {
                    findLatest(personWithoutDog)?.dog = Dog().apply { name = "Laika"; age = 3 }
                }
            }

        // delete all Dogs
        realm.writeBlocking {
            query<Dog>().find().also { delete(it) }
        }

        return ""
    }
}