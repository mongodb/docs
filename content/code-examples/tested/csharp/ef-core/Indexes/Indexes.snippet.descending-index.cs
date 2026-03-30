modelBuilder.Entity<Planet>(p =>
{
    p.HasIndex(p => p.orderFromSun).IsDescending();
    p.ToCollection("planets");
});
