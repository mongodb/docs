MongoDatabase aggDB = mongoClient.getDatabase("agg_tutorials_db");
MongoCollection<Document> orders = aggDB.getCollection("orders");

orders.insertMany(
        Arrays.asList(
                new Document("customer_id", "elise_smith@myemail.com")
                        .append("orderdate", LocalDateTime.parse("2020-05-30T08:35:52"))
                        .append("value", 231),
                new Document("customer_id", "elise_smith@myemail.com")
                        .append("orderdate", LocalDateTime.parse("2020-01-13T09:32:07"))
                        .append("value", 99),
                new Document("customer_id", "oranieri@warmmail.com")
                        .append("orderdate", LocalDateTime.parse("2020-01-01T08:25:37"))
                        .append("value", 63),
                new Document("customer_id", "tj@wheresmyemail.com")
                        .append("orderdate", LocalDateTime.parse("2019-05-28T19:13:32"))
                        .append("value", 2),
                new Document("customer_id", "tj@wheresmyemail.com")
                        .append("orderdate", LocalDateTime.parse("2020-11-23T22:56:53"))
                        .append("value", 187),
                new Document("customer_id", "tj@wheresmyemail.com")
                        .append("orderdate", LocalDateTime.parse("2020-08-18T23:04:48"))
                        .append("value", 4),
                new Document("customer_id", "elise_smith@myemail.com")
                        .append("orderdate", LocalDateTime.parse("2020-12-26T08:55:46"))
                        .append("value", 4),
                new Document("customer_id", "tj@wheresmyemail.com")
                        .append("orderdate", LocalDateTime.parse("2021-02-28T07:49:32"))
                        .append("value", 1024),
                new Document("customer_id", "elise_smith@myemail.com")
                        .append("orderdate", LocalDateTime.parse("2020-10-03T13:49:44"))
                        .append("value", 102)
        )
);
