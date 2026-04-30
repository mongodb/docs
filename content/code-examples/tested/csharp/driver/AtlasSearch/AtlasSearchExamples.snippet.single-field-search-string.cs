FieldDefinition<Movie> runtimeField = fieldName;
var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Text(
        Builders<Movie>.SearchPath.Single(runtimeField), "secret agent"))
    .ToList();
