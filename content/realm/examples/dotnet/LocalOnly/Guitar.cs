using MongoDB.Bson;
using Realms;

namespace LocalOnly
{
    public partial class Guitar : IRealmObject
    {
        [PrimaryKey]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        public string? Make { get; set; }

        public string? Model { get; set; }

        public double Price { get; set; }

        public string? Owner { get; set; }
    }

}
