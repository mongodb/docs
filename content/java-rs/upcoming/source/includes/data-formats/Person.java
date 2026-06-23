package org.example;

// start-person-class
import org.bson.types.ObjectId;

public final class Person {
    private ObjectId id;
    private String name;
    private int age;
    private Address address;

    public Person() {}

    public Person(final String name, final int age, final Address address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    public ObjectId getId() { return id; }
    public void setId(final ObjectId id) { this.id = id; }

    public String getName() { return name; }
    public void setName(final String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(final int age) { this.age = age; }

    public Address getAddress() { return address; }
    public void setAddress(final Address address) { this.address = address; }

    @Override
    public String toString() {
        return "Person{"
                + "id='" + id + "'"
                + ", name='" + name + "'"
                + ", age=" + age
                + ", address=" + address
                + "}";
    }
}
// end-person-class

