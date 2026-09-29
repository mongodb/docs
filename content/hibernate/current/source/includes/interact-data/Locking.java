import com.mongodb.hibernate.annotations.ObjectIdGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OptimisticLockException;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import org.bson.types.ObjectId;
import org.hibernate.LockMode;
import org.hibernate.Session;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OptimisticLock;
import org.hibernate.annotations.OptimisticLocking;
import org.hibernate.annotations.OptimisticLockType;

// start-entity
@Entity
@Table(name = "products")
public class Product {
    @Id
    @ObjectIdGenerator
    private ObjectId id;
    private String name;
    private int quantity;

    @Version
    private Long version;

    public Product() {
    }

    public Product(String name, int quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    public ObjectId getId() {
        return id;
    }

    public Long getVersion() {
        return version;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
// end-entity

public class Locking {
    public static void main(String[] args) {

        // start-insert-and-update
        var sf = HibernateUtil.getSessionFactory();
        try (Session session = sf.openSession()) {
            // Insert a new product, which sets the version to 0
            session.beginTransaction();
            var product = new Product("notebook", 100);
            session.persist(product);
            session.getTransaction().commit();
            System.out.println("Version after insert: " + product.getVersion());

            // Update the same product, which increments the version to 1
            session.beginTransaction();
            product.setQuantity(75);
            session.getTransaction().commit();
            System.out.println("Version after update: " + product.getVersion());
        }
        sf.close();
        // end-insert-and-update

        // start-conflict
        var sf = HibernateUtil.getSessionFactory();
        ObjectId productId;

        // Insert a new product for two sessions to modify
        try (Session session = sf.openSession()) {
            session.beginTransaction();
            var product = new Product("notebook", 100);
            session.persist(product);
            session.getTransaction().commit();
            productId = product.getId();
        }

        try (Session sessionA = sf.openSession(); Session sessionB = sf.openSession()) {
            // Both sessions load the product at version 0
            var productA = sessionA.find(Product.class, productId);
            var productB = sessionB.find(Product.class, productId);

            // Session B commits first and increments the version to 1
            sessionB.beginTransaction();
            productB.setQuantity(75);
            sessionB.getTransaction().commit();

            // Session A commits second, but still holds version 0
            try {
                sessionA.beginTransaction();
                productA.setQuantity(50);
                sessionA.getTransaction().commit();
            } catch (OptimisticLockException e) {
                System.out.println("Update failed: Another session modified this document");
                // Reload the entity and retry, or report the conflict to the user
            }
        }
        sf.close();
        // end-conflict

        // start-force-increment
        var sf = HibernateUtil.getSessionFactory();
        try (Session session = sf.openSession()) {
            session.beginTransaction();

            var product = session.createQuery("from Product where name = :n", Product.class)
                    .setParameter("n", "notebook")
                    .setMaxResults(1)
                    .getSingleResult();
            session.lock(product, LockMode.OPTIMISTIC_FORCE_INCREMENT);

            session.getTransaction().commit();
        }
        sf.close();
        // end-force-increment
    }
}

// start-versionless
@Entity
@Table(name = "products")
@OptimisticLocking(type = OptimisticLockType.DIRTY)
@DynamicUpdate
public class Product {
    @Id
    @ObjectIdGenerator
    private ObjectId id;
    private String name;
    private int quantity;

    // Constructors, getters, and setters
}
// end-versionless

// start-excluded-field
@Entity
@Table(name = "products")
public class Product {
    @Id
    @ObjectIdGenerator
    private ObjectId id;

    @OptimisticLock(excluded = true)
    private String name;

    private int quantity;

    @Version
    private Long version;

    // Constructors, getters, and setters
}
// end-excluded-field
