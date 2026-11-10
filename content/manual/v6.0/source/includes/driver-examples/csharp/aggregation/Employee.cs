public class Employee
{
    public ObjectId Id { get; set; }

    public string Name { get; set; }

    public Employee ReportsTo { get; set; }

    public List<Employee> ReportingHierarchy { get; set; }
    
    public List<string> Hobbies { get; set; }
}