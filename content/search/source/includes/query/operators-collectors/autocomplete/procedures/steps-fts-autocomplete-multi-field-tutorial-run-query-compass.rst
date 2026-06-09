.. procedure::
   :style: normal
      
   .. step:: Connect to your cluster in |compass|.
      
      Open |compass| and
      connect to your cluster. For detailed instructions on connecting,
      see :ref:`atlas-connect-via-compass`.
      
   .. step:: Use the ``movies`` collection in the ``sample_mflix`` database.
      
      On the :guilabel:`Database` screen, click the ``sample_mflix``
      database, then click the ``movies`` collection.
      
   .. step:: Run a |fts| query with the ``autocomplete`` operator on the ``movies`` collection.
      The query uses the following pipeline stages:
      
      .. include:: /includes/query/operators-collectors/autocomplete/facts/fts-autocomplete-advanced-stages.rst 
      
      To run this query in |compass|:
      
      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the following 
         pipeline stages by selecting the stage from the dropdown and adding
         the query for that stage. Click :guilabel:`Add Stage` to add 
         additional stages.
      
         .. include:: /includes/query/operators-collectors/autocomplete/code-snippets/compass/tutorial-multi.rst
      
      If you enabled :guilabel:`Auto Preview`, |compass| displays the 
      following documents next to the ``$autocomplete`` pipeline stage:
      
      .. code-block:: javascript
         :copyable: false
         :linenos:
      
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
      
