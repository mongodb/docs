using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace RestaurantODataApi.Models
{
    public class Restaurant
    {
        [Key]
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("name")]
        public string? Name { get; set; }

        [BsonElement("cuisine")]
        public string? Cuisine { get; set; }

        [BsonElement("borough")]
        public string? Borough { get; set; }
    }
}