var petunia = await plantsCollection.FindOneAsync(
   new { name = "Petunia" },
   null);
