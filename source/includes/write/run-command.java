Document command = new Document("ping", 1);

Publisher<Document> commandPublisher = database.runCommand(command);
Document result = Mono.from(commandPublisher).block();
System.out.println(result);