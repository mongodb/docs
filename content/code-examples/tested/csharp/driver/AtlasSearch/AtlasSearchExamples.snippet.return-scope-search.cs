var result = restaurantsCollection.Aggregate()
    .Search(
        Builders<Restaurant>.Search.Equals("grades.grade", "A"),
        r => r.Grades,
        new SearchOptions<Restaurant>
        {
            ReturnStoredSource = true,
            IndexName = "restaurantsembedded"
        })
    .ToList();
