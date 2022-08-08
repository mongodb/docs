package fundamentals;

import java.util.List;

import org.bson.BsonType;
import org.bson.Document;
import org.bson.codecs.pojo.annotations.BsonCreator;
import org.bson.codecs.pojo.annotations.BsonDiscriminator;
import org.bson.codecs.pojo.annotations.BsonExtraElements;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonIgnore;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.codecs.pojo.annotations.BsonRepresentation;

@BsonDiscriminator(value="ProductWithBsonExtraElements", key="_cls")
public class ProductWithBsonExtraElements {

    @BsonProperty("modelName")
    private String name;

    @BsonId()
    @BsonRepresentation(BsonType.OBJECT_ID)
    private String serialNumber;

    @BsonIgnore
    private List<ProductPojo> relatedItems;

    @BsonExtraElements
    private Document additionalInfo;

    @BsonCreator
    public ProductWithBsonExtraElements(
            @BsonProperty("modelName") String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public List<ProductPojo> getRelatedItems() {
        return relatedItems;
    }

    public void setRelatedItems(List<ProductPojo> relatedItems) {
        this.relatedItems = relatedItems;
    }

    public Document getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(Document additionalInfo) {
        this.additionalInfo = additionalInfo;
    }

    @Override
    public String toString() {
        return "ProductWithBsonExtraElements [name=" + name + ", serialNumber=" + serialNumber + ", relatedItems="
                + relatedItems + ", additionalInfo=" + additionalInfo + "]";
    }

}
