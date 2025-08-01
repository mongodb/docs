MongoDatabase aggDB = mongoClient.getDatabase("agg_tutorials_db");
MongoCollection<Document> orders = aggDB.getCollection("orders");
orders.insertMany(
        Arrays.asList(
                new Document("order_id", 6363763262239f)
                        .append("products", Arrays.asList(
                                new Document("prod_id", "abc12345")
                                        .append("name", "Asus Laptop")
                                        .append("price", 431),
                                new Document("prod_id", "def45678")
                                        .append("name", "Karcher Hose Set")
                                        .append("price", 22)
                        )),
                new Document("order_id", 1197372932325f)
                        .append("products", Collections.singletonList(
                                new Document("prod_id", "abc12345")
                                        .append("name", "Asus Laptop")
                                        .append("price", 429)
                        )),
                new Document("order_id", 9812343774839f)
                        .append("products", Arrays.asList(
                                new Document("prod_id", "pqr88223")
                                        .append("name", "Morphy Richards Food Mixer")
                                        .append("price", 431),
                                new Document("prod_id", "def45678")
                                        .append("name", "Karcher Hose Set")
                                        .append("price", 21)
                        )),
                new Document("order_id", 4433997244387f)
                        .append("products", Arrays.asList(
                                new Document("prod_id", "def45678")
                                        .append("name", "Karcher Hose Set")
                                        .append("price", 23),
                                new Document("prod_id", "jkl77336")
                                        .append("name", "Picky Pencil Sharpener")
                                        .append("price", 1),
                                new Document("prod_id", "xyz11228")
                                        .append("name", "Russell Hobbs Chrome Kettle")
                                        .append("price", 16)
                        ))
        )
);
