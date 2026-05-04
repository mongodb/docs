public class School
{
    public string Id { get; set; }
    
    [BsonElement("zipcode")]
    public string ZipCode { get; set; }
    
    public Student[] Students { get; set; }
    
    public string[] Athletics { get; set; }
}