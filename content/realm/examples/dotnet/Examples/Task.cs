using MongoDB.Bson;
using Realms;
using User = Examples.Models.User;

namespace Examples.Models
{
    //:snippet-start:item-model
    public partial class Item : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("assignee")]
        public string Assignee { get; set; }

        [MapTo("name")]
        public string? Name { get; set; }

        [MapTo("status")]
        public string? Status { get; set; }
    }
    //:snippet-end:
    public enum ItemStatus
    {
        Open,
        InProgress,
        Complete
    }
}