public class Movie
{
    public string Id { get; set; }

    public int Runtime { get; set; }
    
    public string Title { get; set; }

    public string Rated { get; set; }

    public List<string> Genres { get; set; }

    public string Plot { get; set; }
    
    public ImdbData Imdb { get; set; }

    public int Year { get; set; }

    public int Index { get; set; }
    
    public string[] Comments { get; set; }
   
    [BsonElement("lastupdated")]
    public DateTime LastUpdated { get; set; }
}