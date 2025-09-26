pipeline := mongo.Pipeline{
	matchStage,
	lookupStage,
	setProductMappingStage,
	setProductNameCategoryStage,
	unsetStage,
}
cursor, err := orders.Aggregate(ctx, pipeline)
