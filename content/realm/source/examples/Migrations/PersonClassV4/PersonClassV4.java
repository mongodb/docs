public class Person extends RealmObject { // Realm schema version 3
    @Required
    public String fullName;
    @Required
    public Date birthday = new Date();
}
