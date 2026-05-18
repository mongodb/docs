var result = restaurantsCollection.Aggregate()
    .Search(
        Builders<Restaurant>.Search.EmbeddedDocument<Restaurant>(
            "grades",
            Builders<Restaurant>.Search.Compound()
                .Must(
                    Builders<Restaurant>.Search.HasRoot(
                        Builders<Restaurant>.Search.Equals(r => r.Borough, "Manhattan")),
                    Builders<Restaurant>.Search.Equals("grade", "A"))),
        new SearchOptions<Restaurant>
        {
            IndexName = "restaurantsembedded"
        })
    .ToList();
