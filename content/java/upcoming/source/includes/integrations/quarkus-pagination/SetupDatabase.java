import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import org.jboss.logging.Logger;
import java.util.List;

@ApplicationScoped
public class SetupDatabase {

    private static final Logger LOGGER = Logger.getLogger(SetupDatabase.class.getName());

    private final FruitRepository fruitRepository;

    public SetupDatabase(FruitRepository fruitRepository) {
        this.fruitRepository = fruitRepository;
    }

    void onStart(@Observes StartupEvent ev) {
        LOGGER.info("The application is starting...");
        long count = fruitRepository.countBy();
        if (count > 0) {
            LOGGER.info("Database already populated");
            return;
        }
        List<Fruit> fruits = List.of(
                Fruit.of("apple"),
                Fruit.of("banana"),
                Fruit.of("cherry"),
                Fruit.of("date"),
                Fruit.of("elderberry"),
                Fruit.of("fig"),
                Fruit.of("grape"),
                Fruit.of("honeydew"),
                Fruit.of("kiwi"),
                Fruit.of("lemon")
        );
        fruitRepository.saveAll(fruits);
    }

    void onStop(@Observes ShutdownEvent ev) {
        LOGGER.info("The application is stopping...");
        fruitRepository.deleteAll(fruitRepository.findAll().toList());
    }

}
