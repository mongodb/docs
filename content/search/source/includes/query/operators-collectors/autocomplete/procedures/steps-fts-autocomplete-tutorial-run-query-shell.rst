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
      
   .. step:: Run a |fts| query with the ``autocomplete`` operator on the ``movies`` collection.
      The following query searches for movies with the characters ``ger`` in
      the ``title`` field. The query includes the :pipeline:`$limit` stage to limit 
      the output to 20 results and the :pipeline:`$project` stage to exclude all 
      fields except ``title``.
      
      .. io-code-block::
         :copyable: true 
      
         .. input:: /includes/query/operators-collectors/autocomplete/code-snippets/shell/tutorial-shell.js
            :language: js
            :dedent:
            
         .. output::
            :language: json
            :visible: true
            
            { title: "Gertie the Dinosaur" },
            { title: "Germany Year Zero" },
            { title: "Germany in Autumn" },
            { title: "Germany Pale Mother" },
            { title: "Gerhard Richter - Painting" },
            { title: "Geronimo: An American Legend" },
            { title: "How to Live in the German Federal Republic" },
            { title: "Geri's Game" },
            { title: "The Gerson Miracle" },
            { title: "The German Doctor" },
            { title: "From Caligari to Hitler: German Cinema in the Age of the Masse"},
            { title: "From Caligari to Hitler: German Cinema in the Age of the Masses"},
            { title: "Gèraldine" },
            { title: "Gervaise" },
            { title: "Gertrud" },
            { title: "Germinal" },
            { title: "Gerry" },
            { title: "Gerontophilia" },
            { title: "Pionery-geroi" },
            { title: "The Good German" }
      
