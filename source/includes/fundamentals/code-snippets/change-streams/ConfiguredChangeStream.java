package org.example;

import com.mongodb.client.ChangeStreamIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.changestream.FullDocument;
import com.mongodb.client.model.changestream.FullDocumentBeforeChange;
import org.bson.Document;

public class ConfiguredChangeStream extends Thread {
    private MongoCollection<Document> collection;
    private final FullDocument fullDocument;
    private final FullDocumentBeforeChange fullDocumentBeforeChange;
    private String name;

    public ConfiguredChangeStream(MongoCollection<Document> collection,
                                  FullDocument fullDocument,
                                  FullDocumentBeforeChange fullDocumentBeforeChange) {
        this.collection = collection;
        this.fullDocument = fullDocument;
        this.fullDocumentBeforeChange = fullDocumentBeforeChange;
        this.name = fullDocument != null ? fullDocument.name() : fullDocumentBeforeChange.name();
    }
    public void run() {
        ChangeStreamIterable<Document> changeStream = this.collection.watch();
                .fullDocumentBeforeChange(this.fullDocumentBeforeChange);

        String name = "UNNAMED";

        // limitation: only allow either fullDocument or fullDocumentBeforeChange setting
        if (fullDocument != null) {
            changeStream.fullDocument(fullDocument);
            name = fullDocument.name();
        } else if (fullDocumentBeforeChange != null) {
            changeStream.fullDocumentBeforeChange(fullDocumentBeforeChange);
            name = fullDocumentBeforeChange.name();
        }

        changeStream.forEach(event ->
                System.out.println(
                        "[" + this.name + "] " +
                                "\n  fullDocument: " + event.getFullDocument() +
                                "\n  fullDocumentBeforeChange: " + event.getFullDocumentBeforeChange() +
                                "\n  Complete event: " + event
                )
        );
    }
}
