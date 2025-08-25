public class Sample extends RealmObject {
    @PrimaryKey
    public String stringField = "Realm";
    public Byte byteField = 0xA;
    // no support for chars: no charField
    public Short shortField = 17;
    public Integer intField = 42;
    @Index
    public Long longField = 256L;
    public Boolean booleanField = true;
    public Float floatField = 3.14f;
    public Double doubleField =
            1.19840122;
    public Date timestampField =
            new Date();
}
