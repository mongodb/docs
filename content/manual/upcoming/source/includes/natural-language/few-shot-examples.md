Include one to three examples of natural language queries and their corresponding mongosh queries. Examples that resemble your query give the model a pattern to follow.

**Example 1**

Natural language query: Show me the genres and runtime of 10 movies from 2015 that have the most comments

mongosh:

```sh
db.movies.aggregate([
  { $match: { year: 2015 } },
  { $sort: { num_mflix_comments: -1 } },
  { $limit: 10 },
  { $project: { _id: 0, genres: 1, runtime: 1 } },
]);
```

**Example 2**

Natural language query: List the titles and release years of 5 sci-fi movies from 2010

mongosh:

```sh
db.movies.find(
  { year: 2010, genres: "Sci-Fi" },
  { title: 1, year: 1, _id: 0 }
).limit(5);
```

**Example 3**

Natural language query: Which movies were released between 1990 and 2000, newest first?

mongosh:

```sh
db.movies.find({ year: { $gte: 1990, $lte: 2000 } }).sort({ year: -1 });
```
