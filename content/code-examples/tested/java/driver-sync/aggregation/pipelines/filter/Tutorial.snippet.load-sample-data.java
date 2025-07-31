MongoDatabase aggDB = mongoClient.getDatabase("agg_tutorials_db");
MongoCollection<Document> persons = aggDB.getCollection("persons");

persons.insertMany(
        Arrays.asList(
                new Document("person_id", "6392529400")
                        .append("firstname", "Elise")
                        .append("lastname", "Smith")
                        .append("dateofbirth", LocalDateTime.parse("1972-01-13T09:32:07"))
                        .append("vocation", "ENGINEER")
                        .append("address", new Document("number", 5625)
                                .append("street", "Tipa Circle")
                                .append("city", "Wojzinmoj")),
                new Document("person_id", "1723338115")
                        .append("firstname", "Olive")
                        .append("lastname", "Ranieri")
                        .append("dateofbirth", LocalDateTime.parse("1985-05-12T23:14:30"))
                        .append("gender", "FEMALE")
                        .append("vocation", "ENGINEER")
                        .append("address", new Document("number", 9303)
                                .append("street", "Mele Circle")
                                .append("city", "Tobihbo")),
                new Document("person_id", "8732762874")
                        .append("firstname", "Toni")
                        .append("lastname", "Jones")
                        .append("dateofbirth", LocalDateTime.parse("1991-11-23T16:53:56"))
                        .append("vocation", "POLITICIAN")
                        .append("address", new Document("number", 1)
                                .append("street", "High Street")
                                .append("city", "Upper Abbeywoodington")),
                new Document("person_id", "7363629563")
                        .append("firstname", "Bert")
                        .append("lastname", "Gooding")
                        .append("dateofbirth", LocalDateTime.parse("1941-04-07T22:11:52"))
                        .append("vocation", "FLORIST")
                        .append("address", new Document("number", 13)
                                .append("street", "Upper Bold Road")
                                .append("city", "Redringtonville")),
                new Document("person_id", "1029648329")
                        .append("firstname", "Sophie")
                        .append("lastname", "Celements")
                        .append("dateofbirth", LocalDateTime.parse("1959-07-06T17:35:45"))
                        .append("vocation", "ENGINEER")
                        .append("address", new Document("number", 5)
                                .append("street", "Innings Close")
                                .append("city", "Basilbridge")),
                new Document("person_id", "7363626383")
                        .append("firstname", "Carl")
                        .append("lastname", "Simmons")
                        .append("dateofbirth", LocalDateTime.parse("1998-12-26T13:13:55"))
                        .append("vocation", "ENGINEER")
                        .append("address", new Document("number", 187)
                                .append("street", "Hillside Road")
                                .append("city", "Kenningford"))
        )
);
