// Define an embedded object
@RealmClass(embedded = true)
public class Address extends RealmObject {
    String street;
    String city;
    String country;
    String postalCode;

    public Address(String street, String city, String country, String postalCode) {
        this.street = street;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
    }

    public Address() {}
}

// Define an object containing one embedded object
public class Contact extends RealmObject {
    @PrimaryKey
    private ObjectId _id = new ObjectId();
    String name = "";

    // Embed a single object.
    // Embedded object properties must be marked optional
    Address address;

    public Contact(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    public Contact() {}
}

// Define an object containing an array of embedded objects
public class Business extends RealmObject {
    @PrimaryKey
    private ObjectId _id = new ObjectId();
    String name = "";
    
    // Embed an array of objects
    RealmList<Address> addresses = new RealmList<Address>();

    public Business(String name, RealmList<Address> addresses) {
        this.name = name;
        this.addresses = addresses;
    }

    public Business() {}
}
