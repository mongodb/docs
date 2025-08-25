var bsonValue = await
    user.Functions.CallAsync("sum", 2, 40);

// The result must now be cast to Int32:
var sum = bsonValue.ToInt32();

// Or use the generic overloads to avoid casting the BsonValue:
sum = await
   user.Functions.CallAsync<int>("sum", 2, 40);
