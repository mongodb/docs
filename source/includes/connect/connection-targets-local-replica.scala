import com.mongodb.{ServerApi, ServerApiVersion}
import org.mongodb.scala.{ConnectionString, MongoClient, MongoClientSettings}
import org.mongodb.scala.bson.Document

import scala.concurrent.Await
import scala.concurrent.duration.DurationInt
import scala.util.Using

// start-connect
object MongoClientConnectionTargets {

    // start-connect-local
    val mongoClient = MongoClient()
    // end-connect-local

    // start-connect-local-host
    val mongoClient = MongoClient("mongodb://host1")
    // end-connect-local-host

    // start-connect-local-host-port
    val mongoClient = MongoClient("mongodb://host1:27017")
    // end-connect-local-host-port

    // start-replica-set
    val mongoClient = MongoClient("mongodb://host1:27017,host2:27017,host3:27017")
    // end-replica-set
    
    // start-replica-set-option
    val mongoClient = MongoClient("mongodb://host1:27017,host2:27017,host3:27017/?replicaSet=myReplicaSet")
    // end-replica-set-option

    // start-replica-set-server-address
    val mongoClient = MongoClient(
        MongoClientSettings.builder()
        .applyToClusterSettings((builder: ClusterSettings.Builder) => builder.hosts(List(
            new ServerAddress("host1", 27017),
            new ServerAddress("host2", 27017),
            new ServerAddress("host3", 27017)).asJava))
        .build())
    // end-replica-set-server-address
}
