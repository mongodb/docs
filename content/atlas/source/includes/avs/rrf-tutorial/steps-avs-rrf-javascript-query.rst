.. procedure:: 
   :style: normal

   .. step:: Define the combined query pipeline. 

      Create a file called ``combined-query.js``, and paste the following
      code into it:

      .. literalinclude:: /includes/avs/rrf-tutorial/combined-query.js
         :language: javascript
         :linenos:

   .. step:: Execute the code to run the queries against the ``embedded_movies`` collection.

      .. io-code-block:: 
         :copyable: true 

         .. input::
            :language: shell

            node --env-file=.env combined-query.js

         .. output:: /includes/avs/rrf-tutorial/shell-query-output.js
            :language: js
            :visible: true

      If you sort the results in ascending order by replacing the value
      of ``score`` on line 124 with ``1``, {+avs+} returns the following
      results: 

      .. literalinclude:: /includes/avs/rrf-tutorial/shell-query-output-ascending.js
         :language: js
