var mongoOptions = new MongoOptionsExtension()
    .WithConnectionString("<connection string URI>")
    .WithDatabaseName("hospitalDb")
    .WithKmsProviders(kmsProviders)
    .WithKeyVaultNamespace(keyVaultNamespace)
    .WithCryptProvider(
        CryptProvider.AutoEncryptSharedLibrary,
        Environment.GetEnvironmentVariable("CRYPT_SHARED_LIB_PATH"));

using var context = new HospitalContext(
    new DbContextOptionsBuilder<HospitalContext>()
        .UseMongoDB(mongoOptions)
        .Options,
    ssnDataKeyId,
    dobDataKeyId);

context.Database.EnsureCreated();
context.Patients.Add(new Patient
{
    Name = "John Doe",
    SSN = "123-45-6789",
    DateOfBirth = new DateTime(1985, 6, 15)
});
context.SaveChanges();

var results = context.Patients
    .Where(p => p.DateOfBirth > new DateTime(1980, 1, 1))
    .ToList();
