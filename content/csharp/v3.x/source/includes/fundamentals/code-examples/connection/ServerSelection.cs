using MongoDB.Driver;
using MongoDB.Driver.Core.Clusters;
using MongoDB.Driver.Core.Clusters.ServerSelectors;
using MongoDB.Driver.Core.Servers;

public class ServerSelection
{
    // Replace with your connection string
    private const string MongoConnectionString = "<connection URI>";

    public static void Main(string[] args)
    {
        {
            // start-server-selector
            var settings = MongoClientSettings.FromConnectionString("<connection string>");
            var clusterConfigurator = builder =>
            {
                builder.ConfigureCluster(c =>
                    c.With(PreServerSelector: new RandomServerSelector()));
            };
            
            settings.ClusterConfigurator = clusterConfigurator;
            var client = new MongoClient(settings);
            // end-server-selector
        }
    }
}

// start-custom-class
public class CustomServerSelector : IServerSelector
{
    public IEnumerable<ServerDescription> SelectServers(ClusterDescription cluster,
        IEnumerable<ServerDescription> servers)
    {
        return servers.Where(server => server.Type == ServerType.ReplicaSetSecondary);
    }
}
// end-custom-class
