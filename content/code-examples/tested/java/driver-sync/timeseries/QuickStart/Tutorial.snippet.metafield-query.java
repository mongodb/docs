Document query = new Document("ticker", "MDB");

FindIterable<Document> metaFieldResults = stocks.find(query)
        .projection(new Document("_id", 0));

for  (Document document : metaFieldResults) {
    System.out.println(document.toJson());
}
