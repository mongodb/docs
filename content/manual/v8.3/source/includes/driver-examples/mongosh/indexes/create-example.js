db.collection.createIndex(
    {
        "a": 1
    },
    {
        unique: true,
        sparse: true,
        expireAfterSeconds: 3600
    }
)