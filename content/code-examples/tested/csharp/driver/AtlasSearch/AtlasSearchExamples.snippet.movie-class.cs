[BsonIgnoreExtraElements]
public class Movie
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string Title { get; set; } = null!;
    public string Plot { get; set; } = null!;
    public string[] Genres { get; set; } = null!;
    public int Year { get; set; }
    public string Rated { get; set; } = null!;
    public Imdb Imdb { get; set; } = null!;
    [BsonElement("plot_embedding")]
    public float[] PlotEmbedding { get; set; } = null!;
    public double Score { get; set; }
    [BsonElement("paginationToken")]
    public string PaginationToken { get; set; } = null!;
}
