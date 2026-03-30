modelBuilder.Entity<Planet>(p =>
{
    p.HasIndex(p => p.orderFromSun)
        .HasCreateIndexOptions(new CreateIndexOptions() { Sparse = true });
    p.ToCollection("planets");
});
