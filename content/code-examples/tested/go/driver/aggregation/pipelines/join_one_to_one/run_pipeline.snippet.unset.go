unsetStage := bson.D{{Key: "$unset", Value: bson.A{"_id", "product_id", "product_mapping"}}}
