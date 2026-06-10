public class MoviesDbContext : DbContext
{
    public DbSet<Movie> Movies { get; init; } = null!;

    public MoviesDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Movie>(entity =>
        {
            entity.ToCollection("embedded_movies");
            entity.Property(m => m.Title).HasElementName("title");
            entity.Property(m => m.Plot).HasElementName("plot");
            entity.Property(m => m.PlotEmbedding).HasElementName("plot_embedding")
                .HasBinaryVectorDataType(BinaryVectorDataType.Float32);
            entity.HasIndex(m => m.PlotEmbedding, "vector_index")
                .IsVectorIndex(VectorSimilarity.Cosine, 1536);
        });
    }
}
