import org.springframework.data.mongodb.repository.MongoRepository;

import com.mongodb.sharded.model.User;

public interface UserRepository extends MongoRepository<User, String> {
}
