moviesCollection.updateSearchIndex(
    "myIndex",
    Document("analyzer", "lucene.simple").append(
        "mappings",
        Document("dynamic", false)
            .append(
                "fields",
                Document(
                    "title",
                    Document("type", "string")
                )
            )
    )
)
