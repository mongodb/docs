var result = restaurantsCollection.Aggregate()
    .Search(Builders<Restaurant>.Search.EmbeddedDocument(
        r => r.Grades,
        Builders<GradeEntry>.Search.Equals(g => g.Grade, "A")
    ), indexName: "restaurantsembedded").ToList();
