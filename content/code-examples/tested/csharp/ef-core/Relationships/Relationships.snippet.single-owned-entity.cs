[Owned]
public class Address
{
    public string Street { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Country { get; set; } = null!;
}

public class Customer
{
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
    public Address Address { get; set; } = null!;
}
