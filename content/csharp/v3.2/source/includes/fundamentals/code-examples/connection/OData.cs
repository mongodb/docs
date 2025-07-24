// start-controller
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using MongoDB.AspNetCore.OData;
using MongoDB.Driver;
using ODataTest.Models;

namespace ODataTest.Controllers;

public class RestaurantsController : ODataController
{
    private readonly IQueryable<Restaurant> _restaurants;

    public RestaurantsController(IMongoClient client)
    {
        var database = client.GetDatabase("sample_restaurants");
        _restaurants = database.GetCollection<Restaurant>("restaurants")
            .AsQueryable();
    }

    // Registers Get endpoint and sets max documents to 5
    [MongoEnableQuery(PageSize = 5)]
    public ActionResult<IEnumerable<Restaurant>> Get()
    {
        return Ok(_restaurants);
    }
}
// end-controller

// start-configure
using Microsoft.AspNetCore.OData;
using Microsoft.OData.ModelBuilder;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using ODataTest.Models;

var builder = WebApplication.CreateBuilder(args);

// Registers a convention pack to convert fields to camel case
var camelCaseConvention = new ConventionPack {
        new CamelCaseElementNameConvention()
    };
ConventionRegistry.Register(
    "CamelCase", camelCaseConvention, type => true);

builder.Services.AddSingleton<IMongoClient>(
    new MongoClient("<Your connection URI>"));

// Registers the Restaurants entity and sets the Id field as the key
var modelBuilder = new ODataConventionModelBuilder();
modelBuilder.EntitySet<Restaurant>("Restaurants");
modelBuilder.EntityType<Restaurant>().HasKey(r => r.Id);

// Adds OData and specify query capabilities
builder.Services.AddControllers().AddOData(
    options => options.Select()
        .AddRouteComponents("odata", modelBuilder.GetEdmModel())
);

var app = builder.Build();
app.UseRouting();
app.MapControllers();

app.Run();
// end-configure