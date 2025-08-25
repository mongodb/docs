public partial class Address : IEmbeddedObject
{
    [MapTo("street")]
    public string Street { get; set; }

    [MapTo("city")]
    public string City { get; set; }

    [MapTo("country")]
    public string Country { get; set; }

    [MapTo("postalCode")]
    public string PostalCode { get; set; }

}
public partial class Contact : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("_partition")]
    public string Partition { get; set; }

    [MapTo("name")]
    public string Name { get; set; }

    [MapTo("address")]
    public Address? Address { get; set; } // embed a single address

}
public partial class Business : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("_partition")]
    public string Partition { get; set; }

    [MapTo("name")]
    public string Name { get; set; }

    [MapTo("addresses")]
    public IList<Address> Addresses { get; }
}
