Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Initialize your Node.js project.

      .. literalinclude:: /includes/index/shared/code-snippets/initialize-project-node.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see the
      :driver:`MongoDB Node Driver documentation </node/current>`.

   .. step:: Define the index.

      Create a ``create-index.js`` file in your project directory, 
      and copy and paste the following code into the file.   
   
      .. literalinclude:: /includes/index/field-types/document/code-snippets/nodejs/create-index.js
         :caption: create-index.js
         :language: javascript
         :copyable:
         :linenos:

      .. include:: /includes/index/shared/facts/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-index.js

         .. output::

            New index name: default
