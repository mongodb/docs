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

    // start-update-many-inc
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .Inc(restaurant => restaurant.Grades[0].Score, 2);

    var result = _restaurantsCollection.UpdateMany(filter, update);
    // end-update-many-inc

    // start-update-many-inc-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .Inc(restaurant => restaurant.Grades[0].Score, 2);

    var result = await _restaurantsCollection.UpdateManyAsync(filter, update);
    // end-update-many-inc-async

    // start-update-many-mul
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .Mul(restaurant => restaurant.Grades[0].Score, 1.25f);

    var result = _restaurantsCollection.UpdateMany(filter, update);
    // end-update-many-mul

    // start-update-many-mul-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .Mul(restaurant => restaurant.Grades[0].Score, 1.25f);

    var result = await _restaurantsCollection.UpdateManyAsync(filter, update);
    // end-update-many-mul-async

    // start-update-many-rename
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .Rename(restaurant => restaurant.Address, "location");

    var result = _restaurantsCollection.UpdateMany(filter, update);
    // end-update-many-rename

    // start-update-many-rename-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .Rename(restaurant => restaurant.Address, "location");

    var result = await _restaurantsCollection.UpdateManyAsync(filter, update);
    // end-update-many-rename-async

    // start-update-many-set
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .Set("recommended", true);

    var result = _restaurantsCollection.UpdateMany(filter, update);
    // end-update-many-set

    // start-update-many-set-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .Set("recommended", true);

    var result = await _restaurantsCollection.UpdateManyAsync(filter, update);
    // end-update-many-set-async

    // start-update-many-max
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .Max(restaurant => restaurant.Grades[0].Score, 20);

    var result = _restaurantsCollection.UpdateMany(filter, update);
    // end-update-many-max

    // start-update-many-max-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .Max(restaurant => restaurant.Grades[0].Score, 20);

    var result = await _restaurantsCollection.UpdateManyAsync(filter, update);
    // end-update-many-max-async

    // start-update-many-setoninsert
    var filter = Builders<Restaurant>.Filter.Eq("name", "Patty's Pies");

    var update = Builders<Restaurant>.Update
        .SetOnInsert("recommended", true);

    var result = _restaurantsCollection.UpdateMany(
      filter, update, new UpdateOptions { IsUpsert = true }
    );
    // end-update-many-setoninsert

    // start-update-many-setoninsert-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Patty's Pies");

    var update = Builders<Restaurant>.Update
        .SetOnInsert("recommended", true);

    var result = await _restaurantsCollection.UpdateManyAsync(
      filter, update, new UpdateOptions { IsUpsert = true }
    );
    // end-update-many-setoninsert-async

    // start-update-many-currentdate
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .CurrentDate(restaurant => restaurant.Grades[0].Date);

    var result = _restaurantsCollection.UpdateMany(filter, update);
    // end-update-many-currentdate

    // start-update-many-currentdate-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .CurrentDate(restaurant => restaurant.Grades[0].Date);

    var result = await _restaurantsCollection.UpdateManyAsync(filter, update);
    // end-update-many-currentdate-async

    // start-update-many-unset
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .Unset(restaurant => restaurant.Cuisine);

    var result = _restaurantsCollection.UpdateMany(filter, update);
    // end-update-many-unset

    // start-update-many-unset-async
    var filter = Builders<Restaurant>.Filter.Eq("name", "Shake Shack");

    var update = Builders<Restaurant>.Update
        .Unset(restaurant => restaurant.Cuisine);

    var result = await _restaurantsCollection.UpdateManyAsync(filter, update);
    // end-update-many-unset-async

  }

}
