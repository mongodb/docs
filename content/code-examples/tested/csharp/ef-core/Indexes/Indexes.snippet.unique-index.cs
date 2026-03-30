modelBuilder.Entity<Planet>(p =>
{
    p.HasIndex(p => p.orderFromSun).IsUnique();
    p.ToCollection("planets");
});
