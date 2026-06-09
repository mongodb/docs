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
      
      .. include:: /includes/query/operators-collectors/autocomplete/facts/fts-autocomplete-stages.rst 
      
      To run this query in |compass|:
      
      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the following 
         pipeline stages by selecting the stage from the dropdown and adding
         the query for that stage. Click :guilabel:`Add Stage` to add 
         additional stages.
      
         .. include:: /includes/query/operators-collectors/autocomplete/code-snippets/compass/tutorial.rst
      
      If you enabled :guilabel:`Auto Preview`, |compass| displays the 
      following documents next to the ``$autocomplete`` pipeline stage:
      
      .. code-block:: javascript
         :copyable: false
         :linenos:
      
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
      
