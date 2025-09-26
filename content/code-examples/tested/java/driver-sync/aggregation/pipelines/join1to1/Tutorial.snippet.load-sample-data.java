MongoDatabase aggDB = mongoClient.getDatabase("agg_tutorials_db");
MongoCollection<Document> orders = aggDB.getCollection("orders");
MongoCollection<Document> products = aggDB.getCollection("products");

orders.insertMany(
        Arrays.asList(
                new Document("customer_id", "elise_smith@myemail.com")
                        .append("orderdate", LocalDateTime.parse("2020-05-30T08:35:52"))
                        .append("product_id", "a1b2c3d4")
                        .append("value", 431.43),
                new Document("customer_id", "tj@wheresmyemail.com")
                        .append("orderdate", LocalDateTime.parse("2019-05-28T19:13:32"))
                        .append("product_id", "z9y8x7w6")
                        .append("value", 5.01),
                new Document("customer_id", "oranieri@warmmail.com")
                        .append("orderdate", LocalDateTime.parse("2020-01-01T08:25:37"))
                        .append("product_id", "ff11gg22hh33")
                        .append("value", 63.13),
                new Document("customer_id", "jjones@tepidmail.com")
                        .append("orderdate", LocalDateTime.parse("2020-12-26T08:55:46"))
                        .append("product_id", "a1b2c3d4")
                        .append("value", 429.65)
        )
);

products.insertMany(
        Arrays.asList(
                new Document("id", "a1b2c3d4")
                        .append("name", "Asus Laptop")
                        .append("category", "ELECTRONICS")
                        .append("description", "Good value laptop for students"),
                new Document("id", "z9y8x7w6")
                        .append("name", "The Day Of The Triffids")
                        .append("category", "BOOKS")
                        .append("description", "Classic post-apocalyptic novel"),
                new Document("id", "ff11gg22hh33")
                        .append("name", "Morphy Richardds Food Mixer")
                        .append("category", "KITCHENWARE")
                        .append("description", "Luxury mixer turning good cakes into great"),
                new Document("id", "pqr678st")
                        .append("name", "Karcher Hose Set")
                        .append("category", "GARDEN")
                        .append("description", "Hose + nozzles + winder for tidy storage")
        )
);
