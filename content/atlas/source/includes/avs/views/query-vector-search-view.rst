.. step:: Run a query on the ``embeddingsIndex`` partial index.

   .. include:: /includes/search-shared/fact-partial-indexing-query.rst

   a. Save the following embeddings in a file named ``query-embeddings.js``:

      .. literalinclude:: /includes/avs/pipeline-stage/examples/basic-query-embeddings.js 
         :language: javascript
         :copyable: true 

      This file contains the embeddings for the query term ``time travel``.

   #. In {+mongosh+}, load the file into {+mongosh+} to use the embeddings in your query:
   
      .. code-block:: javascript 

         load('/<path-to-file>/query-embeddings.js');

   #. Run the following query:

      .. io-code-block::
         :copyable: true 
         
         .. input:: 
            :language: sh
            :linenos:

            use sample_mflix
            db.moviesWithEmbeddings.aggregate([
              {
                "$vectorSearch": {
                  "index": "embeddingsIndex",
                  "path": "plot_embedding_voyage_3_large",
                  "queryVector": TIME_TRAVEL_EMBEDDING,
                  "numCandidates": 100,
                  "limit": 10
                }
              },
              {
                "$project": {
                  "_id": 0,
                  "plot": 1,
                  "title": 1,
                }
              }
            ])

         .. output::
            :language: sh
            :visible: false

            [
              {
                plot: 'At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.',
                title: 'About Time'
              },
              {
                plot: 'A psychiatrist makes multiple trips through time to save a woman that was murdered by her brutal husband.',
                title: 'Retroactive'
              },
              {
                plot: 'A time-travel experiment in which a robot probe is sent from the year 2073 to the year 1973 goes terribly wrong thrusting one of the project scientists, a man named Nicholas Sinclair into a...',
                title: 'A.P.E.X.'
              },
              {
                plot: 'An officer for a security agency that regulates time travel, must fend for his life against a shady politician who has a tie to his past.',
                title: 'Timecop'
              },
              {
                plot: 'After visiting 2015, Marty McFly must repeat his visit to 1955 to prevent disastrous changes to 1985... without interfering with his first trip.',
                title: 'Back to the Future Part II'
              },
              {
                plot: 'A reporter, learning of time travelers visiting 20th century disasters, tries to change the history they know by averting upcoming disasters.',
                title: 'Thrill Seekers'
              },
              {
                plot: 'Lyle, a motorcycle champion is traveling the Mexican desert, when he find himself in the action radius of a time machine. So he find himself one century back in the past between rapists, ...',
                title: 'Timerider: The Adventure of Lyle Swann'
              },
              {
                plot: 'Hoping to alter the events of the past, a 19th century inventor instead travels 800,000 years into the future, where he finds humankind divided into two warring races.',
                title: 'The Time Machine'
              },
              {
                plot: 'A romantic drama about a Chicago librarian with a gene that causes him to involuntarily time travel, and the complications it creates for his marriage.',
                title: "The Time Traveler's Wife"
              },
              {
                plot: 'A modern aircraft carrier is thrown back in time to 1941 near Hawaii, just hours before the Japanese attack on Pearl Harbor.',
                title: 'The Final Countdown'
              }
            ]
