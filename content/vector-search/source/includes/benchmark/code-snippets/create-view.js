db.createView(
  "all_dims_amazon_dataset",
  "2048d_amazon_dataset",
  [
    {
      $addFields: {
        "1024_embedding": { $slice: ["$embedding", 1024] },
        "512_embedding": { $slice: ["$embedding", 512] },
        "256_embedding": { $slice: ["$embedding", 256] }
      }
    }
  ]
)