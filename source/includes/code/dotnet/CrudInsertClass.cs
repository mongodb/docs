// class that maps to the fields of a document in the sample_guides.comets collection
class Comet {
    public ObjectId Id { get; set;  }
    public string Name { get; set; }
    public string OfficialName { get; set; }
    public double OrbitalPeriod { get; set; }
    public double Radius { get; set; }
    public double Mass { get; set; }
}
