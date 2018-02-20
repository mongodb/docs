title: "Connect via mongo shell"
pre: |
  Run :binary:`~bin.mongo` in order to connect to mongodb via the mongo shell.
  From the shell you can run data operation commands as well as database
  management functions and commands. 
ref: connect_mongo_shell
action:
  language: sh
  code: |
    mongo --port [port number]
---
title: "Switch to the test database."
ref: switch_to_test
pre: |
  Once you have connected to :binary:`~bin.mongo`, you should see a prompt.
  In the prompt, type the following:
action:
  language: sh
  code: | 
  	>use test
---
title: "Create a json document to insert into the database."
ref: create_a_json_doc
pre: |
   It's a good idea to create your json document in a plain text editor
   so that if there is a problem adding the document to the collection,
   you can easily retrieve it and try again.
   In this case we will be creating a document that contains fields
   that describe a restaurant.
action:
  language: sh
  code: | 
    {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : ISODate("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : ISODate("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }
  	
action:
---
title: "Call ``insert`` with the JSON Document."
ref: create_a_json_doc
pre: |
   Now put the document into the ``restaurants`` collection by passing it to the restaurant collection. Note that the
   database you have selected in the ``use`` statement is the implied database for the ``db`` object, and the collection that
   you are inserting the json document into comes next, followed by insert();
action:
  language: sh
  code: | 
    db.restaurants.insert(
   {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : ISODate("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : ISODate("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }
)
post: |
  The method returns a writeResult object with the status of the operation.
  language: sh
  code: |
    WriteResult({ "nInserted": 1 }) 