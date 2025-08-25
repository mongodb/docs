val deleteResponse = user.functions
    .call<BsonDocument>("deleteCustomUserData")
