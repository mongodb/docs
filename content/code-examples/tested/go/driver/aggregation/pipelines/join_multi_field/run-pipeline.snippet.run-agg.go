pipeline := mongo.Pipeline{lookupStage, matchStage, unsetStage}
cursor, err := products.Aggregate(ctx, pipeline)
