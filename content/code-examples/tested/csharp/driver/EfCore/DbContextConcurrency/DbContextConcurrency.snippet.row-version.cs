protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<Customer>()
        .Property(p => p.Version)
        .IsRowVersion();
}
