import io.realm.RealmList;
import io.realm.RealmObject;

public class Teacher extends RealmObject {
    private String name;
    private Integer numYearsTeaching;
    private String subject;
    private RealmList<Student> students;
    public Teacher() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getNumYearsTeaching() { return numYearsTeaching; }
    public void setNumYearsTeaching(Integer numYearsTeaching) { this.numYearsTeaching = numYearsTeaching; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public RealmList<Student> getStudents() { return students; }
    public void setStudents(RealmList<Student> students) { this.students = students; }
}
