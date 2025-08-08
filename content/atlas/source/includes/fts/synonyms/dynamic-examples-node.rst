Use Dynamic Mappings
--------------------

.. include:: /includes/fts/synonyms/dynamic-intro.rst

.. procedure::
   :style: normal

   .. step:: Set up your application.

      To learn how to install the driver and configure your Node.js application, see the
      :driver:`Get Started </node/current/get-started/>`
      tutorial in the MongoDB Node.js Driver documentation.

   .. step:: Define the index.

      Create a ``create-dynamic-index.js`` file in your project directory,
      and copy and paste the following code into the file.

      .. literalinclude:: /includes/fts/synonyms/create-dynamic-index.js
         :caption: create-dynamic-index.js
         :language: javascript
         :copyable:
         :linenos:

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-dynamic-index.js

         .. output::

            New index name: default