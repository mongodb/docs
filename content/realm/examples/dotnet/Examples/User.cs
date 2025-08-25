using Realms;

namespace Examples.Models
{
    public partial class User : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public string Id { get; set; }

        [MapTo("image")]
        public string? Image { get; set; }
    }
}