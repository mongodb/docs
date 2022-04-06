// insert code goes here
List<Document> documents = new ArrayList<>();

Document doc1 = new Document("Name", "Halley's Comet").append("OfficialName", "1P/Halley").append("OrbitalPeriod", 75).append("Radius", 3.4175).append("Mass", 2.2e14);
Document doc2 = new Document("Name", "Wild2").append("OfficialName", "81P/Wild").append("OrbitalPeriod", 6.41).append("Radius", 1.5534).append("Mass", 2.3e13);
Document doc3 = new Document("Name", "Comet Hyakutake").append("OfficialName", "C/1996 B2").append("OrbitalPeriod", 17000).append("Radius", 0.77671).append("Mass", 8.8e12);

documents.add(doc1);
documents.add(doc2);
documents.add(doc3);

InsertManyResult result = coll.insertMany(documents);
