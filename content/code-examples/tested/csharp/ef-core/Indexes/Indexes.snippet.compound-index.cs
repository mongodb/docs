modelBuilder.Entity<Planet>(p =>
{
    p.HasIndex(p => new { p.orderFromSun, p.name });
    p.ToCollection("planets");
});
