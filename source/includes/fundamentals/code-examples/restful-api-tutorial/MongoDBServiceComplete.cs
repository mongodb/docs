using MongoExample.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace MongoExample.Services;

public class MongoDBService {

    private readonly IMongoCollection<Playlist> _playlistCollection;

    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _playlistCollection = database.GetCollection<Playlist>(mongoDBSettings.Value.CollectionName);
    }

    // start-get-async
    public async Task<List<Playlist>> GetAsync() { 
      return await _playlistCollection.Find(new BsonDocument()).ToListAsync();
    }
    // end-get-async

    //start-create-async
    public async Task CreateAsync(Playlist playlist) { 
      await _playlistCollection.InsertOneAsync(playlist);
      return;
    }
    //end-create-async

    //start-add-to-playlist-async
    public async Task AddToPlaylistAsync(string id, string movieId) {
      FilterDefinition<Playlist> filter = Builders<Playlist>.Filter.Eq("Id", id);
      UpdateDefinition<Playlist> update = Builders<Playlist>.Update.AddToSet<string>("movieIds", movieId);
      await _playlistCollection.UpdateOneAsync(filter, update);
      return;
    }
    //end-add-to-playlist-async

    //start-delete-async
    public async Task DeleteAsync(string id) {
      FilterDefinition<Playlist> filter = Builders<Playlist>.Filter.Eq("Id", id);
      await _playlistCollection.DeleteOneAsync(filter);
      return;
    }
    //end-delete-async

}