// start-model-creating
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    // Paste example code here

}
// end-model-creating

// start-single-field-index
modelBuilder.Entity<Planet>(p =>
{
    p.HasIndex(p => p.orderFromSun);
    p.ToCollection("planets");
});
// end-single-field-index

// start-compound-index
modelBuilder.Entity<Planet>(p =>
{
    p.HasIndex(p => new { p.orderFromSun, p.name });
    p.ToCollection("planets");
});
// end-compound-index

// start-unique-index
modelBuilder.Entity<Planet>(p =>
{
    p.HasIndex(p => p.orderFromSun).IsUnique();
    p.ToCollection("planets");
});
// end-unique-index

// start-descending-index
modelBuilder.Entity<Planet>(p =>
{
    p.HasIndex(p => p.orderFromSun).IsDescending();
    p.ToCollection("planets");
});
// end-descending-index

// start-named-index
modelBuilder.Entity<Planet>(p =>
{
    p.HasIndex(p => new { p.orderFromSun, p.name }, "named_order");
    p.ToCollection("planets");
});
// end-named-index

// start-sparse-index
modelBuilder.Entity<Planet>(p =>
{
    p.HasIndex(p => p.orderFromSun)
        .HasCreateIndexOptions(new CreateIndexOptions() { Sparse = true });
    p.ToCollection("planets");
});
// end-sparse-index