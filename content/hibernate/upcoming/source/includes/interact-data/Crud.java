import org.hibernate.Transaction;
import org.hibernate.Session;
import org.hibernate.StatelessSession;

public class Crud {
    public static void main(String[] args) {

        var sf = HibernateUtil.getSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransaction();

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");
        EntityManager entityManager = emf.createEntityManager();
        entityManager.getTransaction().begin();

        // Inserts a document that has a "title" value of "Knives Out" using a session
        // start-insert-session
        var myMovie = new Movie();
        myMovie.setTitle("Knives Out");
        myMovie.setYear(2019);
        myMovie.setCast(List.of("Ana de Armas", "Daniel Craig", "Chris Evans"));
        myMovie.setPlot("Detective Benoit Blanc investigates the mysterious death of crime novelist Harlan Thrombey, " +
                "unraveling lies as every Thrombey family member becomes a suspect.");
        session.persist(myMovie);
        // end-insert-session

        // Inserts a document that has a "title" value of "Knives Out" using an entity manager
        // start-insert-em
        var myMovie = new Movie();
        myMovie.setTitle("Knives Out");
        myMovie.setYear(2019);
        myMovie.setCast(List.of("Ana de Armas", "Daniel Craig", "Chris Evans"));
        myMovie.setPlot("Detective Benoit Blanc investigates the mysterious death of crime novelist Harlan Thrombey, " +
                "unraveling lies as every Thrombey family member becomes a suspect.");
        entityManager.persist(myMovie);
        // end-insert-em
        
        // Finds documents that have a "year" value of 1920 using a session
        // start-find-many-session
        var results = session.createQuery("from Movie where year = :y", Movie.class)
                            .setParameter("y", 1920)
                            .getResultList();
        results.forEach(movie -> System.out.println(movie.getTitle()));
        // end-find-many-session
 
        // Finds documents that have a "year" value of 1920 using a entity manager
        // start-find-many-em
        var results = entityManager.createQuery("select m from Movie m where m.year = :y", Movie.class)
                            .setParameter("y", 1920)
                            .getResultList();
        results.forEach(movie -> System.out.println(movie.getTitle()));
        // end-find-many-em
        
        // Finds a document that has a "title" value of "Boyhood" using a session
        // start-find-one-session
        var singleResult = session.createQuery("from Movie where title = :t", Movie.class)
                                  .setParameter("t", "Boyhood")
                                  .getSingleResult();
        System.out.println("Title: " + singleResult.getTitle() + ", Year: " + singleResult.getYear());
        // end-find-one-session

        // Finds a document that has a "title" value of "Boyhood" using an entity manager
        // start-find-one-em
        var singleResult = entityManager.createQuery("select m from Movie m where m.title = :t", Movie.class)
                                  .setParameter("t", "Boyhood")
                                  .getSingleResult();
        System.out.println("Title: " + singleResult.getTitle() + ", Year: " + singleResult.getYear());
        // end-find-one-em

        // Updates a document that has the specified ObjectId value using a session
        // start-update-one-session
        // Your ObjectId value might differ
        Movie movieById = session.get(Movie.class, new ObjectId("573a1399f29313caabcedc5d"));
        movieById.setTitle("Jurassic Park I");
        session.persist(movieById);
        // end-update-one-session

        // Updates a document that has the specified ObjectId value using an entity manager
        // start-update-one-em
        // Your ObjectId value might differ
        Movie movieById = entityManager.find(Movie.class, new ObjectId("573a1399f29313caabcedc5d"));
        movieById.setTitle("Jurassic Park I");
        entityManager.persist(movieById);
        // end-update-one-em

        // Updates the "title" of documents that have a "title" value of "The Three Stooges" using a session
        // start-update-many-session
        var updateResult = session.createMutationQuery(
            "update Movie set title = :new where title = :old")
            .setParameter("new", "The 3 Stooges")
            .setParameter("old", "The Three Stooges")
            .executeUpdate();
        System.out.println("Number of movies updated: " + updateResult);
        // end-update-many-session

        // Updates the "title" of documents that have a "title" value of "The Three Stooges" using an entity manager
        // start-update-many-em
        var updateResult = entityManager.createQuery(
            "update Movie m set m.title = :new where m.title = :old")
            .setParameter("new", "The 3 Stooges")
            .setParameter("old", "The Three Stooges")
            .executeUpdate();
        System.out.println("Number of movies updated: " + updateResult);
        // end-update-many-em

        // Updates the "year" value of the document that has a "title" value of "The 3 Stooges" using an arithmetic expression in the SET clause
        // start-update-expression-arithmetic
        var updateResult = session.createMutationQuery(
            "update Movie m set m.year = m.year + 1 where m.title = :title")
            .setParameter("title", "The 3 Stooges")
            .executeUpdate();
        System.out.println("Number of movies updated: " + updateResult);
        // end-update-expression-arithmetic

        // Updates the "plot" value to match the "title" value of the document that has a "year" value of 1920 using a field reference in the SET clause
        // start-update-expression-field-reference
        var updateResult = session.createMutationQuery(
            "update Movie m set m.plot = m.title where m.year = :year")
            .setParameter("year", 1920)
            .executeUpdate();
        System.out.println("Number of movies updated: " + updateResult);
        // end-update-expression-field-reference

        // Upserts a document that has the specified ObjectId value
        // start-upsert-one
        try (StatelessSession statelessSession = sf.openStatelessSession()) {
            var movie = new Movie();
            movie.setId(new ObjectId("573a1398f29313caabce9682"));
            movie.setTitle("The General");
            movie.setYear(1926);
            movie.setReleased(Instant.parse("1927-02-24T00:00:00Z"));

            statelessSession.upsert(movie);
        }
        // end-upsert-one

        // Upserts multiple documents in one operation
        // start-upsert-multiple
        try (StatelessSession statelessSession = sf.openStatelessSession()) {
            var firstMovie = new Movie();
            firstMovie.setId(new ObjectId("573a1398f29313caabce9682"));
            firstMovie.setTitle("The General");
            firstMovie.setYear(1926);

            var secondMovie = new Movie();
            secondMovie.setId(new ObjectId("573a1398f29313caabce9683"));
            secondMovie.setTitle("Metropolis");
            secondMovie.setYear(1927);

            statelessSession.upsertMultiple(List.of(firstMovie, secondMovie));
        }
        // end-upsert-multiple

        // Deletes a document that has the specified ObjectId value using a session
        // start-delete-one-session
        // Your ObjectId value might differ
        Movie movieToDelete = session.get(Movie.class, new ObjectId("573a1399f29313caabcedc5d"));
        session.remove(movieToDelete);
        // end-delete-one-session

        // Deletes a document that has the specified ObjectId value using an entity manager
        // start-delete-one-em
        // Your ObjectId value might differ
        Movie movieToDelete = entityManager.find(Movie.class, new ObjectId("573a1399f29313caabcedc5d"));
        entityManager.remove(movieToDelete);
        // end-delete-one-em

        // Deletes documents that have a "year" value of 1920 using a session
        // start-delete-many-session
        var deleteResult = session.createMutationQuery(
            "delete Movie where year = :y")
            .setParameter("y", 1920)
            .executeUpdate();
        System.out.println("Number of movies deleted: " + deleteResult);
        // end-delete-many-session

        // Deletes documents that have a "year" value of 1920 using an entity manager
        // start-delete-many-em
        var deleteResult = entityManager.createQuery(
            "delete Movie m where m.year = :y")
            .setParameter("y", 1920)
            .executeUpdate();
        System.out.println("Number of movies deleted: " + deleteResult);
        // end-delete-many-em

        entityManager.getTransaction().commit();
        entityManager.close(); 
        emf.close();

        tx.commit();
        session.close();
        sf.close();

    }

}