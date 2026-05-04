# typed: strict
require "mongo"
require "bson"

uri = "<connection string>"

Mongo::Client.new(uri) do |client|
  agg_db = client.use("agg_tutorials_db")

  # start-insert-persons
  persons = agg_db[:persons]
  persons.delete_many({})

  persons.insert_many(
    [
      {
        person_id: "6392529400",
        firstname: "Elise",
        lastname: "Smith",
        dateofbirth: DateTime.parse("1972-01-13T09:32:07Z"),
        vocation: "ENGINEER",
        address: {
          number: 5625,
          street: "Tipa Circle",
          city: "Wojzinmoj",
        },
      },
      {
        person_id: "1723338115",
        firstname: "Olive",
        lastname: "Ranieri",
        dateofbirth: DateTime.parse("1985-05-12T23:14:30Z"),
        gender: "FEMALE",
        vocation: "ENGINEER",
        address: {
          number: 9303,
          street: "Mele Circle",
          city: "Tobihbo",
        },
      },
      {
        person_id: "8732762874",
        firstname: "Toni",
        lastname: "Jones",
        dateofbirth: DateTime.parse("1991-11-23T16:53:56Z"),
        vocation: "POLITICIAN",
        address: {
          number: 1,
          street: "High Street",
          city: "Upper Abbeywoodington",
        },
      },
      {
        person_id: "7363629563",
        firstname: "Bert",
        lastname: "Gooding",
        dateofbirth: DateTime.parse("1941-04-07T22:11:52Z"),
        vocation: "FLORIST",
        address: {
          number: 13,
          street: "Upper Bold Road",
          city: "Redringtonville",
        },
      },
      {
        person_id: "1029648329",
        firstname: "Sophie",
        lastname: "Celements",
        dateofbirth: DateTime.parse("1959-07-06T17:35:45Z"),
        vocation: "ENGINEER",
        address: {
          number: 5,
          street: "Innings Close",
          city: "Basilbridge",
        },
      },
      {
        person_id: "7363626383",
        firstname: "Carl",
        lastname: "Simmons",
        dateofbirth: DateTime.parse("1998-12-26T13:13:55Z"),
        vocation: "ENGINEER",
        address: {
          number: 187,
          street: "Hillside Road",
          city: "Kenningford",
        },
      },
    ]
  )
  # end-insert-persons

  pipeline = [
    # start-match
    { "$match": { "vocation": "ENGINEER" } },
    # end-match
    # start-sort
    { "$sort": { "dateofbirth": -1 } },
    # end-sort
    # start-limit
    { "$limit": 3 },
    # end-limit
    # start-unset
    { "$unset": ["_id", "address"] },
    # end-unset
  ]

  # start-run-agg
  aggregation_result = persons.aggregate(pipeline)
  # end-run-agg

  aggregation_result.each do |doc|
    puts doc
  end
end
