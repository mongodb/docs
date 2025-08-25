import io.realm.RealmObject
import io.realm.RealmResults
import io.realm.annotations.LinkingObjects
import io.realm.annotations.PrimaryKey
import org.bson.types.ObjectId

open class Dog(var name : String? = null): RealmObject() {
    @PrimaryKey
    var _id : ObjectId = ObjectId()
    @LinkingObjects("dog") 
    val owner: RealmResults<Person>? = null 
}
