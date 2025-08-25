import io.realm.RealmObject;
import io.realm.RealmResults;
import io.realm.annotations.LinkingObjects;

public class Student extends RealmObject {
    private String name;
    private Integer year;
    @LinkingObjects("students")
    private final RealmResults<Teacher> teacher = null;
    public Student() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    public RealmResults<Teacher> getTeacher() { return teacher; }
}
