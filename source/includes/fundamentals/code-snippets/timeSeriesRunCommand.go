command := bson.D{{"listCollections", 1}}
var result bson.M
	
commandErr := db.RunCommand(context.TODO(), command).Decode(&result)
if commandErr != nil {
	panic(commandErr)
}

output, outputErr := json.MarshalIndent(result, "", "    ")
if outputErr != nil {
	panic(outputErr)
}
fmt.Printf("%s\n", output)
