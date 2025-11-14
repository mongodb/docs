import org.hibernate.Transaction;
import org.hibernate.Session;

public class Transaction {
    public static void main(String[] args) {

        // start-hibernate-session
        var sf = HibernateUtil.getSessionFactory();
        Session session = sf.openSession();

        var movie = session.createQuery("from Movie where title = :t", Movie.class)
                            .setParameter("t", "Erin Brockovich")
                            .getSingleResult();
        System.out.println("Title: " + movie.getTitle() + ", Year: " + movie.getYear());

        session.close();
        sf.close();
        // end-hibernate-session

        // start-hibernate-try-with-resources
        var sf = HibernateUtil.getSessionFactory();
        try (Session session = sf.openSession()) {
            var movie = session.createQuery("from Movie where title = :t", Movie.class)
                    .setParameter("t", "Erin Brockovich")
                    .getSingleResult();
            System.out.println("Title: " + movie.getTitle() + ", Year: " + movie.getYear());
        }
        sf.close();
        // end-hibernate-try-with-resources

        // start-jpa-em
        // Replace <persistence unit> with the name of your persistence unit in the persistence.xml file
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("<persistence unit>");
        EntityManager entityManager = emf.createEntityManager();

        var results = entityManager.createQuery("select m from Movie m where m.year = :y", Movie.class)
                .setParameter("y", 1929)
                .getResultList();
        results.forEach(movie -> System.out.println(movie.getTitle()));

        entityManager.close();
        emf.close();
        // end-jpa-em

        // start-hibernate-transaction
        var sf = HibernateUtil.getSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransaction();

        var newMovie = new Movie();
        newMovie.setTitle("Lady Bird");
        newMovie.setYear(2017);
        session.persist(newMovie);

        var movie = session.createQuery("from Movie where title = :t", Movie.class)
                .setParameter("t", "Black Swan")
                .getSingleResult();
        var currentCast = new ArrayList<>(movie.getCast());
        currentCast.add("Winona Ryder");
        movie.setCast(currentCast);
        
        tx.commit();
        session.close();
        sf.close();
        // end-hibernate-transaction

        // start-jpa-transaction
        // Replace <persistence unit> with the name of your persistence unit in the persistence.xml file
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("<persistence unit>");
        EntityManager entityManager = emf.createEntityManager();
        entityManager.getTransaction().begin();

        // Your ObjectId value might differ
        Movie movieToDelete = entityManager.find(Movie.class, new ObjectId("573a1399f29313caabcedc5d"));
        entityManager.remove(movieToDelete);

        var addMovie = new Movie();
        addMovie.setTitle("The Favourite");
        addMovie.setYear(2018);
        entityManager.persist(addMovie);

        entityManager.getTransaction().commit();
        entityManager.close();
        emf.close();
        // end-jpa-transaction

        // start-rollback-transaction-session
        Session session = sessionFactory.openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();

            Movie movie = new Movie();
            movie.setTitle("Control Alt Delete");
            session.persist(movie);

            tx.commit();
        } catch (Exception e) {
            if (tx != null) {
                tx.rollback(); 
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
        // end-rollback-transaction-session

        // start-rollback-transaction-em
        EntityManager entityManager = emf.createEntityManager();
        EntityTransaction tx = entityManager.getTransaction();
        
        try {
            tx.begin();

            Movie movie = new Movie();
            movie.setTitle("Control Alt Delete");
            entityManager.persist(movie);

            tx.commit();
        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                tx.rollback();  
            }
            e.printStackTrace();
        } finally {
            entityManager.close();
        }
        // end-rollback-transaction-em
}