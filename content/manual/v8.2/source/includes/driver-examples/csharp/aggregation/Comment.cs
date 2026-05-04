public class Comment
{
    public Guid Id { get; set; }
   
    [BsonElement("movie_id")]
    public Guid MovieId { get; set; }
    
    public string Text { get; set; }
}