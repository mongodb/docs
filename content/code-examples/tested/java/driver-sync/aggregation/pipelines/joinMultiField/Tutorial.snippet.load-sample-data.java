MongoDatabase aggDB = mongoClient.getDatabase("agg_tutorials_db");
MongoCollection<Document> products = aggDB.getCollection("products");
MongoCollection<Document> orders = aggDB.getCollection("orders");

products.insertMany(
        Arrays.asList(
                new Document("name", "Asus Laptop")
                        .append("variation", "Ultra HD")
                        .append("category", "ELECTRONICS")
                        .append("description", "Great for watching movies"),

                new Document("name", "Asus Laptop")
                        .append("variation", "Standard Display")
                        .append("category", "ELECTRONICS")
                        .append("description", "Good value laptop for students"),

                new Document("name", "The Day Of The Triffids")
                        .append("variation", "1st Edition")
                        .append("category", "BOOKS")
                        .append("description", "Classic post-apocalyptic novel"),

                new Document("name", "The Day Of The Triffids")
                        .append("variation", "2nd Edition")
                        .append("category", "BOOKS")
                        .append("description", "Classic post-apocalyptic novel"),

                new Document("name", "Morphy Richards Food Mixer")
                        .append("variation", "Deluxe")
                        .append("category", "KITCHENWARE")
                        .append("description", "Luxury mixer turning good cakes into great")
        )
);

orders.insertMany(
        Arrays.asList(
                new Document("customer_id", "elise_smith@myemail.com")
                        .append("orderdate", LocalDateTime.parse("2020-05-30T08:35:52"))
                        .append("product_name", "Asus Laptop")
                        .append("product_variation", "Standard Display")
                        .append("value", 431.43),

                new Document("customer_id", "tj@wheresmyemail.com")
                        .append("orderdate", LocalDateTime.parse("2019-05-28T19:13:32"))
                        .append("product_name", "The Day Of The Triffids")
                        .append("product_variation", "2nd Edition")
                        .append("value", 5.01),

                new Document("customer_id", "oranieri@warmmail.com")
                        .append("orderdate", LocalDateTime.parse("2020-01-01T08:25:37"))
                        .append("product_name", "Morphy Richards Food Mixer")
                        .append("product_variation", "Deluxe")
                        .append("value", 63.13),

                new Document("customer_id", "jjones@tepidmail.com")
                        .append("orderdate", LocalDateTime.parse("2020-12-26T08:55:46"))
                        .append("product_name", "Asus Laptop")
                        .append("product_variation", "Standard Display")
                        .append("value", 429.65)
        )
);
