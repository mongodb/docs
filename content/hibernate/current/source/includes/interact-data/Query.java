import org.hibernate.Transaction;

import java.util.List;

import org.hibernate.Session;

public class Query {
    public static void main(String[] args) {

        var sf = HibernateUtil.getSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransaction();

        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        // Retrieves all documents in the collection using a session
        // start-retrieve-all-session
        var allDocs = session.createQuery("select title from Movie", String.class)
                                   .getResultList();
        for (var t : allDocs) {
            System.out.println("Title: " + t);
        }
        // end-retrieve-all-session

        // Retrieves all documents in the collection using an entity manager
        // start-retrieve-all-em
        var allDocs = entityManager.createQuery("select m.title from Movie m", String.class)
                                   .getResultList();
        for (var t : allDocs) {
            System.out.println("Title: " + t);
        }
        // end-retrieve-all-em

        // Retrieves documents that have a "title" value of "Romeo and Juliet" using a session
        // start-retrieve-matching-session
        var matchingDocs = session.createQuery("from Movie where title = :t", Movie.class)
                                  .setParameter("t", "Romeo and Juliet")
                                  .getResultList();
        for (var m : matchingDocs) {
            System.out.println("Title: " + m.getTitle() + ", Year: " + m.getYear());
        }
        // end-retrieve-matching-session

        // Retrieves documents that have a "title" value of "Romeo and Juliet" using an entity manager
        // start-retrieve-matching-em
        var matchingDocs = entityManager.createQuery("select m from Movie m where m.title = :t", Movie.class)
                                        .setParameter("t", "Romeo and Juliet")
                                        .getResultList();
        for (var m : matchingDocs) {
            System.out.println("Title: " + m.getTitle() + ", Year: " + m.getYear());
        }
        // end-retrieve-matching-em

        // Retrieves a document that has a "title" value of "Best in Show" using a session
        // start-retrieve-one-session
        var singleResult = session.createQuery("from Movie where title = :t", Movie.class)
                                  .setParameter("t", "Best in Show")
                                  .getSingleResult();
        System.out.println("Title: " + singleResult.getTitle() + ", Year: " + singleResult.getYear());
        // end-retrieve-one-session

        // Retrieves a document that has a "title" value of "Best in Show" using an entity manager
        // start-retrieve-one-em
        var singleResult = entityManager.createQuery("select m from Movie m where m.title = :t", Movie.class)
                                        .setParameter("t", "Best in Show")
                                        .getSingleResult();
        System.out.println("Title: " + singleResult.getTitle() + ", Year: " + singleResult.getYear());
        // end-retrieve-one-em

        // Retrieves a count of documents that have a "year" value of 1993 using a session
        // start-retrieve-count-session
        var countResult = session.createQuery("select count(*) from Movie where year = :y", Long.class)
                                 .setParameter("y", 1993)
                                 .getSingleResult();
        System.out.println("Number of movies released in 1993: " + countResult);
        // end-retrieve-count-session

        // Retrieves a count of documents that have a "year" value of 1993 using an entity manager
        // start-retrieve-count-em
        var countResult = entityManager.createQuery("select count(m) from Movie m where m.year = :y", Long.class)
                                       .setParameter("y", 1993)
                                       .getSingleResult();
        System.out.println("Number of movies released in 1993: " + countResult);
        // end-retrieve-count-em

        // Retrieves matching documents using the Criteria API with a session
        // start-criteria-api-session
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<Movie> cq = cb.createQuery(Movie.class);
        Root<Movie> movieRoot = cq.from(Movie.class);

        cq.select(movieRoot).where(cb.equal(movieRoot.get("year"), 1925));
        session.createQuery(cq).getResultList()
            .forEach(m -> System.out.println(m.getTitle()));
        // end-criteria-api-session

        // Retrieves matching documents using the Criteria API with an entity manager
        // start-criteria-api-em
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Movie> cq = cb.createQuery(Movie.class);
        Root<Movie> movieRoot = cq.from(Movie.class);

        cq.select(movieRoot).where(cb.equal(movieRoot.get("year"), 1925));
        entityManager.createQuery(cq).getResultList()
            .forEach(m -> System.out.println(m.getTitle()));
        // end-criteria-api-em

        // Retrieves documents that have a "year" value greater than or equal to 2015 using a session
        // start-comparison-query-session
        var comparisonResult = session.createQuery("from Movie where year >= :y", Movie.class)
                                      .setParameter("y", 2015)
                                      .getResultList();
        for (var m : comparisonResult) {
            System.out.println("Title: " + m.getTitle());
        }
        // end-comparison-query-session

        // Retrieves documents that have a "year" value greater than or equal to 2015 using an entity manager
        // start-comparison-query-em
        var comparisonResult = entityManager.createQuery("select m from Movie m where m.year >= :y", Movie.class)
                                            .setParameter("y", 2015)
                                            .getResultList();
        for (var m : comparisonResult) {
            System.out.println("Title: " + m.getTitle());
        }
        // end-comparison-query-em

        // Retrieves a document that has a "title" of "The Godfather" and a "year" of 1972 using a session
        // start-logical-query-session
        var logicalResult = session.createQuery("from Movie where title = :t and year = :y", Movie.class)
                                   .setParameter("t", "The Godfather")
                                   .setParameter("y", 1972)
                                   .getSingleResult();
        System.out.println("Title: " + logicalResult.getTitle());
        // end-logical-query-session

        // Retrieves a document that has a "title" of "The Godfather" and a "year" of 1972 using an entity manager
        // start-logical-query-em
        var logicalResult = entityManager.createQuery("select m from Movie m where m.title = :t and m.year = :y", Movie.class)
                                         .setParameter("t", "The Godfather")
                                         .setParameter("y", 1972)
                                         .getSingleResult();
        System.out.println("Title: " + logicalResult.getTitle());
        // end-logical-query-em

        // Retrieves documents that have a "year" value that is divisible by 10 using a session
        // start-mod-query-session
        var modulusResult = session.createQuery("from Movie where mod(year, 10) = 0", Movie.class)
                                   .getResultList();
        for (var m : modulusResult) {
            System.out.println("Title: " + m.getTitle() + ", Year: " + m.getYear());
        }
        // end-mod-query-session

        // Retrieves documents that have a "year" value that is divisible by 10 using an entity manager
        // start-mod-query-em
        var modulusResult = entityManager.createQuery("select m from Movie m where mod(m.year, 10) = 0", Movie.class)
                                         .getResultList();
        for (var m : modulusResult) {
            System.out.println("Title: " + m.getTitle() + ", Year: " + m.getYear());
        }
        // end-mod-query-em

        // Sorts matching documents by "year" in descending order using a session
        // start-sort-session
        var sortResult = session.createQuery("from Movie where title = :t order by year desc", Movie.class)
                                .setParameter("t", "Cinderella")
                                .getResultList();
        for (var m : sortResult) {
            System.out.println("Title: " + m.getTitle() + ", Year: " + m.getYear());
        }
        // end-sort-session

        // Sorts matching documents by "year" in descending order using an entity manager
        // start-sort-em
        var sortResult = entityManager.createQuery("select m from Movie m where m.title = :t order by m.year desc", Movie.class)
                                      .setParameter("t", "Cinderella")
                                      .getResultList();
        for (var m : sortResult) {
            System.out.println("Title: " + m.getTitle() + ", Year: " + m.getYear());
        }
        // end-sort-em

        // Skips the first matching document using a session
        // start-skip-session
        var skipResult = session.createQuery("from Movie where title = :t order by year desc", Movie.class)
                                .setParameter("t", "Cinderella")
                                .setFirstResult(1)
                                .getResultList();
        for (var m : skipResult) {
            System.out.println("Title: " + m.getTitle() + ", Year: " + m.getYear());
        }
        // end-skip-session

        // Skips the first matching document using an entity manager
        // start-skip-em
        var skipResult = entityManager.createQuery("select m from Movie m where m.title = :t order by m.year desc", Movie.class)
                                      .setParameter("t", "Cinderella")
                                      .setFirstResult(1)
                                      .getResultList();
        for (var m : skipResult) {
            System.out.println("Title: " + m.getTitle() + ", Year: " + m.getYear());
        }
        // end-skip-em

        // Limits the result set to two documents using a session
        // start-limit-session
        var limitResult = session.createQuery("from Movie where title = :t order by year desc", Movie.class)
                                 .setParameter("t", "Cinderella")
                                 .setMaxResults(2)
                                 .getResultList();
        for (var m : limitResult) {
            System.out.println("Title: " + m.getTitle() + ", Year: " + m.getYear());
        }
        // end-limit-session

        // Limits the result set to two documents using an entity manager
        // start-limit-em
        var limitResult = entityManager.createQuery("select m from Movie m where m.title = :t order by m.year desc", Movie.class)
                                       .setParameter("t", "Cinderella")
                                       .setMaxResults(2)
                                       .getResultList();
        for (var m : limitResult) {
            System.out.println("Title: " + m.getTitle() + ", Year: " + m.getYear());
        }
        // end-limit-em

        // Limits the result set to two documents with the limit clause using a session
        // start-limit-clause-session
        var limitClauseResult = session.createQuery("from Movie where title = :t order by year desc limit 2", Movie.class)
                                       .setParameter("t", "Cinderella")
                                       .getResultList();
        // end-limit-clause-session

        // Limits the result set to two documents with the limit clause using an entity manager
        // start-limit-clause-em
        var limitClauseResult = entityManager.createQuery("select m from Movie m where m.title = :t order by m.year desc limit 2", Movie.class)
                                             .setParameter("t", "Cinderella")
                                             .getResultList();
        // end-limit-clause-em

        // start-retrieve-by-id-session
        var movieById = session.get(Movie.class, new ObjectId("573a13a8f29313caabd1d53c"));
        // end-retrieve-by-id-session

        // start-retrieve-by-id-em
        var movieById = entityManager.find(Movie.class, new ObjectId("573a13a8f29313caabd1d53c"));
        // end-retrieve-by-id-em

        // Retrieves awards information from the matching documents' embeddable type using a session
        // start-retrieve-embedded-session
        var embeddedResult = session.createQuery("select awards from Movie where title = :title", Awards.class)
                            .setParameter("title", "Hairspray")
                            .getResultList();
        for (var a : embeddedResult) {
            System.out.println("Award wins: " + a.getWins());
        }
        // end-retrieve-embedded-session

        // Retrieves awards information from the matching documents' embeddable type using an entity manager
        // start-retrieve-embedded-em
        var embeddedResult = entityManager.createQuery("select m.awards from Movie m where m.title = :title", Awards.class)
                                        .setParameter("title", "Hairspray")
                                        .getResultList();
        for (var a : embeddedResult) {
            System.out.println("Award wins: " + a.getWins());
        }
        // end-retrieve-embedded-em

        // Retrieves documents that have a "cast" array that contains "Kathryn Hahn" using a session
        // start-retrieve-array-session
        var arrayResult = session.createQuery("from Movie where array_contains(cast, :actor)", Movie.class)
                                 .setParameter("actor", "Kathryn Hahn")
                                 .getResultList();
        for (var m : arrayResult) {
            System.out.println("Title: " + m.getTitle());
        }
        // end-retrieve-array-session

        // Retrieves documents that have a "cast" array that contains "Kathryn Hahn" using an entity manager
        // start-retrieve-array-em
        var arrayResult = entityManager.createQuery("select m from Movie m where array_contains(m.cast, :actor)", Movie.class)
                                       .setParameter("actor", "Kathryn Hahn")
                                       .getResultList();
        for (var m : arrayResult) {
            System.out.println("Title: " + m.getTitle());
        }
        // end-retrieve-array-em

        entityManager.getTransaction().commit();
        entityManager.close(); 

        tx.commit();
        session.close();
        sf.close();

    }

}