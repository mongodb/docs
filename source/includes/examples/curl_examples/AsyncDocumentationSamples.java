/*
 * Copyright 2017 MongoDB, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import com.mongodb.Block;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.mongodb.reactivestreams.client.DatabaseTestCase;
import com.mongodb.reactivestreams.client.FindPublisher;
import com.mongodb.reactivestreams.client.Success;
import org.bson.BsonType;
import org.bson.Document;
import org.junit.Test;
import org.reactivestreams.Publisher;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import static com.mongodb.reactivestreams.client.Fixture.ObservableSubscriber;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assume.assumeTrue;

// imports required for filters, projections and updates
import static com.mongodb.client.model.Filters.all;
import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.elemMatch;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.exists;
import static com.mongodb.client.model.Filters.gt;
import static com.mongodb.client.model.Filters.in;
import static com.mongodb.client.model.Filters.lt;
import static com.mongodb.client.model.Filters.lte;
import static com.mongodb.client.model.Filters.or;
import static com.mongodb.client.model.Filters.regex;
import static com.mongodb.client.model.Filters.size;
import static com.mongodb.client.model.Filters.type;
import static com.mongodb.client.model.Projections.exclude;
import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import static com.mongodb.client.model.Projections.slice;
import static com.mongodb.client.model.Updates.combine;
import static com.mongodb.client.model.Updates.currentDate;
import static com.mongodb.client.model.Updates.set;
// end required filters, projections and updates imports


public final class DocumentationSamples extends DatabaseTestCase {

    @Test
    public void testInsert() throws Throwable {

        // Start Example 1
        Document canvas = new Document("item", "canvas")
                .append("qty", 100)
                .append("tags", singletonList("cotton"));

        Document size = new Document("h", 28)
                .append("w", 35.5)
                .append("uom", "cm");
        canvas.put("size", size);

        Publisher<Success> insertOnePublisher = collection.insertOne(canvas);
        // End Example 1

        assertSuccess(insertOnePublisher);

        // Start Example 2
        FindPublisher<Document> findPublisher = collection.find(eq("item", "canvas"));
        // End Example 2

        assertSize(findPublisher, 1);

        // Start Example 3
        Document journal = new Document("item", "journal")
                .append("qty", 25)
                .append("tags", asList("blank", "red"));

        Document journalSize = new Document("h", 14)
                .append("w", 21)
                .append("uom", "cm");
        journal.put("size", journalSize);

        Document mat = new Document("item", "mat")
                .append("qty", 85)
                .append("tags", singletonList("gray"));

        Document matSize = new Document("h", 27.9)
                .append("w", 35.5)
                .append("uom", "cm");
        mat.put("size", matSize);

        Document mousePad = new Document("item", "mousePad")
                .append("qty", 25)
                .append("tags", asList("gel", "blue"));

        Document mousePadSize = new Document("h", 19)
                .append("w", 22.85)
                .append("uom", "cm");
        mousePad.put("size", mousePadSize);

        Publisher<Success> insertManyPublisher = collection.insertMany(asList(journal, mat, mousePad));
        // End Example 3

        assertSuccess(insertManyPublisher);
        assertSize(collection.find(), 4);
    }

    @Test
    public void testQueryingAtTheTopLevel() throws Throwable {
        // Start Example 6
        Publisher<Success> insertManyPublisher = collection.insertMany(asList(
                Document.parse("{ item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' }"),
                Document.parse("{ item: 'notebook', qty: 50, size: { h: 8.5, w: 11, uom: 'in' }, status: 'A' }"),
                Document.parse("{ item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' }"),
                Document.parse("{ item: 'planner', qty: 75, size: { h: 22.85, w: 30, uom: 'cm' }, status: 'D' }"),
                Document.parse("{ item: 'postcard', qty: 45, size: { h: 10, w: 15.25, uom: 'cm' }, status: 'A' }")
        ));
        // End Example 6

        assertSuccess(insertManyPublisher);
        assertSize(collection.find(), 5);

        // Start Example 7
        FindPublisher<Document> findPublisher = collection.find(new Document());
        // End Example 7

        assertSize(findPublisher, 5);

        // Start Example 8
        findPublisher = collection.find();
        // End Example 8

        assertSize(findPublisher, 5);

        // Start Example 9
        findPublisher = collection.find(eq("status", "D"));
        // End Example 9

        assertSize(findPublisher, 2);

        // Start Example 10
        findPublisher = collection.find(in("status", "A", "D"));
        // End Example 10

        assertSize(findPublisher, 5);

        // Start Example 11
        findPublisher = collection.find(and(eq("status", "A"), lt("qty", 30)));
        // End Example 11

        assertSize(findPublisher, 1);

        // Start Example 12
        findPublisher = collection.find(or(eq("status", "A"), lt("qty", 30)));
        // End Example 12

        assertSize(findPublisher, 3);

        // Start Example 13
        findPublisher = collection.find(
                and(eq("status", "A"),
                        or(lt("qty", 30), regex("item", "^p")))
        );
        // End Example 13

        assertSize(findPublisher, 2);
    }

    @Test
    public void testQueryingEmbeddedDocuments() throws Throwable {
        // Start Example 14
        Publisher<Success> insertManyPublisher = collection.insertMany(asList(
                Document.parse("{ item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' }"),
                Document.parse("{ item: 'notebook', qty: 50, size: { h: 8.5, w: 11, uom: 'in' }, status: 'A' }"),
                Document.parse("{ item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' }"),
                Document.parse("{ item: 'planner', qty: 75, size: { h: 22.85, w: 30, uom: 'cm' }, status: 'D' }"),
                Document.parse("{ item: 'postcard', qty: 45, size: { h: 10, w: 15.25, uom: 'cm' }, status: 'A' }")
        ));
        // End Example 14

        assertSuccess(insertManyPublisher);
        assertSize(collection.find(), 5);

        // Start Example 15
        FindPublisher<Document> findPublisher = collection.find(eq("size", Document.parse("{ h: 14, w: 21, uom: 'cm' }")));
        // End Example 15

        assertSize(findPublisher, 1);

        // Start Example 16
        findPublisher = collection.find(eq("size", Document.parse("{ w: 21, h: 14, uom: 'cm' }")));
        // End Example 16

        assertSize(findPublisher, 0);

        // Start Example 17
        findPublisher = collection.find(eq("size.uom", "in"));
        // End Example 17

        assertSize(findPublisher, 2);

        // Start Example 18
        findPublisher = collection.find(lt("size.h", 15));
        // End Example 18

        assertSize(findPublisher, 4);

        // Start Example 19
        findPublisher = collection.find(and(
                lt("size.h", 15),
                eq("size.uom", "in"),
                eq("status", "D")
        ));
        // End Example 19

        assertSize(findPublisher, 1);
    }

    @Test
    public void testQueryingArrayValues() throws Throwable {

        //Start Example 20
        Publisher<Success> insertManyPublisher = collection.insertMany(asList(
                Document.parse("{ item: 'journal', qty: 25, tags: ['blank', 'red'], dim_cm: [ 14, 21 ] }"),
                Document.parse("{ item: 'notebook', qty: 50, tags: ['red', 'blank'], dim_cm: [ 14, 21 ] }"),
                Document.parse("{ item: 'paper', qty: 100, tags: ['red', 'blank', 'plain'], dim_cm: [ 14, 21 ] }"),
                Document.parse("{ item: 'planner', qty: 75, tags: ['blank', 'red'], dim_cm: [ 22.85, 30 ] }"),
                Document.parse("{ item: 'postcard', qty: 45, tags: ['blue'], dim_cm: [ 10, 15.25 ] }")
        ));
        // End Example 20

        assertSuccess(insertManyPublisher);
        assertSize(collection.find(), 5);

        //Start Example 21
        FindPublisher<Document> findPublisher = collection.find(eq("tags", asList("red", "blank")));
        //End Example 21

        assertSize(findPublisher, 1);

        //Start Example 22
        findPublisher = collection.find(all("tags", asList("red", "blank")));
        //End Example 22

        assertSize(findPublisher, 4);

        //Start Example 23
        findPublisher = collection.find(eq("tags", "red"));
        //End Example 23

        assertSize(findPublisher, 4);

        //Start Example 24
        findPublisher = collection.find(gt("dim_cm", 25));
        //End Example 24

        assertSize(findPublisher, 1);

        //Start Example 25
        findPublisher = collection.find(and(gt("dim_cm", 15), lt("dim_cm", 20)));
        //End Example 25

        assertSize(findPublisher, 4);

        //Start Example 26
        findPublisher = collection.find(elemMatch("dim_cm", Document.parse("{ $gt: 22, $lt: 30 }")));
        //End Example 26

        assertSize(findPublisher, 1);

        //Start Example 27
        findPublisher = collection.find(gt("dim_cm.1", 25));
        //End Example 27

        assertSize(findPublisher, 1);

        //Start Example 28
        findPublisher = collection.find(size("tags", 3));
        //End Example 28

        assertSize(findPublisher, 1);
    }

    @Test
    public void testQueryingArraysContainingDocuments() throws Throwable {

        //Start Example 29
        Publisher<Success> insertManyPublisher = collection.insertMany(asList(
                Document.parse("{ item: 'journal', instock: [ { warehouse: 'A', qty: 5 }, { warehouse: 'C', qty: 15 } ] }"),
                Document.parse("{ item: 'notebook', instock: [ { warehouse: 'C', qty: 5 } ] }"),
                Document.parse("{ item: 'paper', instock: [ { warehouse: 'A', qty: 60 }, { warehouse: 'B', qty: 15 } ] }"),
                Document.parse("{ item: 'planner', instock: [ { warehouse: 'A', qty: 40 }, { warehouse: 'B', qty: 5 } ] }"),
                Document.parse("{ item: 'postcard', instock: [ { warehouse: 'B', qty: 15 }, { warehouse: 'C', qty: 35 } ] }")
        ));
        // End Example 29

        assertSuccess(insertManyPublisher);
        assertSize(collection.find(), 5);

        //Start Example 30
        FindPublisher<Document> findPublisher = collection.find(eq("instock", Document.parse("{ warehouse: 'A', qty: 5 }")));
        //End Example 30

        assertSize(findPublisher, 1);

        //Start Example 31
        findPublisher = collection.find(eq("instock", Document.parse("{ qty: 5, warehouse: 'A' }")));
        //End Example 31

        assertSize(findPublisher, 0);

        //Start Example 32
        findPublisher = collection.find(lte("instock.0.qty", 20));
        //End Example 32

        assertSize(findPublisher, 3);

        //Start Example 33
        findPublisher = collection.find(lte("instock.qty", 20));
        //End Example 33

        assertSize(findPublisher, 5);

        //Start Example 34
        findPublisher = collection.find(elemMatch("instock", Document.parse("{ qty: 5, warehouse: 'A' }")));
        //End Example 34

        assertSize(findPublisher, 1);

        //Start Example 35
        findPublisher = collection.find(elemMatch("instock", Document.parse("{ qty: { $gt: 10, $lte: 20 } }")));
        //End Example 35

        assertSize(findPublisher, 3);

        //Start Example 36
        findPublisher = collection.find(and(gt("instock.qty", 10), lte("instock.qty", 20)));
        //End Example 36

        assertSize(findPublisher, 4);

        //Start Example 37
        findPublisher = collection.find(and(eq("instock.qty", 5), eq("instock.warehouse", "A")));
        //End Example 37

        assertSize(findPublisher, 2);
    }

    @Test
    public void testQueryingNullandMissingFields() throws Throwable {

        //Start Example 38
        Publisher<Success> insertManyPublisher = collection.insertMany(asList(
                Document.parse("{'_id': 1, 'item': null}"),
                Document.parse("{'_id': 2}")
        ));
        // End Example 38

        assertSuccess(insertManyPublisher);
        assertSize(collection.find(), 2);

        //Start Example 39
        FindPublisher<Document> findPublisher = collection.find(eq("item", null));
        //End Example 39

        assertSize(findPublisher, 2);

        //Start Example 40
        findPublisher = collection.find(type("item", BsonType.NULL));
        //End Example 40

        assertSize(findPublisher, 1);

        //Start Example 41
        findPublisher = collection.find(exists("item", false));
        //End Example 41

        assertSize(findPublisher, 1);
    }

    @Test
    @SuppressWarnings("unchecked")
    public void testProjectingFields() throws Throwable {

        //Start Example 42
        Publisher<Success> insertManyPublisher = collection.insertMany(asList(
            Document.parse("{ item: 'journal', status: 'A', size: { h: 14, w: 21, uom: 'cm' }, instock: [ { warehouse: 'A', qty: 5 }]}"),
            Document.parse("{ item: 'notebook', status: 'A',  size: { h: 8.5, w: 11, uom: 'in' }, instock: [ { warehouse: 'C', qty: 5}]}"),
            Document.parse("{ item: 'paper', status: 'D', size: { h: 8.5, w: 11, uom: 'in' }, instock: [ { warehouse: 'A', qty: 60 }]}"),
            Document.parse("{ item: 'planner', status: 'D', size: { h: 22.85, w: 30, uom: 'cm' }, instock: [ { warehouse: 'A', qty: 40}]}"),
            Document.parse("{ item: 'postcard', status: 'A', size: { h: 10, w: 15.25, uom: 'cm' }, "
                    + "instock: [ { warehouse: 'B', qty: 15 }, { warehouse: 'C', qty: 35 } ] }")
        ));
        // End Example 42

        assertSuccess(insertManyPublisher);
        assertSize(collection.find(), 5);

        //Start Example 43
        FindPublisher<Document> findPublisher = collection.find(eq("status", "A"));
        //End Example 43

        assertSize(findPublisher, 3);

        //Start Example 44
        findPublisher = collection.find(eq("status", "A")).projection(include("item", "status"));
        //End Example 44

        assertAll(findPublisher, new Block<Document>() {
            @Override
            public void apply(final Document document) {
                assertEquals(new HashSet<String>(asList("_id", "item", "status")), document.keySet());
            }
        });

        //Start Example 45
        findPublisher = collection.find(eq("status", "A"))
                .projection(fields(include("item", "status"), excludeId()));
        //End Example 45

        assertAll(findPublisher, new Block<Document>() {
            @Override
            public void apply(final Document document) {
                assertEquals(new HashSet<String>(asList("item", "status")), document.keySet());
            }
        });

        //Start Example 46
        findPublisher = collection.find(eq("status", "A")).projection(exclude("item", "status"));
        //End Example 46

        assertAll(findPublisher, new Block<Document>() {
            @Override
            public void apply(final Document document) {
                assertEquals(new HashSet<String>(asList("_id", "size", "instock")), document.keySet());
            }
        });

        //Start Example 47
        findPublisher = collection.find(eq("status", "A")).projection(include("item", "status", "size.uom"));
        //End Example 47

        assertAll(findPublisher, new Block<Document>() {
            @Override
            public void apply(final Document document) {
                assertEquals(new HashSet<String>(asList("_id", "item", "status", "size")), document.keySet());
                assertEquals(new HashSet<String>(singletonList("uom")), document.get("size", Document.class).keySet());
            }
        });

        //Start Example 48
        findPublisher = collection.find(eq("status", "A")).projection(exclude("size.uom"));
        //End Example 48

        assertAll(findPublisher, new Block<Document>() {
            @Override
            public void apply(final Document document) {
                assertEquals(new HashSet<String>(asList("_id", "item", "instock", "status", "size")), document.keySet());
                assertEquals(new HashSet<String>(asList("h", "w")), document.get("size", Document.class).keySet());
            }
        });

        //Start Example 49
        findPublisher = collection.find(eq("status", "A")).projection(include("item", "status", "instock.qty"));
        //End Example 49

        assertAll(findPublisher, new Block<Document>() {
            @Override
            public void apply(final Document document) {
                assertEquals(new HashSet<String>(asList("_id", "item", "instock", "status")), document.keySet());

                List<Document> instock = (List<Document>) document.get("instock");
                for (Document stockDocument : instock) {
                    assertEquals(new HashSet<String>(singletonList("qty")), stockDocument.keySet());
                }
            }
        });

        //Start Example 50
        findPublisher = collection.find(eq("status", "A"))
                .projection(fields(include("item", "status"), slice("instock", -1)));
        //End Example 50

        assertAll(findPublisher, new Block<Document>() {
            @Override
            public void apply(final Document document) {
                assertEquals(new HashSet<String>(asList("_id", "item", "instock", "status")), document.keySet());

                List<Document> instock = (List<Document>) document.get("instock");
                assertEquals(1, instock.size());
            }
        });
    }

    @Test
    public void testUpdates() throws Throwable {
        assumeTrue(isTwoSixOrGreater());

        //Start Example 51
        Publisher<Success> insertManyPublisher = collection.insertMany(asList(
                Document.parse("{ item: 'canvas', qty: 100, size: { h: 28, w: 35.5, uom: 'cm' }, status: 'A' }"),
                Document.parse("{ item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' }"),
                Document.parse("{ item: 'mat', qty: 85, size: { h: 27.9, w: 35.5, uom: 'cm' }, status: 'A' }"),
                Document.parse("{ item: 'mousepad', qty: 25, size: { h: 19, w: 22.85, uom: 'cm' }, status: 'P' }"),
                Document.parse("{ item: 'notebook', qty: 50, size: { h: 8.5, w: 11, uom: 'in' }, status: 'P' }"),
                Document.parse("{ item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' }"),
                Document.parse("{ item: 'planner', qty: 75, size: { h: 22.85, w: 30, uom: 'cm' }, status: 'D' }"),
                Document.parse("{ item: 'postcard', qty: 45, size: { h: 10, w: 15.25, uom: 'cm' }, status: 'A' }"),
                Document.parse("{ item: 'sketchbook', qty: 80, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' }"),
                Document.parse("{ item: 'sketch pad', qty: 95, size: { h: 22.85, w: 30.5, uom: 'cm' }, status: 'A' }")
        ));
        // End Example 51

        assertSuccess(insertManyPublisher);
        assertSize(collection.find(), 10);

        //Start Example 52
        Publisher<UpdateResult> updateOnePublisher = collection.updateOne(eq("item", "paper"),
                combine(set("size.uom", "cm"), set("status", "P"), currentDate("lastModified")));
        //End Example 52

        assertSuccess(updateOnePublisher);
        assertAll(collection.find(eq("item", "paper")), new Block<Document>() {
            @Override
            public void apply(final Document document) {
                assertEquals("cm", document.get("size", Document.class).getString("uom"));
                assertEquals("P", document.getString("status"));
                assertTrue(document.containsKey("lastModified"));
            }
        });

        //Start Example 53
        Publisher<UpdateResult> updateManyPublisher = collection.updateMany(lt("qty", 50),
                combine(set("size.uom", "in"), set("status", "P"), currentDate("lastModified")));
        //End Example 53

        assertSuccess(updateManyPublisher);
        assertAll(collection.find(lt("qty", 50)), new Block<Document>() {
            @Override
            public void apply(final Document document) {
                assertEquals("in", document.get("size", Document.class).getString("uom"));
                assertEquals("P", document.getString("status"));
                assertTrue(document.containsKey("lastModified"));
            }
        });

        //Start Example 54
        Publisher<UpdateResult> replaceOnePublisher = collection.replaceOne(eq("item", "paper"),
                Document.parse("{ item: 'paper', instock: [ { warehouse: 'A', qty: 60 }, { warehouse: 'B', qty: 40 } ] }"));
        //End Example 54

        assertSuccess(replaceOnePublisher);
        assertAll(collection.find(eq("item", "paper")).projection(excludeId()), new Block<Document>() {
            @Override
            public void apply(final Document document) {
                assertEquals(Document.parse("{ item: 'paper', instock: [ { warehouse: 'A', qty: 60 }, { warehouse: 'B', qty: 40 } ] }"),
                        document);
            }
        });
    }

    @Test
    public void testDeletions() throws Throwable {

        //Start Example 55
        Publisher<Success> insertManyPublisher = collection.insertMany(asList(
                Document.parse("{ item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' }"),
                Document.parse("{ item: 'notebook', qty: 50, size: { h: 8.5, w: 11, uom: 'in' }, status: 'A' }"),
                Document.parse("{ item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' }"),
                Document.parse("{ item: 'planner', qty: 75, size: { h: 22.85, w: 30, uom: 'cm' }, status: 'D' }"),
                Document.parse("{ item: 'postcard', qty: 45, size: { h: 10, w: 15.25, uom: 'cm' }, status: 'A' }")
        ));
        // End Example 55

        assertSuccess(insertManyPublisher);
        assertSize(collection.find(), 5);


        //Start Example 56
        Publisher<DeleteResult> deleteManyPublisher = collection.deleteMany(new Document());
        //End Example 56

        assertSuccess(deleteManyPublisher);
        assertSize(collection.find(), 0);

        assertSuccess(insertManyPublisher);

        //Start Example 57
        deleteManyPublisher = collection.deleteMany(eq("status", "A"));
        //End Example 57

        assertSuccess(deleteManyPublisher);
        assertSize(collection.find(), 2);

        //Start Example 58
        Publisher<DeleteResult> deleteOnePublisher = collection.deleteOne(eq("status", "D"));
        //End Example 58

        assertSuccess(deleteOnePublisher);
        assertSize(collection.find(), 1);
    }

    private <T> void assertSize(final Publisher<T> publisher, final long size) throws Throwable {
        ObservableSubscriber<T> sub = new ObservableSubscriber<T>();
        publisher.subscribe(sub);
        assertEquals(size, sub.get(10, SECONDS).size());
    }

    private <T> void assertSuccess(final Publisher<T> publisher) throws Throwable {
        ObservableSubscriber<T> sub = new ObservableSubscriber<T>();
        publisher.subscribe(sub);
        sub.get(10, SECONDS);
    }

    private <T> void assertAll(final Publisher<T> publisher, final Block<T> block) throws Throwable {
        ObservableSubscriber<T> sub = new ObservableSubscriber<T>();
        publisher.subscribe(sub);
        for (T item : sub.get(10, SECONDS)) {
            block.apply(item);
        }
    }

    private boolean isTwoSixOrGreater() {
        boolean isGreater = false;

        ObservableSubscriber<Document> sub = new ObservableSubscriber<Document>();
        Publisher<Document> publisher = client.getDatabase("admin").runCommand(new Document().append("buildInfo", 1));
        publisher.subscribe(sub);

        try {
            Document buildInfo = sub.get(10, SECONDS).get(0);
            List<Integer> versionArray = new ArrayList<Integer>();
            for (String part : buildInfo.getString("version").split("\\.")) {
                versionArray.add(Integer.parseInt(part));
            }
            if (versionArray.get(0) > 2) {
                isGreater = true;
            } else if (versionArray.get(0) == 2 && versionArray.get(1) >= 6) {
                isGreater = true;
            }
        } catch (Throwable throwable) {
            // ignore
        }
        return isGreater;
    }

}
