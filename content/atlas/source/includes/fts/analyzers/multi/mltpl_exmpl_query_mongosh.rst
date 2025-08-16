.. io-code-block:: 
   :copyable: true

   .. input:: 
      :language: javascript
      :linenos:

      db.movies.aggregate([
        {
          "$search": {
            "text": {
              "query": "revolution",
              "path": ["title", "plot",
                { "value": "title", "multi": "frenchAnalyzer" },
                {  "value": "plot", "multi": "frenchAnalyzer" }
              ]
            }
          }
        }, 
        {
          "$limit": 5
        },
        { 
          "$project": { 
            "title": 1,
            "plot": 1,
            "year": 1,
            "_id": 0 
          } 
        }
      ])

   .. output:: 
      :language: json
      :visible: false

      [
        {
          year: 2012,
          plot: 'REVOLUTION is a film about changing the world, going for it, taking a stand, and fighting for something. A true-life adventure following Director, Rob Stewart (SHARKWATER) over four years ...',
          title: 'Revolution'
        },
        {
          plot: 'New York trapper Tom Dobb becomes an unwilling participant in the American Revolution after his son Ned is drafted into the Army by the villainous Sergeant Major Peasy. Tom attempts to find...',
          title: 'Revolution',
         year: 1985
        },
        {
          plot: "Together with five Soviet avant-garde artists, hero of the Russian revolution Polina Schneider travels to Siberia to 'civilize' the native Khanty and Nenets tribes, for whom interaction ...",
          title: 'Angels of Revolution',
          year: 2014
        },
        {
          plot: 'Two mismatched sets of identical twins - one aristocrat, one peasant - mistakenly exchange identities on the eve of the French Revolution.',
          title: 'Start the Revolution Without Me',
          year: 1970
        },
        {
          plot: "A history of the French Revolution from the decision of the king to convene the Etats-Generaux in 1789 in order to deal with France's debt problem. The first part of the movie tells the ...",
          title: 'La rèvolution franèaise',
          year: 1989
        }
      ]