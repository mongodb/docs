import org.hibernate.Transaction;

import org.example.Movie;
import org.hibernate.Session;

public class StringFunctions {
    public static void main(String[] args) {

        var sf = HibernateUtil.getSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransaction();

        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        // Projects the length of the "The Hunger Games" movie title by using a session
        // start-length-session
        var lengthResult = session.createQuery(
                        "select title, length(title) as titleLength from Movie where title = :title",
                        Object[].class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var row : lengthResult) {
            System.out.println("Title: " + row[0] + ", Length: " + row[1]);
        }
        // end-length-session

        // Projects the length of the "The Hunger Games" movie title by using an entity manager
        // start-length-em
        var lengthResult = entityManager.createQuery(
                        "select m.title, length(m.title) as titleLength from Movie m where m.title = :title",
                        Object[].class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var row : lengthResult) {
            System.out.println("Title: " + row[0] + ", Length: " + row[1]);
        }
        // end-length-em

        // Projects the "The Hunger Games" movie title in uppercase by using a session
        // start-upper-session
        var upperResult = session.createQuery(
                        "select upper(title) as upperTitle from Movie where title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var upperTitle : upperResult) {
            System.out.println("Uppercase Title: " + upperTitle);
        }
        // end-upper-session

        // Projects the "The Hunger Games" movie title in uppercase by using an entity manager
        // start-upper-em
        var upperResult = entityManager.createQuery(
                        "select upper(m.title) as upperTitle from Movie m where m.title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var upperTitle : upperResult) {
            System.out.println("Uppercase Title: " + upperTitle);
        }
        // end-upper-em

        // Concatenates a literal onto the "The Hunger Games" movie title by using a session
        // start-concat-session
        var concatResult = session.createQuery(
                        "select concat(title, '!') as excitedTitle from Movie where title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var excitedTitle : concatResult) {
            System.out.println("Concatenated Title: " + excitedTitle);
        }
        // end-concat-session

        // Concatenates a literal onto the "The Hunger Games" movie title by using an entity manager
        // start-concat-em
        var concatResult = entityManager.createQuery(
                        "select concat(m.title, '!') as excitedTitle from Movie m where m.title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var excitedTitle : concatResult) {
            System.out.println("Concatenated Title: " + excitedTitle);
        }
        // end-concat-em

        // Projects the first six characters of the "The Hunger Games" movie title by using a session
        // start-substring-session
        var substringResult = session.createQuery(
                        "select substring(title, 1, 6) as titlePrefix from Movie where title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var titlePrefix : substringResult) {
            System.out.println("Title Prefix: " + titlePrefix);
        }
        // end-substring-session

        // Projects the first six characters of the "The Hunger Games" movie title by using an entity manager
        // start-substring-em
        var substringResult = entityManager.createQuery(
                        "select substring(m.title, 1, 6) as titlePrefix from Movie m where m.title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var titlePrefix : substringResult) {
            System.out.println("Title Prefix: " + titlePrefix);
        }
        // end-substring-em

        // Locates a substring in the "The Hunger Games" movie title by using a session
        // start-locate-session
        var locateResult = session.createQuery(
                        "select locate('Hunger', title) as position from Movie where title = :title",
                        Integer.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var position : locateResult) {
            System.out.println("Position: " + position);
        }
        // end-locate-session

        // Locates a substring in the "The Hunger Games" movie title by using an entity manager
        // start-locate-em
        var locateResult = entityManager.createQuery(
                        "select locate('Hunger', m.title) as position from Movie m where m.title = :title",
                        Integer.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var position : locateResult) {
            System.out.println("Position: " + position);
        }
        // end-locate-em

        // Replaces a substring in the "The Hunger Games" movie title by using a session
        // start-replace-session
        var replaceResult = session.createQuery(
                        "select replace(title, 'Hunger', 'Video') as newTitle from Movie where title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var newTitle : replaceResult) {
            System.out.println("New Title: " + newTitle);
        }
        // end-replace-session

        // Replaces a substring in the "The Hunger Games" movie title by using an entity manager
        // start-replace-em
        var replaceResult = entityManager.createQuery(
                        "select replace(m.title, 'Hunger', 'Video') as newTitle from Movie m where m.title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var newTitle : replaceResult) {
            System.out.println("New Title: " + newTitle);
        }
        // end-replace-em

        // Trims a leading character from the "The Hunger Games" movie title by using a session
        // start-trim-session
        var trimResult = session.createQuery(
                        "select trim(leading 'T' from title) as trimmedTitle from Movie where title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var trimmedTitle : trimResult) {
            System.out.println("Trimmed Title: " + trimmedTitle);
        }
        // end-trim-session

        // Trims a leading character from the "The Hunger Games" movie title by using an entity manager
        // start-trim-em
        var trimResult = entityManager.createQuery(
                        "select trim(leading 'T' from m.title) as trimmedTitle from Movie m where m.title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var trimmedTitle : trimResult) {
            System.out.println("Trimmed Title: " + trimmedTitle);
        }
        // end-trim-em

        // Pads the "The Hunger Games" movie title to 20 characters by using a session
        // start-pad-session
        var padResult = session.createQuery(
                        "select pad(title with 20 leading '*') as paddedTitle from Movie where title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var paddedTitle : padResult) {
            System.out.println("Padded Title: " + paddedTitle);
        }
        // end-pad-session

        // Pads the "The Hunger Games" movie title to 20 characters by using an entity manager
        // start-pad-em
        var padResult = entityManager.createQuery(
                        "select pad(m.title with 20 leading '*') as paddedTitle from Movie m where m.title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var paddedTitle : padResult) {
            System.out.println("Padded Title: " + paddedTitle);
        }
        // end-pad-em

        // Repeats the "The Hunger Games" movie title twice by using a session
        // start-repeat-session
        var repeatResult = session.createQuery(
                        "select repeat(title, 2) as repeatedTitle from Movie where title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var repeatedTitle : repeatResult) {
            System.out.println("Repeated Title: " + repeatedTitle);
        }
        // end-repeat-session

        // Repeats the "The Hunger Games" movie title twice by using an entity manager
        // start-repeat-em
        var repeatResult = entityManager.createQuery(
                        "select repeat(m.title, 2) as repeatedTitle from Movie m where m.title = :title",
                        String.class)
                .setParameter("title", "The Hunger Games")
                .getResultList();
        for (var repeatedTitle : repeatResult) {
            System.out.println("Repeated Title: " + repeatedTitle);
        }
        // end-repeat-em

        entityManager.getTransaction().commit();
        entityManager.close();

        tx.commit();
        session.close();
        sf.close();

    }

}
