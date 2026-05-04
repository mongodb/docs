public class Movie
{
    public ObjectId Id { get; set; }

    public string Title { get; set; }

    public List<string> Genres { get; set; }
    
    public List<string> Directors { get; set; }
    
    public List<string> Writers { get; set; }

    public string Type { get; set; }

    public string Plot { get; set; }
    
    public ImdbData Imdb { get; set; }
    
    public List<string> Cast { get; set; }
}