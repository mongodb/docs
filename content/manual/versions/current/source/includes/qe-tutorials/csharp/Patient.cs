namespace QueryableEncryption;

// start-patient
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

[BsonIgnoreExtraElements]
public class Patient
{
    public ObjectId Id { get; set; }
    public string PatientName { get; set; }
    public PatientRecord PatientRecord { get; set; }
}
// end-patient