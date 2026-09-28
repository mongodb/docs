import org.hibernate.Transaction;

import org.example.Movie;
import org.hibernate.Session;

public class Datetime {
    public static void main(String[] args) {

        var sf = HibernateUtil.getSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransaction();

        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        // Projects the release year of the "Hairspray" movies by using a session
        // start-extract-datetime-session
        var extractResult = session.createQuery(
                        "select title, extract(year from released) as releaseYear from Movie where title = :title",
                        Object[].class)
                .setParameter("title", "Hairspray")
                .getResultList();
        for (var row : extractResult) {
            System.out.println("Title: " + row[0] + ", Release Year: " + row[1]);
        }
        // end-extract-datetime-session

        // Projects the release year of the "Hairspray" movies by using an entity manager
        // start-extract-datetime-em
        var extractResult = entityManager.createQuery(
                        "select m.title, extract(year from m.released) as releaseYear from Movie m where m.title = :title",
                        Object[].class)
                .setParameter("title", "Hairspray")
                .getResultList();
        for (var row : extractResult) {
            System.out.println("Title: " + row[0] + ", Release Year: " + row[1]);
        }
        // end-extract-datetime-em

        // Projects the release date of the "Hairspray" movies as a string by using a session
        // start-format-datetime-session
        var formatResult = session.createQuery(
                        "select title, format(released as 'yyyy-MM-dd') as releaseDate from Movie where title = :title",
                        Object[].class)
                .setParameter("title", "Hairspray")
                .getResultList();
        for (var row : formatResult) {
            System.out.println("Title: " + row[0] + ", Release Date: " + row[1]);
        }
        // end-format-datetime-session

        // Projects the release date of the "Hairspray" movies as a string by using an entity manager
        // start-format-datetime-em
        var formatResult = entityManager.createQuery(
                        "select m.title, format(m.released as 'yyyy-MM-dd') as releaseDate from Movie m where m.title = :title",
                        Object[].class)
                .setParameter("title", "Hairspray")
                .getResultList();
        for (var row : formatResult) {
            System.out.println("Title: " + row[0] + ", Release Date: " + row[1]);
        }
        // end-format-datetime-em

        entityManager.getTransaction().commit();
        entityManager.close();

        tx.commit();
        session.close();
        sf.close();

    }

}
