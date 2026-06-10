public class Movie
{
    public ObjectId Id { get; set; }
    public string Title { get; set; } = null!;
    public string Plot { get; set; } = null!;
    public float[] PlotEmbedding { get; set; } = null!;
}
