public partial class CustomGeoPoint : IEmbeddedObject
{
    [MapTo("coordinates")]
    public IList<double> Coordinates { get; } = null!;

    [MapTo("type")]
    private string Type { get; set; } = "Point";

    public CustomGeoPoint(double latitude, double longitude)
    {
        Coordinates.Add(longitude);
        Coordinates.Add(latitude);
    }
}
