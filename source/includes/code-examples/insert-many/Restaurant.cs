using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CsharpExamples.UsageExamples.InsertMany
{
    // start-model
    public class Restaurant
    {
        public ObjectId Id { get; set; }

        public string Name { get; set; }

        [BsonElement("restaurant_id")]
        public string RestaurantId { get; set; }

        public string Cuisine { get; set; }

        public object Address { get; set; }

        public string Borough { get; set; }
    }
    // end-model
}