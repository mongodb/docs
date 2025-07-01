.. procedure:: 
   :style: normal

   .. step:: Connect to your {+cluster+} using {+mongosh+}. 

      Open {+mongosh+} in a terminal window and connect to your 
      {+cluster+}. For detailed instructions on connecting, see 
      :ref:`connect-mongo-shell`.

   .. step:: Use the ``sample_mflix`` database. 

      Run the following command at {+mongosh+} prompt:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: sh

            use sample_mflix 

         .. output:: 
            :language: sh
            :emphasize-lines: 1 

            switched to db sample_mflix

   .. step:: Run the following |fts| queries against the ``movies`` collection.

      .. tabs:: 

         .. tab:: toArray() Method 
            :tabid: toArray

            In the following query, use the :manual:`toArray()
            </reference/method/cursor.toArray/>` method to iterate the
            cursor and return the documents that match the query
            criteria in an array.   

            .. io-code-block:: 
               :copyable: true 

               .. input:: 
                  :language: json 
                  :linenos:

                  db.movies.aggregate([
                    {
                      "$search": {
                        "index": "iterate-cursor-tutorial",
                        "text": {
                          "query": "summer",
                          "path": "title"
                        }
                      }
                   },
                    {
                      "$project": {
                        "_id": 0,
                        "title": 1
                      }
                    }
                  ]).toArray()

               .. output:: 
                  :language: json
                  :visible: true
                  :linenos:

                  [
                    { title: 'Summer' },
                    { title: 'Summer Stock' },
                    { title: 'Violent Summer' },
                    { title: 'Indian Summer' },
                    { title: 'Indian Summer' },
                    { title: 'Summer Rental' },
                    { title: 'Summer Things' },
                    { title: 'Wolf Summer' },
                    { title: 'Summer Storm' },
                    { title: 'Summer Palace' },
                    { title: 'Eternal Summer' },
                    { title: 'Summer Holiday' },
                    { title: 'Summer Wars' },
                    { title: 'Summer Games' },
                    { title: 'Summer Nights' },
                    { title: 'A Summer Place' },
                    { title: 'Summer and Smoke' },
                    { title: 'The Endless Summer' },
                    { title: "Summer of '42" },
                    { title: 'That Certain Summer' },
                    { title: 'One Deadly Summer' },
                    { title: 'Summer Camp Nightmare' },
                    { title: 'An Unforgettable Summer' },
                    { title: 'Summer of Sam' },
                    { title: 'Bullets Over Summer' },
                    { title: 'Summer in Berlin' },
                    { title: 'A Plumm Summer' },
                    { title: 'Summer Heights High' },
                    { title: 'Summer of Goliath' },
                    { title: 'Red Hook Summer' },
                    { title: 'Ping Pong Summer' },
                    { title: 'Summer of Blood' },
                    { title: 'The End of Summer' },
                    { title: 'Summer Wishes, Winter Dreams' },
                    { title: "A Summer at Grandpa's" },
                    { title: 'Cold Summer of 1953' },
                    { title: 'A Brighter Summer Day' },
                    { title: 'Summer of the Monkeys' },
                    { title: 'A Storm in Summer' },
                    { title: 'Wet Hot American Summer' },
                    { title: 'My Summer of Love' },
                    { title: 'Nasu: Summer in Andalusia' },
                    { title: 'A Summer in Genoa' },
                    { title: '(500) Days of Summer' },
                    { title: 'Summer Days with Coo' },
                    { title: 'The Kings of Summer' },
                    { title: 'May in the Summer' },
                    { title: 'A Horse for Summer' },
                    { title: 'The Summer of Sangaile' },
                    { title: 'Smiles of a Summer Night' },
                    { title: 'Shadows of a Hot Summer' },
                    { title: 'That Summer of White Roses' },
                    { title: 'Last Summer in the Hamptons' },
                    { title: 'A Summer in La Goulette' },
                    { title: 'A Summer by the River' },
                    { title: 'Summer in the Golden Valley' },
                    { title: 'How I Ended This Summer' },
                    { title: 'And They Call It Summer' },
                    { title: 'Spring, Summer, Fall, Winter... and Spring' },
                    { title: 'The Last Summer of La Boyita' },
                    { title: 'The Mafia Only Kills in Summer' },
                    { title: 'I Know What You Did Last Summer' },
                    { title: 'I Know What You Did Last Summer' },
                    { title: 'Judy Moody and the Not Bummer Summer' },
                    { title: 'I Still Know What You Did Last Summer' }
                  ]

         .. tab:: forEach() Method
            :tabid: foreach

            In the following query, use the :manual:`forEach()
            </reference/method/cursor.forEach/>` method to iterate the
            cursor and apply the JavaScript function ``printjson`` to
            each document. 

            .. io-code-block:: 
               :copyable: true 

               .. input:: 
                  :language: json 
                  :linenos:

                  db.movies.aggregate([
                    {
                      "$search": {
                        "index": "iterate-cursor-tutorial",
                        "text": {
                          "query": "summer",
                          "path": "title"
                        }
                      }
                   },
                    {
                      "$project": {
                        "_id": 0,
                        "title": 1
                      }
                    }
                  ]).forEach(printjson)

               .. output:: 
                  :language: json
                  :visible: true
                  :linenos: 

                  {
                    title: 'Summer'
                  }
                  {
                    title: 'Summer Stock'
                  }
                  {
                    title: 'Violent Summer'
                  }
                  {
                    title: 'Indian Summer'
                  }
                  {
                    title: 'Indian Summer'
                  }
                  {
                    title: 'Summer Rental'
                  }
                  {
                    title: 'Summer Things'
                  }
                  {
                    title: 'Wolf Summer'
                  }
                  {
                    title: 'Summer Storm'
                  }
                  {
                    title: 'Summer Palace'
                  }
                  {
                    title: 'Eternal Summer'
                  }
                  {
                    title: 'Summer Holiday'
                  }
                  {
                    title: 'Summer Wars'
                  }
                  {
                    title: 'Summer Games'
                  }
                  {
                    title: 'Summer Nights'
                  }
                  {
                    title: 'A Summer Place'
                  }
                  {
                    title: 'Summer and Smoke'
                  }
                  {
                    title: 'The Endless Summer'
                  }
                  {
                    title: "Summer of '42"
                  }
                  {
                    title: 'That Certain Summer'
                  }
                  {
                    title: 'One Deadly Summer'
                  }
                  {
                    title: 'Summer Camp Nightmare'
                  }
                  {
                    title: 'An Unforgettable Summer'
                  }
                  {
                    title: 'Summer of Sam'
                  }
                  {
                    title: 'Bullets Over Summer'
                  }
                  {
                    title: 'Summer in Berlin'
                  }
                  {
                    title: 'A Plumm Summer'
                  }
                  {
                    title: 'Summer Heights High'
                  }
                  {
                    title: 'Summer of Goliath'
                  }
                  {
                    title: 'Red Hook Summer'
                  }
                  {
                    title: 'Ping Pong Summer'
                  }
                  {
                    title: 'Summer of Blood'
                  }
                  {
                    title: 'The End of Summer'
                  }
                  {
                    title: 'Summer Wishes, Winter Dreams'
                  }
                  {
                    title: "A Summer at Grandpa's"
                  }
                  {
                    title: 'Cold Summer of 1953'
                  }
                  {
                    title: 'A Brighter Summer Day'
                  }
                  {
                    title: 'Summer of the Monkeys'
                  }
                  {
                    title: 'A Storm in Summer'
                  }
                  {
                    title: 'Wet Hot American Summer'
                  }
                  {
                    title: 'My Summer of Love'
                  }
                  {
                    title: 'Nasu: Summer in Andalusia'
                  }
                  {
                    title: 'A Summer in Genoa'
                  }
                  {
                    title: '(500) Days of Summer'
                  }
                  {
                    title: 'Summer Days with Coo'
                  }
                  {
                    title: 'The Kings of Summer'
                  }
                  {
                    title: 'May in the Summer'
                  }
                  {
                    title: 'A Horse for Summer'
                  }
                  {
                    title: 'The Summer of Sangaile'
                  }
                  {
                    title: 'Smiles of a Summer Night'
                  }
                  {
                    title: 'Shadows of a Hot Summer'
                  }
                  {
                    title: 'That Summer of White Roses'
                  }
                  {
                    title: 'Last Summer in the Hamptons'
                  }
                  {
                    title: 'A Summer in La Goulette'
                  }
                  {
                    title: 'A Summer by the River'
                  }
                  {
                    title: 'Summer in the Golden Valley'
                  }
                  {
                    title: 'How I Ended This Summer'
                  }
                  {
                    title: 'And They Call It Summer'
                  }
                  {
                    title: 'Spring, Summer, Fall, Winter... and Spring'
                  }
                  {
                    title: 'The Last Summer of La Boyita'
                  }
                  {
                    title: 'The Mafia Only Kills in Summer'
                  }
                  {
                    title: 'I Know What You Did Last Summer'
                  }
                  {
                    title: 'I Know What You Did Last Summer'
                  }
                  {
                    title: 'Judy Moody and the Not Bummer Summer'
                  }
                  {
                    title: 'I Still Know What You Did Last Summer'
                  }
