public class HospitalContext : DbContext
{
    public DbSet<Patient> Patients { get; set; } = null!;
    private readonly Guid _ssnDataKeyId;
    private readonly Guid _dobDataKeyId;

    public HospitalContext(
        DbContextOptions options,
        Guid ssnDataKeyId,
        Guid dobDataKeyId)
        : base(options)
    {
        _ssnDataKeyId = ssnDataKeyId;
        _dobDataKeyId = dobDataKeyId;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Patient>(entity =>
        {
            entity.ToCollection("patients");
            entity.Property(p => p.SSN)
                  .IsEncrypted(_ssnDataKeyId);

            entity.Property(p => p.DateOfBirth)
                  .IsEncryptedForRange(
                      new DateTime(1900, 1, 1),
                      new DateTime(2100, 12, 31),
                      _dobDataKeyId);
        });
    }
}
