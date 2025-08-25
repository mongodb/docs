public class MyClassWithDecimals
{
    [PrimaryKey]
    public ObjectId _id { get; } = ObjectId.GenerateNewId();

    // Standard (96-bit) decimal value type
    public decimal VeryPreciseNumber { get; set; }

    // 128-bit Decimal128 
    public Decimal128 EvenMorePreciseNumber { get; set; }
    public Decimal128 AnotherEvenMorePreciseNumber { get; set; }

    // Nullable decimal or Decimal128 are supported, too
    public decimal? MaybeDecimal { get; set; }
    public Decimal128? MaybeDecimal128 { get; set; }

    public void DoDecimalStuff()
    {
        var myInstance = new MyClassWithDecimals();
        // To store decimal values:
        realm.Write(() =>
        {
            myInstance.VeryPreciseNumber = 1.234567890123456789M;
            myInstance.EvenMorePreciseNumber = Decimal128.Parse("987654321.123456789");

            // Decimal128 has explicit constructors that take a float or a double
            myInstance.EvenMorePreciseNumber = new Decimal128(9.99999);
        });

    }
}
