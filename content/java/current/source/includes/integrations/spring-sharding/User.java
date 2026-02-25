import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Sharded;

@Document("users")
@Sharded(shardKey = { "email" })
public class User {

    @Id
    private String id;
    private String name;
    @Field("email")
    private String email;
    private String password;

    // Getters and Setters
}
