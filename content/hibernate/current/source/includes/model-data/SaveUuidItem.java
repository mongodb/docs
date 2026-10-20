import org.hibernate.Session;

public class SaveUuidItem {
    public static void main(String[] args) {
        var sf = HibernateUtil.getSessionFactory();
        Session session = sf.openSession();

        // start-save-uuid-item
        var item = new UuidItem();
        item.setTitle("The Matrix");
        session.persist(item);
        System.out.println("UuidItem created with ID: " + item.getId());
        // end-save-uuid-item
    }
}
