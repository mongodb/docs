public class Person
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string PersonId { get; set; } = "";
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public DateTime DateOfBirth { get; set; }
    [BsonIgnoreIfNull]
    public string? Gender { get; set; }
    public string Vocation { get; set; } = "";
    public Address? Address { get; set; }
}

public class Address
{
    public int Number { get; set; }
    public string Street { get; set; } = "";
    public string City { get; set; } = "";
}
