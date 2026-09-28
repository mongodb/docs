// start-enable-prefix
encryptedFields := bson.M{
	"fields": []bson.M{
		bson.M{
			"keyId":    nil,
			"path":     "patientRecord.ssn",
			"bsonType": "string",
			"queries": []bson.M{
				{
					"queryType":          "prefixPreview",
					"strMinQueryLength":  3,
					"strMaxQueryLength":  10,
					"caseSensitive":      true,
					"diacriticSensitive": true,
				},
			},
		},
	},
}
// end-enable-prefix

// start-query-prefix
filter := bson.D{
	{"$expr", bson.D{
		{"$encStrStartsWith", bson.D{
			{"input", "$patientRecord.ssn"},
			{"prefix", "987"},
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
// end-query-prefix
