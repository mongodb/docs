using System.Collections.Generic;
using Realms;
// :state-start: local sync start
public class Player : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public string Id { get; set; }


    [MapTo("stats")]
    public IList<Stat> Stats { get; }

    [MapTo("name")]
    public string Name { get; set; }
}
// :state-end:
