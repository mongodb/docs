//	:replace-start: {
//	  "terms": {
//	    "_persons": "persons",
//      "_aggDB": "aggDB"
//	  }
//	}
using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.Aggregation.Pipelines.Filter;

public class Tutorial
{
    private IMongoDatabase? _aggDB;
    private IMongoCollection<Person>? _persons;

    public void LoadSampleData()
    {
        var uri = DotNetEnv.Env.GetString("CONNECTION_STRING", "Env variable not found. Verify you have a .env file with a valid connection string.");
        var client = new MongoClient(uri);
        _aggDB = client.GetDatabase("agg_tutorials_db");
        _persons = _aggDB.GetCollection<Person>("persons");
        // :snippet-start: load-sample-data
        // :uncomment-start:

        //var _persons = _aggDB.GetCollection<Person>("persons");
        // :uncomment-end:

        _persons.InsertMany(new List<Person>
        {
            new Person
            {
                PersonId = "6392529400",
                FirstName = "Elise",
                LastName = "Smith",
                DateOfBirth = DateTime.Parse("1972-01-13T09:32:07Z"),
                Vocation = "ENGINEER",
                Address = new Address
                {
                    Number = 5625,
                    Street = "Tipa Circle",
                    City = "Wojzinmoj"
                }
            },
            new Person
            {
                PersonId = "1723338115",
                FirstName = "Olive",
                LastName = "Ranieri",
                DateOfBirth = DateTime.Parse("1985-05-12T23:14:30Z"),
                Gender = "FEMALE",
                Vocation = "ENGINEER",
                Address = new Address
                {
                    Number = 9303,
                    Street = "Mele Circle",
                    City = "Tobihbo"
                }
            },
            new Person
            {
                PersonId = "8732762874",
                FirstName = "Toni",
                LastName = "Jones",
                DateOfBirth = DateTime.Parse("1991-11-23T16:53:56Z"),
                Vocation = "POLITICIAN",
                Address = new Address
                {
                    Number = 1,
                    Street = "High Street",
                    City = "Upper Abbeywoodington"
                }
            },
            new Person
            {
                PersonId = "7363629563",
                FirstName = "Bert",
                LastName = "Gooding",
                DateOfBirth = DateTime.Parse("1941-04-07T22:11:52Z"),
                Vocation = "FLORIST",
                Address = new Address
                {
                    Number = 13,
                    Street = "Upper Bold Road",
                    City = "Redringtonville"
                }
            },
            new Person
            {
                PersonId = "1029648329",
                FirstName = "Sophie",
                LastName = "Celements",
                DateOfBirth = DateTime.Parse("1959-07-06T17:35:45Z"),
                Vocation = "ENGINEER",
                Address = new Address
                {
                    Number = 5,
                    Street = "Innings Close",
                    City = "Basilbridge"
                }
            },
            new Person
            {
                PersonId = "7363626383",
                FirstName = "Carl",
                LastName = "Simmons",
                DateOfBirth = DateTime.Parse("1998-12-26T13:13:55Z"),
                Vocation = "ENGINEER",
                Address = new Address
                {
                    Number = 187,
                    Street = "Hillside Road",
                    City = "Kenningford"
                }
            }
        });
        // :snippet-end:
    }

    public List<BsonDocument> PerformAggregation()
    {
        if (_aggDB == null || _persons == null)
        {
            throw new InvalidOperationException("You must call LoadSampleData before performing aggregation.");
        }

        // :snippet-start: match
        var results = _persons.Aggregate()
            .Match(p => p.Vocation == "ENGINEER")
            // :snippet-end:
            // :snippet-start: sort
            .Sort(Builders<Person>.Sort.Descending(p => p.DateOfBirth))
            // :snippet-end:
            // :snippet-start: limit
            .Limit(3)
            // :snippet-end:
            // :snippet-start: project
            .Project(Builders<Person>.Projection
                .Exclude(p => p.Address)
                .Exclude(p => p.Id)
            );
        // :snippet-end:

        return results.ToList();
    }
}
// :replace-end:
