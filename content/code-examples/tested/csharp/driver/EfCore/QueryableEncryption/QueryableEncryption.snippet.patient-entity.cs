public class Patient
{
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
    public string SSN { get; set; } = null!;
    public DateTime DateOfBirth { get; set; }
}
