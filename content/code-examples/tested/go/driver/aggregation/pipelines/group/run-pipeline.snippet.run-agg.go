pipeline := mongo.Pipeline{
	matchStage,
	sortStageOrderDate,
	groupStage,
	sortStageFirstPurchaseDate,
	setStage,
	unsetStage,
}
cursor, err := orders.Aggregate(ctx, pipeline)
