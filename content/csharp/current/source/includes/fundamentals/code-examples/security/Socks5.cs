using MongoDB.Driver;
using MongoDB.Driver.Core.Connections;

public class Program
{
    
    public static void Main(string[] args)
    {
        {
            // start-mongoclientsettings
            var settings = new MongoClientSettings.FromConnectionString("<connection URI>");

            var proxySettings = new Socks5ProxySettings(
                "<proxy host>", 1, Socks5AuthenticationSettings.UsernamePassword("<username>", "<password>"));
            settings.Socks5ProxySettings = proxySettings;

            var client = new MongoClient(settings);
            // end-mongoclientsettings
        }
        {
            // start-connection-uri
            var connectionURI = "mongodb://localhost:27017/" +
                            "?proxyHost=<proxyHost>" +
                            "&proxyPort=<proxyPort>" +
                            "&proxyUsername=<proxyUsername>" +
                            "&proxyPassword=<proxyPassword>";
            var client = new MongoClient(connectionURI);
            // end-connection-uri
        }
    }
}