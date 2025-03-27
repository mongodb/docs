.. procedure::
   :style: normal

   .. step:: Create a file named ``create-index.js``.
   
   .. step:: Copy and paste the following code into the ``create-index.js`` file.
      
      .. literalinclude:: /includes/fts/search-index-management/create-index-tutorial.js
         :caption: create-index.js
         :language: javascript
         :copyable:
      
   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Create the index.

      To create the index, run the following command:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-index.js

         .. output::

            default
