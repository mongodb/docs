public class Movie
{
    public ObjectId Id { get; set; }

    public string Plot { get; set; }
    
    public List<string> Genres { get; set; }
    
    public int Runtime { get; set; }
    
    public List<string> Cast { get; set; }
    
    public string Title { get; set; }

    [BsonElement("lastupdated")]
    public DateTime LastUpdated { get; set; }
    
    public string Rated { get; set; }

    public int Year { get; set; }
    
    public ImdbData Imdb { get; set; }

    public string Type { get; set; }

    public int Index { get; set; }
    
    public string[] Comments { get; set; }

    public List<BsonDocument> Highlights { get; set; }
    
    public float Score { get; set; }

    [BsonElement("scoreDetails")]
    public SearchScoreDetails ScoreDetails { get; set; }
    
    [BsonElement("searchScoreDetails")]
    public SearchScoreDetails SearchScoreDetails { get; set; }
    
    [BsonElement("paginationToken")]
    public string PaginationToken { get; set; }
    
    [BsonElement("plot_embedding")]
    public float[] PlotEmbedding { get; set; }
}