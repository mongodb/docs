public class ProjectedMovie
{
    public ObjectId Id { get; set; }

    public string Title { get; set; }
    
    public string LeadActor { get; set; }
    
    public List<string> Crew { get; set; }
}