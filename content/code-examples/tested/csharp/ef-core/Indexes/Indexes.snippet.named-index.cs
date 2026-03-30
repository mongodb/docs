modelBuilder.Entity<Planet>(p =>
{
    p.HasIndex(p => new { p.orderFromSun, p.name }, "named_order");
    p.ToCollection("planets");
});
