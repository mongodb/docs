// start-enable-range
encryptedFieldsMap := bson.M{
	"fields": []bson.M{
		bson.M{
			"keyId":    nil,
			"path":     "patientRecord.ssn",
			"bsonType": "string",
			"queries": []bson.M{
				{
					"queryType": "equality",
				},
			},
		},
		bson.M{
			"keyId":    nil,
			"path":     "patientRecord.billing",
			"bsonType": "object",
		},
		bson.M{
			"keyId":    nil,
			"path":     "patientRecord.billAmount",
			"bsonType": "int",
			"queries": []bson.M{
				{
					"queryType":  "range",
					"sparsity":   1,
					"min":        100,
					"max":        2000,
					"trimFactor": 4,
				},
			},
		},
	},
}
// end-enable-range

// start-query-range
filter := bson.D{
	{"patientRecord.billAmount", bson.D{
		{"$gt", 1000},
		{"$lt", 2000},
	}},
}
var findResult PatientDocument
err = coll.FindOne(context.TODO(), filter).Decode(&findResult)
if err != nil {
	log.Fatal(err)
}

if err != nil {
	fmt.Print("Unable to find the document\n")
} else {
	output, _ := json.MarshalIndent(findResult, "", "    ")
	fmt.Printf("%s\n", output)
}
// end-query-range