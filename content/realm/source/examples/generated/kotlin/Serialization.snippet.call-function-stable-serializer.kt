// The `getMailingAddress` function takes a first name and last name and returns an address as a BsonDocument
val address = user.functions.call<BsonDocument>("getMailingAddress", "Bob", "Smith")

assertEquals(address["street"], BsonString("123 Any Street"))
