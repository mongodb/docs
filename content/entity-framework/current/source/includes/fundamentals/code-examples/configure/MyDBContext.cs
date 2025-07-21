public class MyDbContext : DbContext
{
    public DbSet<Customer> Customers { get; init; }

    public MyDbContext(DbContextOptions options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Customer>().ToCollection("customers");
    }
}