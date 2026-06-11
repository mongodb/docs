protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<Planet>()
        .Property(p => p.name)
        .HasElementName("name");
}
