using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

public class Program
{

  public static async Task Main(string[] args)
  {
    // Replace with your connection string
    const string uri = "<connection string>";

    // This allows automapping of the camelCase database fields to our models. 
    var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
    ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

    var mongoClient = new MongoClient(uri);
    var database = mongoClient.GetDatabase("sample_restaurants");
    var _restaurantsCollection = database.GetCollection<Restaurant>("restaurants");

    // start-update-one-inc
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .Inc(restaurant => restaurant.Grades[0].Score, 2);

    var result = _restaurantsCollection.UpdateOne(filter, update);
    // end-update-one-inc

    // start-update-one-inc-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .Inc(restaurant => restaurant.Grades[0].Score, 2);

    var result = await _restaurantsCollection.UpdateOneAsync(filter, update);
    // end-update-one-inc-async

    // start-update-one-mul
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .Mul(restaurant => restaurant.Grades[0].Score, 1.25f);

    var result = _restaurantsCollection.UpdateOne(filter, update);
    // end-update-one-mul

    // start-update-one-mul-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .Mul(restaurant => restaurant.Grades[0].Score, 1.25f);

    var result = await _restaurantsCollection.UpdateOneAsync(filter, update);
    // end-update-one-mul-async

    // start-update-one-rename
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .Rename(restaurant => restaurant.Address, "location");

    var result = _restaurantsCollection.UpdateOne(filter, update);
    // end-update-one-rename

    // start-update-one-rename-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .Rename(restaurant => restaurant.Address, "location");

    var result = await _restaurantsCollection.UpdateOneAsync(filter, update);
    // end-update-one-rename-async

    // start-update-one-set
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .Set("recommended", true);

    var result = _restaurantsCollection.UpdateOne(filter, update);
    // end-update-one-set

    // start-update-one-set-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .Set("recommended", true);

    var result = await _restaurantsCollection.UpdateOneAsync(filter, update);
    // end-update-one-set-async

    // start-update-one-max
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .Max(restaurant => restaurant.Grades[0].Score, 20);

    var result = _restaurantsCollection.UpdateOne(filter, update);
    // end-update-one-max

    // start-update-one-max-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .Max(restaurant => restaurant.Grades[0].Score, 20);

    var result = await _restaurantsCollection.UpdateOneAsync(filter, update);
    // end-update-one-max-async

    // start-update-one-setoninsert
    var filter = Builders<Restaurant>.Filter.Eq("name", "Patty's Pies");

    var update = Builders<Restaurant>.Update
        .SetOnInsert("recommended", true);

    var result = _restaurantsCollection.UpdateOne(
      filter, update, new UpdateOptions { IsUpsert = true }
    );
    // end-update-one-setoninsert

    // start-update-one-setoninsert-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Patty's Pies");

    var update = Builders<Restaurant>.Update
        .SetOnInsert("recommended", true);

    var result = await _restaurantsCollection.UpdateOneAsync(
      filter, update, new UpdateOptions { IsUpsert = true }
    );
    // end-update-one-setoninsert-async

    // start-update-one-currentdate
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .CurrentDate(restaurant => restaurant.Grades[0].Date);

    var result = _restaurantsCollection.UpdateOne(filter, update);
    // end-update-one-currentdate

    // start-update-one-currentdate-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .CurrentDate(restaurant => restaurant.Grades[0].Date);

    var result = await _restaurantsCollection.UpdateOneAsync(filter, update);
    // end-update-one-currentdate-async

    // start-update-one-unset
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .Unset(restaurant => restaurant.Cuisine);

    var result = _restaurantsCollection.UpdateOne(filter, update);
    // end-update-one-unset

    // start-update-one-unset-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Casa Bella");

    var update = Builders<Restaurant>.Update
        .Unset(restaurant => restaurant.Cuisine);

    var result = await _restaurantsCollection.UpdateOneAsync(filter, update);
    // end-update-one-unset-async

  }

}
