import org.springframework.data.mongodb.repository.Aggregation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD })
@Aggregation(pipeline = {
       "{ '$search': { 'text': { 'query': ?0, 'path': ?1 } } }"
})
@interface SearchAggregate {
}
