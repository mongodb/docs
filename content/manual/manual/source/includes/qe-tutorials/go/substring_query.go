// start-enable-substring
encryptedFields := bson.M{
	"fields": []bson.M{
		bson.M{
			"keyId":    nil,
			"path":     "patientRecord.ssn",
			"bsonType": "string",
			"queries": []bson.M{
				{
					"queryType":          "substring",
					"strMaxLength":       12,
					"strMinQueryLength":  3,
					"strMaxQueryLength":  6,
					"caseSensitive":      true,
					"diacriticSensitive": true,
				},
			},
		},
	},
}
// end-enable-substring

// start-query-substring
filter := bson.D{
	{"$expr", bson.D{
		{"$encStrContains", bson.D{
			{"input", "$patientRecord.ssn"},
			{"substring", "-65-4"},
		}},
	}},
}
var findResult PatientDocument
err = coll.FindOne(context.TODO(), filter).Decode(&findResult)
if err != nil {
	log.Fatal(err)
}

output, _ := json.MarshalIndent(findResult, "", "    ")
fmt.Printf("%s\n", output)
// end-query-substring
