.. procedure:: 
   :style: normal

   .. step:: Connect to your {+cluster+} using {+mongosh+}. 

      Open {+mongosh+} in a terminal window and connect to your 
      {+cluster+}. For detailed instructions on connecting, see 
      :doc:`/mongo-shell-connection`.

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

   .. step:: Run the following |fts| queries against the ``embedded_movies`` collection.

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/avs-examples/rrf-tutorial/query.sh
            :language: js 
            :linenos:

         .. output:: /includes/avs-examples/rrf-tutorial/shell-query-output.js
            :language: js
            :visible: true

      If you sort the results in ascending order by replacing the value
      of ``score`` on line 117 with ``1``, {+avs+} returns the following
      results: 

      .. literalinclude:: /includes/avs-examples/rrf-tutorial/shell-query-output-ascending.js
         :language: js
