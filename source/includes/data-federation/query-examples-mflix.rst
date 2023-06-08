Find all movies between the years 2010 and 2015 and include only 
the ``_id``, ``title``, and ``year`` fields in the results. Limit the number of documents returned to ``5``.

.. io-code-block::
   :copyable: true
      
   .. input:: 
      :language:  json
      :linenos: 

      db.movies.find({"type": "movie", "year": {$gt: 2010, $lt: 2015} }, {"title": 1, "year": 1 }).limit(5)

   .. output:: 
      :language: json
      :linenos:

      {
	    "_id" : ObjectId("573a13b8f29313caabd4c8c5"),
	    "year" : 2011,
	    "title" : "Thor"
      }
      {
	    "_id" : ObjectId("573a13b0f29313caabd34a3e"),
	    "year" : 2011,
	    "title" : "Cowboys & Aliens"
      }
      {
	    "_id" : ObjectId("573a13b8f29313caabd4ca3f"),
	    "title" : "Red Dog",
	    "year" : 2011
      }
      {
	    "_id" : ObjectId("573a13b8f29313caabd4d58c"),
	    "title" : "Jack and Jill",
	    "year" : 2011
      }
      {
	    "_id" : ObjectId("573a13b8f29313caabd4d5b5"),
	    "year" : 2011,
	    "title" : "Take Me Home Tonight"
      }

Find the sessions details for a user specified by ID.

.. io-code-block::
   :copyable: true
      
   .. input:: 
      :language:  json
      :linenos: 

      db.sessions.find({"user_id": "t3qulfeem@kwiv5.6ur"})

   .. output:: 
      :language: json
      :linenos:

      { 
          "_id" : ObjectId("5a97f9c91c807bb9c6eb5fb4"), 
          "user_id" : "t3qulfeem@kwiv5.6ur", 
          "jwt" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NieyJpYXQiOjE1MTk5MDkzMjEsIm5iZiI6MTUxOTkwOTMyMSwianRpIjoiNmJlZDAwMWYtNTFiYi00NzVhLTgAtMDcwNGE5Mjk0MWZlIiwiZXhwIjoxNTE5OTEwMjIxLCJpZGVudGl0eSI6eyJlbWFpbCI6InQzcXVsZmVlbd2l2NS42dXIiLCJuYW1lIjoiM2lveHJtZnF4IiwicGFzc3dvcmQiOm51bGx9LCJmcmVzaCI6ZmFsc2UsInRUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJ1c2VyIjp7ImVtYWlsIjoidDNxdWxmZWVtQGt3aXY1LjZ1cIm5hbWUiOiIzaW94cm1mcXgiLCJwYXNzd29yZCI6bnVsbH19ejtr_NyZyBronWMKuE0RFTjWej--T0zGrdc_iymGtVs" 
      }

Find the theater specified by its ``id`` and ``zipcode``.

.. io-code-block::
   :copyable: true
      
   .. input:: 
      :language:  json
      :linenos: 

      db.theaters.findOne({$and: [{"_id": ObjectId("59a47286cfa9a3a73e51e763")}, {"location.address.zipcode": "93933"}]})
               
   .. output:: 
      :language: json
      :linenos:

      {
	    "_id" : ObjectId("59a47286cfa9a3a73e51e763"),
	    "theaterId" : 1061,
	    "location" : {
		    "address" : {
			    "street1" : "101 General Stillwell Dr",
			    "city" : "Marina",
			    "state" : "CA",
			    "zipcode" : "93933"
		    },
		    "geo" : {
			    "type" : "Point",
			    "coordinates" : [
				    -121.81196,
				    36.66708
			    ]
		  }
	    }
      }

Find all users whose last name is ``Lannister`` and limit the 
number of documents returned to ``5``.

.. io-code-block::
   :copyable: true
      
   .. input:: 
      :language:  json
      :linenos: 
      
      db.users.find({ name: /Lannister/ }).limit(5)

   .. output:: 
      :language: json
      :linenos:

      {
	    "_id" : ObjectId("59b99db5cfa9a34dcd7885b8"),
	    "name" : "Jaime Lannister",
	    "email" : "nikolaj_coster-waldau@gameofthron.es",
	    "password" : "$2b$12$6vz7wiwO.EI5Rilvq1zUc./9480gb1uPtXcahDxIadgyC3PS8XCUK"
      }
      {
	    "_id" : ObjectId("59b99db6cfa9a34dcd7885ba"),
	    "name" : "Cersei Lannister",
	    "email" : "lena_headey@gameofthron.es",
	    "password" : "$2b$12$FExjgr7CLhNCa.oUsB9seub8mqcHzkJCFZ8heMc8CeIKOZfeTKP8m"
      }
      {
	    "_id" : ObjectId("59b99dbdcfa9a34dcd7885c7"),
	    "name" : "Tyrion Lannister",
	    "email" : "peter_dinklage@gameofthron.es",
	    "password" : "$2b$12$xtHwQNXYlQzP2REobUDlzuQimjzBlXrTx1GnwP.xkfULeuuUpRxa2"
      }
      {
	    "_id" : ObjectId("59b99dc2cfa9a34dcd7885d2"),
	    "name" : "Tywin Lannister",
	    "email" : "charles_dance@gameofthron.es",
	    "password" : "$2b$12$/i04T5yEJvmsBhF0Jd.kJOk3ZhRzezbTU7ASEM5o43Xxsa4o6IgEy"
      }
      {
	    "_id" : ObjectId("59b99dcecfa9a34dcd7885ea"),
	    "name" : "Lancel Lannister",
	    "email" : "eugene_simon@gameofthron.es",
	    "password" : "$2b$12$mNWiHoOqOWQser3s6ezqZeTU5vhskTq.K7xkeTA2P.CIfoWsHvonO"
      }
