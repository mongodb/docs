using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.OData.ModelBuilder;
using MongoDB.Driver;
using RestaurantODataApi;
using RestaurantODataApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configures the MongoDB connection
var connectionString = builder.Configuration["MongoDB:ConnectionString"];
var databaseName = builder.Configuration["MongoDB:DatabaseName"] ?? "sample_restaurants";

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("MongoDB connection string is required. Please set MongoDB:ConnectionString in appsettings.json");
}

// Registers a MongoDB client
builder.Services.AddSingleton<IMongoClient>(sp => new MongoClient(connectionString));

// Registers the DbContext
builder.Services.AddDbContext<RestaurantDbContext>(options =>
{
    var mongoClient = new MongoClient(connectionString);
    options.UseMongoDB(mongoClient, databaseName);
});

// Configures the OData EDM model
var modelBuilder = new ODataConventionModelBuilder();
modelBuilder.EntitySet<Restaurant>("Restaurants");
modelBuilder.EntityType<Restaurant>().HasKey(r => r.Id);

// Registers the unbound functions
var getRestaurantsByBoroughFunction = modelBuilder.Function("GetRestaurantsByBorough");
getRestaurantsByBoroughFunction.Parameter<string>("borough");
getRestaurantsByBoroughFunction.ReturnsCollectionFromEntitySet<Restaurant>("Restaurants");

var getRestaurantsByCuisineFunction = modelBuilder.Function("GetRestaurantsByCuisine");
getRestaurantsByCuisineFunction.Parameter<string>("cuisine");
getRestaurantsByCuisineFunction.ReturnsCollectionFromEntitySet<Restaurant>("Restaurants");

// Configures OData with ASP.NET Core
builder.Services.AddControllers()
    .AddOData(opt => opt
        .AddRouteComponents("odata", modelBuilder.GetEdmModel())
        .Select()
        .Filter()
        .OrderBy()
        .Expand()
        .Count()
        .SetMaxTop(100));

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();