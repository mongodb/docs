import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import io.realm.annotations.Required
import org.bson.types.ObjectId

open class ProjectTask(
    @PrimaryKey
    var _id: ObjectId = ObjectId(),
    @Required
    var name: String = "",
    var assignee: String? = null,
    var progressMinutes: Int = 0,
    var isComplete: Boolean = false,
    var priority: Int = 0,
    var _partition: String = ""
): RealmObject()
