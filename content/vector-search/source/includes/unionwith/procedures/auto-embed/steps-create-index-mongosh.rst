.. procedure::
   :style: normal

   .. step:: Connect to the cluster using {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your |service|
      cluster. For detailed instructions on connecting, see
      :ref:`Connect via mongosh <connect-mongo-shell>`.

   .. step:: Switch to the database that contains the collection for which you want to create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            use sample_mflix

         .. output::
            :language: shell

            switched to db sample_mflix

   .. step:: Run the ``db.collection.createSearchIndex()``.

      a. To create the ``autoEmbed`` type index, run the following 
         ``db.collection.createSearchIndex()`` method:

         .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/shell/auto-embed-index-definition.sh
            :language: shell
            :copyable: true
            :linenos:

         .. include:: /includes/unionwith/facts/auto-embed/index-definition-auto-embed.rst

      #. To create the ``vector`` type index, run the following 
         ``db.collection.createSearchIndex()`` method:

         .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/shell/vector-index-definition.sh
            :language: shell
            :copyable: true
            :linenos:

         .. include:: /includes/unionwith/facts/auto-embed/index-definition-vector.rst
