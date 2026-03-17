// start-concurrency-token
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<Customer>()
       .Property(p => p.LastModified)
       .IsConcurrencyToken();
}
// end-concurrency-token

// start-row-version
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<Customer>()
        .Property(p => p.Version)
        .IsRowVersion();
}
// end-row-version