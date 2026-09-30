import org.hibernate.Session;

public class SaveMovie {
    public static void main(String[] args) {
        var sf = HibernateUtil.getSessionFactory();
        Session session = sf.openSession();

        // start-save-movie
        var movie = new Movie();
        movie.setTitle("The Matrix");
        session.persist(movie);
        System.out.println("Movie created with ID: " + movie.getId());
        // end-save-movie
    }
}
