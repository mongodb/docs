var result = moviesCollection.Aggregate()
    .SearchMeta(
        Builders<Movie>.Search.Facet(
            Builders<Movie>.Search.Range(m => m.Year, SearchRangeBuilder.Gte(2000)),
            Builders<Movie>.SearchFacet.String("genres", m => m.Genres, 100)),
        indexName: "moviesfacetsearch")
    .Single()
    .Facet["genres"].Buckets.Count();
