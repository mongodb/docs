import jakarta.nosql.Column;
import jakarta.nosql.Convert;
import jakarta.nosql.Entity;
import jakarta.nosql.Id;
import org.eclipse.jnosql.databases.mongodb.mapping.ObjectIdConverter;

@Entity
public class Fruit {

    @Id
    @Convert(ObjectIdConverter.class)
    private String id;

    @Column
    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Fruit{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }

    public static Fruit of(String name) {
        Fruit fruit = new Fruit();
        fruit.setName(name);
        return fruit;
    }

}
