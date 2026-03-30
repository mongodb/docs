modelBuilder.Entity<Planet>(p =>
{
    p.HasAlternateKey(p => new { p.name, p.orderFromSun });
    p.ToCollection("planets");
});
