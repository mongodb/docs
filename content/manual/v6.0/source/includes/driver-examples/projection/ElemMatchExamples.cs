using MongoDB.Bson;
using MongoDB.Driver;

namespace Projection;

public class ElemMatchExamples
{
    static string _uri = Environment.GetEnvironmentVariable("MONGODB_URI"); 

    static IMongoCollection<School> schoolsCollection = new MongoClient(_uri)
        .GetDatabase("example")
        .GetCollection<School>("schools");

    public static List<BsonDocument> ZipSearch()
    {
        // start zipSearch
         var results = schoolsCollection
             .Find(s => s.ZipCode == "63109")
             .Project(Builders<School>.Projection.ElemMatch(
                 field: school => school.Students,
                 filter: student => student.School == 102
            )
         ).ToList();
         // end zipSearch

         return results;
    }
    
    public static List<BsonDocument> ZipMultipleSearch()
    {
        // start zipMultipleSearch
        var results = schoolsCollection
            .Find(s => s.ZipCode == "63109")
            .Project(Builders<School>.Projection.ElemMatch(
                    field: school => school.Students,
                    filter: student => (student.School == 102) && (student.Age > 10) 
                )
            ).ToList();
        // end zipMultipleSearch

        return results;
    }
    
    public static List<BsonDocument> ZipAthleticsIncomplete()
    {
        // start zipAthleticsIncomplete
        var results = schoolsCollection
            .Find(s => s.ZipCode == "63109")
            .Project(Builders<School>.Projection.ElemMatch(
                    "athletics",
                    Builders<School>.Filter.Eq("athletics", "basketball"))
            ).ToList();
        // end zipAthleticsIncomplete

        return results;
    }
    
    public static List<BsonDocument> ZipAthletics()
    {
        // start zipAthletics
        var results = schoolsCollection
            .Find(s => s.ZipCode == "63109")
            .Project(Builders<School>.Projection.ElemMatch(
                field: "athletics",
                filter: Builders<School>.Filter.Eq("$eq", "basketball"))
            ).ToList();
        // end zipAthletics

        return results;
    }
}