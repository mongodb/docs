MongoCollection<Document> stocks = db.getCollection("stocks");

stocks.insertMany(
        Arrays.asList(
                new Document("ticker", "MDB")
                        .append("date", Date.from(Instant.parse("2021-12-18T15:59:00Z")))
                        .append("close", 252.47)
                        .append("volume", 55046.0),

                new Document("ticker", "MDB")
                        .append("date", Date.from(Instant.parse("2021-12-18T15:58:00Z")))
                        .append("close", 252.93)
                        .append("volume", 44042.0),

                new Document("ticker", "MDB")
                        .append("date", Date.from(Instant.parse("2021-12-18T15:57:00Z")))
                        .append("close", 253.61)
                        .append("volume", 40182.0),

                new Document("ticker", "MDB")
                        .append("date", Date.from(Instant.parse("2021-12-18T15:56:00Z")))
                        .append("close", 253.63)
                        .append("volume", 27890.0),

                new Document("ticker", "MDB")
                        .append("date", Date.from(Instant.parse("2021-12-18T15:55:00Z")))
                        .append("close", 254.03)
                        .append("volume", 40270.0)
        )
);
