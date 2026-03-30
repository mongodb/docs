modelBuilder.Entity<Planet>(p =>
{
    p.HasAlternateKey(p => p.name);
    p.ToCollection("planets");
});
