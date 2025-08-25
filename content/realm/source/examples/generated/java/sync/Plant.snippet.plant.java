import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

public class Plant {
    private ObjectId id;
    private String name;
    private String sunlight;
    private String color;
    private String type;
    @BsonProperty("_partition")
    private String partition;

    // empty constructor required for MongoDB Data Access POJO codec compatibility
    public Plant() {}

    public Plant(ObjectId id, String name, String sunlight, String color, String type, String partition) {
        this.id = id;
        this.name = name;
        this.sunlight = sunlight;
        this.color = color;
        this.type = type;
        this.partition = partition;
    }

    public ObjectId getId() { return id; }
    public void setId(ObjectId id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSunlight() { return sunlight; }
    public void setSunlight(String sunlight) { this.sunlight = sunlight; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getPartition() { return partition; }
    public void setPartition(String partition) { this.partition = partition; }

    @Override
    public String toString() {
        return "Plant [id=" + id + ", name=" + name + ", sunlight=" + sunlight + ", color=" + color + ", type=" + type + ", partition=" + partition + "]";
    }
}
