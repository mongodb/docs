
using System;
using MongoDB.Bson;
using Realms;
// :state-start: local sync start
public class Stat : RealmObject
{
    [MapTo("_id")]
    [PrimaryKey]
    public ObjectId Id { get; private set; } = ObjectId.GenerateNewId();

    public DateTimeOffset Time { get; private set; } = DateTimeOffset.Now;

    [MapTo("score")]
    public int Score { get; set; } = 0;

    [MapTo("enemiesDefeated")]
    public int EnemiesDefeated { get; set; } = 0;

    [MapTo("tokensCollected")]
    public int TokensCollected { get; set; } = 0;

    [MapTo("statOwner")]
    public Player StatOwner { get; set; }
}
// :state-end: 
