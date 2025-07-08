public class Movie
{
    public ObjectId Id { get; set; }

    public string Title { get; set; }

    public List<string> Genres { get; set; }

    public string Type { get; set; }

    public string Plot { get; set; }

    public List<BsonDocument> Highlights { get; set; }
    
    public string Score { get; set; }

    [BsonElement("scoreDetails")]
    public SearchScoreDetails ScoreDetails { get; set; }
    
    [BsonElement("searchScoreDetails")]
    public SearchScoreDetails SearchScoreDetails { get; set; } 
    
    [BsonElement("paginationToken")]
    public string PaginationToken { get; set; }
    
    public List<string> Cast { get; set; }
    
    [BsonElement("plot_embedding")]
    public float[] PlotEmbedding { get; set; }
}