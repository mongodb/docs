modelBuilder.Entity<Planet>(p =>
{
    p.HasIndex(p => p.orderFromSun);
    p.ToCollection("planets");
});
