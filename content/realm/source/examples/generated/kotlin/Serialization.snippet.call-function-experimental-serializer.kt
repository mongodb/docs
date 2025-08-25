// The `getMailingAddressForPerson` function takes a Person object and returns an Address object using the experimental serializer
val address = user.functions.call<Address>("getMailingAddressForPerson"){
    add(Person("Bob", "Smith"))
}

assertEquals(address.street, "123 Any Street")
