// Creates a command to list collections
command := bson.D{{"listCollections", 1}}
var result bson.M

// Runs the command on the database
commandErr := db.RunCommand(context.TODO(), command).Decode(&result)
if commandErr != nil {
	panic(commandErr)
}

// Prints the command results
output, outputErr := json.MarshalIndent(result, "", "    ")
if outputErr != nil {
	panic(outputErr)
}
fmt.Printf("%s\n", output)
