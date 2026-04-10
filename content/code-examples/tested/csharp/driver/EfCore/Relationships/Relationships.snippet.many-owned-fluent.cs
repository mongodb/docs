public class OrderDbContext : DbContext
{
    public DbSet<CustomerWithOrders> Customers { get; set; } = null!;

    public OrderDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<CustomerWithOrders>(c =>
        {
            c.OwnsMany(c => c.Orders);
            c.ToCollection("customers");
        });
    }
}
