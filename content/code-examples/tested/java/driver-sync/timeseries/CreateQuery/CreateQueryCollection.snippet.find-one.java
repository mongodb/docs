Date target = Date.from(Instant.parse("2021-11-19T18:00:00Z"));

FindIterable<Document> findResults = weather.find(new Document("time", target))
        .projection(new Document("_id", 0));
