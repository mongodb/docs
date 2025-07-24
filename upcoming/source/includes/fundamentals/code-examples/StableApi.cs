using MongoDB.Driver;

namespace Fundamentals;

public class StableApi
{
    public static void Main(string[] args)
    {
        // start-stable-api
        var serverApi = new ServerApi(ServerApiVersion.V1);
        var settings = new MongoClientSettings { ServerApi = serverApi };
        var client = new MongoClient(settings);
        // end-stable-api
    }

    public static void UseApiOptions()
    {
        // start-stable-api-options
        var serverApi = new ServerApi(ServerApiVersion.V1, strict: true,
            deprecationErrors: true);
        // end-stable-api-options
    }
}