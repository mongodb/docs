import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import org.bson.types.ObjectId

open class Person(var name : String? = null) : RealmObject() {
    @PrimaryKey
    var _id : ObjectId = ObjectId()
    var dog: Dog? = null 
}
