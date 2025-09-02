Create the |fts| Index for Facet 
--------------------------------

In this section, you will create an |fts| index on the ``genres``, 
``year``, and ``released`` fields in the ``sample_mflix.movies`` 
collection. 

.. procedure::
   :style: normal

   .. step:: Initialize your Node.js project.

      .. literalinclude:: /includes/fts/field-types/initialize-project-node.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see the
      :driver:`MongoDB Node Driver documentation </node/current>`.

   .. step:: Define the index.

      Create a ``create-index.js`` file in your project directory, 
      and copy and paste the following code into the file.   
   
      .. literalinclude:: /includes/fts/tutorials/facet/create-index.js
         :caption: create-index.js
         :language: javascript
         :copyable:
         :linenos:

      .. include:: /includes/fts/field-types/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-index.js

         .. output::
            :visible: false

            New index name: facet-tutorial