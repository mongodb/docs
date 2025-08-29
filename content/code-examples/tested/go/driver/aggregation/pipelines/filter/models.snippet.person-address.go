type Person struct {
	PersonID    string        `bson:"person_id"`
	Firstname   string        `bson:"firstname"`
	Lastname    string        `bson:"lastname"`
	Gender      string        `bson:"gender,omitempty"`
	DateOfBirth bson.DateTime `bson:"dateofbirth"`
	Vocation    string        `bson:"vocation"`
	Address     Address       `bson:"address"`
}

type Address struct {
	Number int
	Street string
	City   string
}

