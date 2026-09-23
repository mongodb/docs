import org.hibernate.Transaction;

import org.example.Book;
import org.example.BookId;
import org.example.Comment;
import org.example.Review;
import org.example.ReviewId;
import org.example.User;
import org.hibernate.Session;

public class Join {
    public static void main(String[] args) {

        var sf = HibernateUtil.getSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransaction();

        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        // Retrieves movies released in 2015 and their comments by using an inner join and a session
        // start-retrieve-inner-join-session
        var innerJoinResults = session.createQuery("select m.title, c.name from Movie m join m.comments c where m.year = :y", Object[].class)
                                      .setParameter("y", 2015)
                                      .getResultList();
        for (var row : innerJoinResults) {
            System.out.println("Title: " + row[0] + ", Commenter: " + row[1]);
        }
        // end-retrieve-inner-join-session

        // Retrieves movies released in 2015 and their comments by using an inner join and an entity manager
        // start-retrieve-inner-join-em
        var innerJoinResults = entityManager.createQuery("select m.title, c.name from Movie m join m.comments c where m.year = :y", Object[].class)
                                            .setParameter("y", 2015)
                                            .getResultList();
        for (var row : innerJoinResults) {
            System.out.println("Title: " + row[0] + ", Commenter: " + row[1]);
        }
        // end-retrieve-inner-join-em

        // Retrieves movies released in 2015 and any comments they have by using a left outer join and a session
        // start-retrieve-left-join-session
        var leftJoinResults = session.createQuery("select m.title, c.name from Movie m left join m.comments c where m.year = :y", Object[].class)
                                     .setParameter("y", 2015)
                                     .getResultList();
        for (var row : leftJoinResults) {
            System.out.println("Title: " + row[0] + ", Commenter: " + row[1]);
        }
        // end-retrieve-left-join-session

        // Retrieves movies released in 2015 and any comments they have by using a left outer join and an entity manager
        // start-retrieve-left-join-em
        var leftJoinResults = entityManager.createQuery("select m.title, c.name from Movie m left join m.comments c where m.year = :y", Object[].class)
                                           .setParameter("y", 2015)
                                           .getResultList();
        for (var row : leftJoinResults) {
            System.out.println("Title: " + row[0] + ", Commenter: " + row[1]);
        }
        // end-retrieve-left-join-em

        // Retrieves comments and initializes their associated movies by using a join fetch and a session
        // start-retrieve-join-fetch-session
        var comments = session.createQuery("from Comment c join fetch c.movie where c.name = :n", Comment.class)
                              .setParameter("n", "Andrea Le")
                              .getResultList();
        for (var c : comments) {
            System.out.println("Commenter: " + c.getName() + ", Title: " + c.getMovie().getTitle());
        }
        // end-retrieve-join-fetch-session

        // Retrieves comments and initializes their associated movies by using a join fetch and an entity manager
        // start-retrieve-join-fetch-em
        var comments = entityManager.createQuery("select c from Comment c join fetch c.movie where c.name = :n", Comment.class)
                                    .setParameter("n", "Andrea Le")
                                    .getResultList();
        for (var c : comments) {
            System.out.println("Commenter: " + c.getName() + ", Title: " + c.getMovie().getTitle());
        }
        // end-retrieve-join-fetch-em

        // Retrieves each user's comments by matching on both name and email by using a session
        // start-retrieve-compound-on-session
        var compoundOnResults = session.createQuery("select u.name, c.text from User u join Comment c on u.name = c.name and u.email = c.email", Object[].class)
                                       .getResultList();
        for (var row : compoundOnResults) {
            System.out.println("Name: " + row[0] + ", Comment: " + row[1]);
        }
        // end-retrieve-compound-on-session

        // Retrieves each user's comments by matching on both name and email by using an entity manager
        // start-retrieve-compound-on-em
        var compoundOnResults = entityManager.createQuery("select u.name, c.text from User u join Comment c on u.name = c.name and u.email = c.email", Object[].class)
                                             .getResultList();
        for (var row : compoundOnResults) {
            System.out.println("Name: " + row[0] + ", Comment: " + row[1]);
        }
        // end-retrieve-compound-on-em

        // Retrieves comments on movies from the specified year that were posted after the movie was released by using a session
        // start-retrieve-nonequijoin-on-session
        var nonEquijoinResults = session.createQuery("select m.title, c.name from Movie m join m.comments c on c.date > m.released where m.year = :y", Object[].class)
                .setParameter("y", 2015)
                .getResultList();
        for (var row : nonEquijoinResults) {
            System.out.println("Title: " + row[0] + ", Commenter: " + row[1]);
        }
        // end-retrieve-nonequijoin-on-session

        // Retrieves comments on movies from the specified year that were posted after the movie was released by using an entity manager
        // start-retrieve-nonequijoin-on-em
        var nonEquijoinResults = entityManager.createQuery("select m.title, c.name from Movie m join m.comments c on c.date > m.released where m.year = :y", Object[].class)
                .setParameter("y", 2015)
                .getResultList();
        for (var row : nonEquijoinResults) {
            System.out.println("Title: " + row[0] + ", Commenter: " + row[1]);
        }
        // end-retrieve-nonequijoin-on-em

        // Inserts books and reviews that use composite primary keys by using a session
        // start-composite-seed-session
        var blueDoor = new Book(new BookId(10, 2), "The Blue Door");
        var winterLight = new Book(new BookId(10, 3), "Winter Light");
        var saltAndStone = new Book(new BookId(20, 1), "Salt and Stone");
        session.persist(blueDoor);
        session.persist(winterLight);
        session.persist(saltAndStone);

        session.persist(new Review(new ReviewId(30, 7), blueDoor, "Gripping from the first page."));
        session.persist(new Review(new ReviewId(30, 8), blueDoor, "A slow but rewarding read."));
        session.persist(new Review(new ReviewId(20, 1), saltAndStone, "Beautifully written."));
        session.persist(new Review(new ReviewId(10, 3), saltAndStone, "Dense, but worth the effort."));
        // end-composite-seed-session

        // Inserts books and reviews that use composite primary keys by using an entity manager
        // start-composite-seed-em
        var blueDoor = new Book(new BookId(10, 2), "The Blue Door");
        var winterLight = new Book(new BookId(10, 3), "Winter Light");
        var saltAndStone = new Book(new BookId(20, 1), "Salt and Stone");
        entityManager.persist(blueDoor);
        entityManager.persist(winterLight);
        entityManager.persist(saltAndStone);

        entityManager.persist(new Review(new ReviewId(30, 7), blueDoor, "Gripping from the first page."));
        entityManager.persist(new Review(new ReviewId(30, 8), blueDoor, "A slow but rewarding read."));
        entityManager.persist(new Review(new ReviewId(20, 1), saltAndStone, "Beautifully written."));
        entityManager.persist(new Review(new ReviewId(10, 3), saltAndStone, "Dense, but worth the effort."));
        // end-composite-seed-em

        // Retrieves each review and the book it reviews by joining a composite key association by using a session
        // start-retrieve-composite-association-join-session
        var compositeJoinResults = session.createQuery("select r.id, b.id, b.title from Review r join r.book b", Object[].class)
                .getResultList();
        for (var row : compositeJoinResults) {
            System.out.println("Review: " + row[0] + ", Book: " + row[1] + ", Book Title: " + row[2]);
        }
        // end-retrieve-composite-association-join-session

        // Retrieves each review and the book it reviews by joining a composite key association by using an entity manager
        // start-retrieve-composite-association-join-em
        var compositeJoinResults = entityManager.createQuery("select r.id, b.id, b.title from Review r join r.book b", Object[].class)
                .getResultList();
        for (var row : compositeJoinResults) {
            System.out.println("Review: " + row[0] + ", Book: " + row[1] + ", Book Title: " + row[2]);
        }
        // end-retrieve-composite-association-join-em

        // Retrieves each book and the review that has a matching composite identifier by using a session
        // start-retrieve-composite-whole-id-session
        var wholeIdResults = session.createQuery("select b.id, b.title, r.id from Book b join Review r on b.id = r.id", Object[].class)
                .getResultList();
        for (var row : wholeIdResults) {
            System.out.println("Book Title: " + row[1] + ", Book: " + row[0] + ", Review: " + row[2]);
        }
        // end-retrieve-composite-whole-id-session

        // Retrieves each book and the review that has a matching composite identifier by using an entity manager
        // start-retrieve-composite-whole-id-em
        var wholeIdResults = entityManager.createQuery("select b.id, b.title, r.id from Book b join Review r on b.id = r.id", Object[].class)
                .getResultList();
        for (var row : wholeIdResults) {
            System.out.println("Book Title: " + row[1] + ", Book: " + row[0] + ", Review: " + row[2]);
        }
        // end-retrieve-composite-whole-id-em

        entityManager.getTransaction().commit();
        entityManager.close();

        tx.commit();
        session.close();
        sf.close();

    }

}
