// insert code goes here
docs := []interface{}{
	bson.D{{"name", "Halley's Comet"}, {"officialName", "1P/Halley"}, {"orbitalPeriod", 75}, {"radius", 3.4175}, {"mass", 2.2e14}},
	bson.D{{"name", "Wild2"}, {"officialName", "81P/Wild"}, {"orbitalPeriod", 6.41}, {"radius", 1.5534}, {"mass", 2.3e13}},
	bson.D{{"name", "Comet Hyakutake"}, {"officialName", "C/1996 B2"}, {"orbitalPeriod", 17000}, {"radius", 0.77671}, {"mass", 8.8e12}},
}

result, err := coll.InsertMany(context.TODO(), docs)
if err != nil {
	panic(err)
}
