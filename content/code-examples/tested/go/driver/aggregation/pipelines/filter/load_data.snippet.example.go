persons := aggDB.Collection("persons")

_, err = persons.InsertMany(ctx, []interface{}{
	Person{
		PersonID:    "6392529400",
		Firstname:   "Elise",
		Lastname:    "Smith",
		DateOfBirth: bson.NewDateTimeFromTime(time.Date(1972, 1, 13, 9, 32, 7, 0, time.UTC)),
		Vocation:    "ENGINEER",
		Address:     Address{Number: 5625, Street: "Tipa Circle", City: "Wojzinmoj"},
	},
	Person{
		PersonID:    "1723338115",
		Firstname:   "Olive",
		Lastname:    "Ranieri",
		Gender:      "FEMALE",
		DateOfBirth: bson.NewDateTimeFromTime(time.Date(1985, 5, 12, 23, 14, 30, 0, time.UTC)),
		Vocation:    "ENGINEER",
		Address:     Address{Number: 9303, Street: "Mele Circle", City: "Tobihbo"},
	},
	Person{
		PersonID:    "8732762874",
		Firstname:   "Toni",
		Lastname:    "Jones",
		DateOfBirth: bson.NewDateTimeFromTime(time.Date(1991, 11, 23, 16, 53, 56, 0, time.UTC)),
		Vocation:    "POLITICIAN",
		Address:     Address{Number: 1, Street: "High Street", City: "Upper Abbeywoodington"},
	},
	Person{
		PersonID:    "7363629563",
		Firstname:   "Bert",
		Lastname:    "Gooding",
		DateOfBirth: bson.NewDateTimeFromTime(time.Date(1941, 4, 7, 22, 11, 52, 0, time.UTC)),
		Vocation:    "FLORIST",
		Address:     Address{Number: 13, Street: "Upper Bold Road", City: "Redringtonville"},
	},
	Person{
		PersonID:    "1029648329",
		Firstname:   "Sophie",
		Lastname:    "Celements",
		DateOfBirth: bson.NewDateTimeFromTime(time.Date(1959, 7, 6, 17, 35, 45, 0, time.UTC)),
		Vocation:    "ENGINEER",
		Address:     Address{Number: 5, Street: "Innings Close", City: "Basilbridge"},
	},
	Person{
		PersonID:    "7363626383",
		Firstname:   "Carl",
		Lastname:    "Simmons",
		DateOfBirth: bson.NewDateTimeFromTime(time.Date(1998, 12, 26, 13, 13, 55, 0, time.UTC)),
		Vocation:    "ENGINEER",
		Address:     Address{Number: 187, Street: "Hillside Road", City: "Kenningford"},
	},
})
if err != nil {
	log.Fatal(err)
}
