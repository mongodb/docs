public class CollegeStudent
        extends RealmObject {
    @Required
    public RealmList<String> notes =
            new RealmList<String>();
    public RealmList<String> nullableNotes =
            new RealmList<String>();
}
