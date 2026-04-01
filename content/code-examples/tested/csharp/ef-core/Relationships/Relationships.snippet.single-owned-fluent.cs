public class CustomerDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; } = null!;

    public CustomerDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Customer>(c =>
        {
            c.OwnsOne(c => c.Address);
            c.ToCollection("customers");
        });
    }
}
