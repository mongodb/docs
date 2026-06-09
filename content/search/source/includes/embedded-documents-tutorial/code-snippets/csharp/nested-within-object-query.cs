using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;
using System;
using System.Collections.Generic;
using System.Reflection.Emit;

public class NestedArrayWithinObjectExample
{
    private const string MongoConnectionString = "<connection-string>";

    public static void Main(string[] args)
    {
        // allow automapping of the camelCase database fields to our SchoolDocument
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // connect to your Atlas cluster
        var mongoClient = new MongoClient(MongoConnectionString);
        var districtSchoolsDatabase = mongoClient.GetDatabase("local_school_district");
        var schoolsCollection = districtSchoolsDatabase.GetCollection<SchoolDocument>("schools");

        // define variables for query 
        var queryStringQuery = Builders<ExtraCurricularDocument>.Search.QueryString(
            sport => sport.ClubName, "dodgeball OR frisbee"
        );

        // define and run pipeline
        var results = schoolsCollection.Aggregate()
            .Search(Builders<SchoolDocument>.Search.EmbeddedDocument(
                school => school.Clubs.Sports, queryStringQuery),
                indexName: "embedded-documents-tutorial"
            )
            .Project<SchoolDocument>(Builders<SchoolDocument>.Projection
                .Include(school => school.Clubs)
                .Include(school => school.Name)
                .Include(school => school.Id)
                .MetaSearchScore(school => school.Score))
            .ToList();

        // print results
        foreach (var school in results)
        {
            Console.WriteLine(school.ToJson());
        }
    }
}

[BsonIgnoreExtraElements]
public class SchoolDocument
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ClubDocument Clubs { get; set; } 
    public double Score { get; set; }
}

[BsonIgnoreExtraElements]
public class ClubDocument
{
    public ExtraCurricularDocument[] Sports { get; set; }
}

[BsonIgnoreExtraElements]
public class ExtraCurricularDocument
{
    [BsonElement("club_name")]
    public string ClubName { get; set; }
    public string Description { get; set; }
}