package com.mongodb.realm.examples.java;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.Student;
import com.mongodb.realm.examples.model.java.Teacher;

import org.junit.Test;

import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmQuery;
import io.realm.RealmResults;

public class FilterDataTest extends RealmTest {
    @Test
    public void testFilters() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);
            // :snippet-start: filters
            // Build the query looking at all teachers:
            RealmQuery<Teacher> query = realm.where(Teacher.class);

            // Add query conditions:
            query.equalTo("name", "Ms. Langtree");
            query.or().equalTo("name", "Mrs. Jacobs");

            // Execute the query:
            RealmResults<Teacher> result1 = query.findAll();

            // Or alternatively do the same all at once (the "Fluent interface"):
            RealmResults<Teacher> result2 = realm.where(Teacher.class)
                    .equalTo("name", "Ms. Langtree")
                    .or()
                    .equalTo("name", "Mrs. Jacobs")
                    .findAll();

            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testLinkQueries() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);
            // :snippet-start: link-queries
            // Find all teachers who have students with the names "Wirt" or "Greg"
            RealmResults<Teacher> result = realm.where(Teacher.class)
                    .equalTo("students.name", "Wirt")
                    .or()
                    .equalTo("students.name", "Greg")
                    .findAll();

            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testLinkQueriesInverse() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);
            // :snippet-start: link-queries-inverse
            // Find all students who have teachers with the names "Ms. Langtree" or "Mrs. Jacobs"
            RealmResults<Student> result = realm.where(Student.class)
                    .equalTo("teacher.name", "Ms. Langtree")
                    .or()
                    .equalTo("teacher.name", "Mrs. Jacobs")
                    .findAll();

            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testSort() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);
            // :snippet-start: sort
            // Find all students in year 7, and sort them by name
            RealmResults<Student> result = realm.where(Student.class)
                    .equalTo("year", 7)
                    .sort("name")
                    .findAll();

            // Alternatively, find all students in year 7
            RealmResults<Student> unsortedResult = realm.where(Student.class)
                    .equalTo("year", 7)
                    .findAll();
            // then sort the results set by name
            RealmResults<Student> sortedResult = unsortedResult.sort("name");
            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testLimit() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);
            // :snippet-start: limit
            // Find all students in year 8, and limit the results collection to 10 items
            RealmResults<Student> result = realm.where(Student.class)
                    .equalTo("year", 8)
                    .limit(10)
                    .findAll();
            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testUnique() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);
            // :snippet-start: unique
            // Find all students in year 9, and cap the result collection at 10 items
            RealmResults<Student> result = realm.where(Student.class)
                    .equalTo("year", 9)
                    .distinct("name")
                    .findAll();
            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testChainQueries() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);
            // :snippet-start: chain-queries
            // Find all students in year 9 and resolve the query into a results collection
            RealmResults<Student> result = realm.where(Student.class)
                    .equalTo("year", 9)
                    .findAll();

            // filter the students results again by teacher name
            RealmResults<Student> filteredResults = result.where().equalTo("teacher.name", "Ms. Langtree").findAll();
            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testRealmQueryLanguage() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);
            // :snippet-start: realm-query-language
            // Build a RealmQuery based on the Student type
            RealmQuery<Student> query = realm.where(Student.class);

            // Simple query
            RealmResults<Student> studentsNamedJane =
                    query.rawPredicate("name = 'Jane'").findAll();

            // Multiple predicates
            RealmResults<Student> studentsNamedJaneOrJohn =
                    query.rawPredicate("name = 'Jane' OR name = 'John'").findAll();

            // Collection queries
            RealmResults<Student> studentsWithTeachers =
                    query.rawPredicate("teacher.@count > 0").findAll();
            RealmResults<Student> studentsWithSeniorTeachers =
                    query.rawPredicate("ALL teacher.numYearsTeaching > 5").findAll();

            // Sub queries
            RealmResults<Student> studentsWithMathTeachersNamedSteven =
                    query.rawPredicate("SUBQUERY(teacher, $teacher, $teacher.subject = 'Mathematics' AND $teacher.name = 'Mr. Stevens').@count > 0").findAll();

            // Sort, Distinct, Limit
            RealmResults<Student> students =
                    query.rawPredicate("teacher.@count > 0 SORT(year ASCENDING) DISTINCT(name) LIMIT(5)").findAll();

            // Combine two raw predicates
            RealmResults<Student> studentsNamedJaneOrHenry =
                    query.rawPredicate("name = 'Jane'")
                            .rawPredicate("name = 'Henry'").findAll();

            // Combine raw predicate with type-safe predicate
            RealmResults<Student> studentsNamedJaneOrHenryAgain =
                    query.rawPredicate("name = 'Jane'")
                            .equalTo("name", "Henry").findAll();
            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }
}
