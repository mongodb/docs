// start-program-setup
using MongoExample.Models;
using MongoExample.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<MongoDBService>();
// end-program-setup

// start-program-example
// Adds services to the container to configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configures the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Maps the endpoints for the API
app.MapGet("/api/playlists", async (MongoDBService mongoDBService) =>
{
    var playlists = await mongoDBService.GetAsync();
    return playlists;
})
.WithName("GetPlaylists")
.WithOpenApi();

app.MapPost("/api/playlists", async (MongoDBService mongoDBService, Playlist newPlaylist) =>
{
    await mongoDBService.CreateAsync(newPlaylist);
    return Results.Created($"/playlists/{newPlaylist.Id}", newPlaylist);
})
.WithName("CreatePlaylist")
.WithOpenApi();

app.MapPut("/api/playlists/{id}", async (MongoDBService mongoDBService, string id, string movieId) =>
{
    await mongoDBService.AddToPlaylistAsync(id, movieId);
    return Results.NoContent();
})
.WithName("AddMovieToPlaylist")
.WithOpenApi();

app.MapDelete("/playlists/{id}", async (MongoDBService mongoDBService, string id) =>
{
    await mongoDBService.DeleteAsync(id);
    return Results.NoContent();
})
.WithName("DeletePlaylist")
.WithOpenApi();

app.Run();
//end-program-example