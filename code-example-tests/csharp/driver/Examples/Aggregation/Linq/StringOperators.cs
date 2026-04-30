//	:replace-start: {
//	  "terms": {
//	    "_queryable": "queryableCollection"
//	  }
//	}

namespace Examples.Aggregation.Linq;

using System.Text.RegularExpressions;
using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

public class StringOperators : IDisposable
{
    private readonly MongoClient _client;

    public StringOperators()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(uri);
    }

    public void Dispose() => _client.Dispose();

    private IQueryable<Restaurant> GetQueryable() =>
        _client
            .GetDatabase("sample_restaurants")
            .GetCollection<Restaurant>("restaurants")
            .AsQueryable();

    public List<BsonDocument> StringReplace()
    {
        var _queryable = GetQueryable().Where(r => r.Name.Contains("Cafe")).Take(1);
        // :snippet-start: string-replace
        var query = _queryable
            .Select(r => new
            {
                r.Name,
                Updated = r.Name.Replace("Cafe", "Coffee Shop")
            });
        // :snippet-end:
        return query.ToList()
            .Select(x => new BsonDocument { ["name"] = x.Name, ["updated"] = x.Updated })
            .ToList();
    }

    public List<BsonDocument> RegexReplaceStatic()
    {
        var _queryable = GetQueryable().Where(r => r.Name.Contains("Cafe")).Take(1);
        // :snippet-start: regex-replace-static
        var query = _queryable
            .Select(r => new
            {
                r.Name,
                Updated = Regex.Replace(r.Name, "cafe",
                    "Coffee Shop", RegexOptions.IgnoreCase)
            });
        // :snippet-end:
        return query.ToList()
            .Select(x => new BsonDocument { ["name"] = x.Name, ["updated"] = x.Updated })
            .ToList();
    }

    public List<BsonDocument> RegexReplaceInstance()
    {
        var _queryable = GetQueryable().Where(r => r.Name.Contains("Cafe")).Take(1);
        // :snippet-start: regex-replace-instance
        var pattern = new Regex("cafe", RegexOptions.IgnoreCase);
        var query = _queryable
            .Select(r => new
            {
                r.Name,
                Updated = pattern.Replace(r.Name, "Coffee Shop")
            });
        // :snippet-end:
        return query.ToList()
            .Select(x => new BsonDocument { ["name"] = x.Name, ["updated"] = x.Updated })
            .ToList();
    }

    public List<BsonDocument> StringSplit()
    {
        var _queryable = GetQueryable()
            .Where(r => r.Cuisine.Contains(","))
            .OrderBy(r => r.Cuisine)
            .Take(1);
        // :snippet-start: string-split
        var query = _queryable
            .Select(r => new
            {
                r.Cuisine,
                Parts = r.Cuisine.Split(',', StringSplitOptions.None)
            });
        // :snippet-end:
        return query.ToList()
            .Select(x => new BsonDocument
            {
                ["cuisine"] = x.Cuisine,
                ["parts"] = new BsonArray(x.Parts)
            })
            .ToList();
    }

    public List<BsonDocument> StringSplitRemoveEmpty()
    {
        var _queryable = GetQueryable()
            .Where(r => r.Cuisine.Contains(","))
            .OrderBy(r => r.Cuisine)
            .Take(1);
        // :snippet-start: string-split-remove-empty
        var query = _queryable
            .Select(r => new
            {
                r.Cuisine,
                Parts = r.Cuisine.Split(',',
                    StringSplitOptions.RemoveEmptyEntries)
            });
        // :snippet-end:
        return query.ToList()
            .Select(x => new BsonDocument
            {
                ["cuisine"] = x.Cuisine,
                ["parts"] = new BsonArray(x.Parts)
            })
            .ToList();
    }

    public List<BsonDocument> RegexSplit()
    {
        var _queryable = GetQueryable()
            .Where(r => r.Cuisine.Contains(","))
            .OrderBy(r => r.Cuisine)
            .Take(1);
        // :snippet-start: regex-split
        var query = _queryable
            .Select(r => new
            {
                r.Cuisine,
                Parts = Regex.Split(r.Cuisine, @",\s*")
            });
        // :snippet-end:
        return query.ToList()
            .Select(x => new BsonDocument
            {
                ["cuisine"] = x.Cuisine,
                ["parts"] = new BsonArray(x.Parts)
            })
            .ToList();
    }
}
// :replace-end:
