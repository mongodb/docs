.. procedure::
   :style: normal
      
   .. step:: Connect to your cluster in {+mongosh+}.
      
      Open {+mongosh+} in a terminal window and
      connect to your cluster. For detailed instructions on connecting,
      see :ref:`connect-mongo-shell`.
      
   .. step:: Use the ``sample_mflix`` database.
      
      Run the following command at {+mongosh+} prompt:
      
      .. code-block:: javascript
      
         use sample_mflix
      
   .. step:: Run a |fts| query with the ``compound`` and ``autocomplete`` operators on the ``movies`` collection.
      The following query searches for movies with the characters ``pri`` in
      the ``title`` and ``plot`` field. The query includes the :pipeline:`$limit` 
      stage to limit the output to five results and the :pipeline:`$project` stage 
      to exclude all fields except ``title`` and ``plot``.
      
      .. io-code-block::
         :copyable: true 
      
         .. input:: /includes/query/operators-collectors/autocomplete/code-snippets/shell/tutorial-multi-shell.js
            :linenos:
            :language: js
            
         .. output::
            :language: json
            :visible: true
            
            {
              plot: 'Prison Terminal: The Last Days of Private Jack Hall is a moving cinema verite documentary that breaks through the walls of one of Americas oldest maximum security prisons to tell the story ...',
              title: 'Prison Terminal: The Last Days of Private Jack Hall'
            }
            {
              plot: 'Now settled in Genovia, Princess Mia faces a new revelation: she is being primed for an arranged marriage to an English suitor.',
              title: 'The Princess Diaries 2: Royal Engagement'
            }
            {
              plot: 'A young fugitive prince and princess must stop a villain who unknowingly threatens to destroy the world with a special dagger that enables the magic sand inside to reverse time.',
              title: 'Prince of Persia: The Sands of Time'
            }
            {
              plot: 'The first wedding anniversary of Princess Odette and Prince Derek is distracted by field fires set by Knuckles. His master Clavius, wants to conquer the world, and he needs to capture a ...',
              title: 'The Swan Princess: Escape from Castle Mountain'
            }
            {
              plot: "Jane Austen's classic novel about the prejudice that occurred between the 19th century classes and the pride which would keep lovers apart.",
              title: 'Pride and Prejudice'
            }
      
