
var persons = aggDB.GetCollection<Person>("persons");

persons.InsertMany(new List<Person>
{
    new Person
    {
        PersonId = "6392529400",
        FirstName = "Elise",
        LastName = "Smith",
        DateOfBirth = DateTime.Parse("1972-01-13T09:32:07Z"),
        Vocation = "ENGINEER",
        Address = new Address
        {
            Number = 5625,
            Street = "Tipa Circle",
            City = "Wojzinmoj"
        }
    },
    new Person
    {
        PersonId = "1723338115",
        FirstName = "Olive",
        LastName = "Ranieri",
        DateOfBirth = DateTime.Parse("1985-05-12T23:14:30Z"),
        Gender = "FEMALE",
        Vocation = "ENGINEER",
        Address = new Address
        {
            Number = 9303,
            Street = "Mele Circle",
            City = "Tobihbo"
        }
    },
    new Person
    {
        PersonId = "8732762874",
        FirstName = "Toni",
        LastName = "Jones",
        DateOfBirth = DateTime.Parse("1991-11-23T16:53:56Z"),
        Vocation = "POLITICIAN",
        Address = new Address
        {
            Number = 1,
            Street = "High Street",
            City = "Upper Abbeywoodington"
        }
    },
    new Person
    {
        PersonId = "7363629563",
        FirstName = "Bert",
        LastName = "Gooding",
        DateOfBirth = DateTime.Parse("1941-04-07T22:11:52Z"),
        Vocation = "FLORIST",
        Address = new Address
        {
            Number = 13,
            Street = "Upper Bold Road",
            City = "Redringtonville"
        }
    },
    new Person
    {
        PersonId = "1029648329",
        FirstName = "Sophie",
        LastName = "Celements",
        DateOfBirth = DateTime.Parse("1959-07-06T17:35:45Z"),
        Vocation = "ENGINEER",
        Address = new Address
        {
            Number = 5,
            Street = "Innings Close",
            City = "Basilbridge"
        }
    },
    new Person
    {
        PersonId = "7363626383",
        FirstName = "Carl",
        LastName = "Simmons",
        DateOfBirth = DateTime.Parse("1998-12-26T13:13:55Z"),
        Vocation = "ENGINEER",
        Address = new Address
        {
            Number = 187,
            Street = "Hillside Road",
            City = "Kenningford"
        }
    }
});
