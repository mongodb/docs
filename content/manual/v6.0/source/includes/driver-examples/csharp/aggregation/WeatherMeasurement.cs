public class WeatherMeasurement
{
    public Guid Id { get; set; }
    
    public string LocalityId { get; set; }
    
    public DateTime MeasurementDateTime { get; set; }
  
    public float Rainfall { get; set; }
    
    public float Temperature { get; set; }
}