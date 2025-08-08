Use Dynamic Mappings
--------------------

.. include:: /includes/fts/synonyms/dynamic-intro.rst

.. procedure::
   :style: normal

   .. step:: Set up your application.

      To learn how to install the driver and configure your Python application, see the
      :driver:`Get Started </python/pymongo-driver/current/get-started/>`
      tutorial in the MongoDB Python Driver documentation.

   .. step:: Define the index.

      Create a ``create-dynamic-index.py`` file in your project directory,
      and copy and paste the following code into the file.

      .. literalinclude:: /includes/fts/synonyms/create-dynamic-index.py
         :caption: create-dynamic-index.py
         :language: python
         :copyable:
         :linenos:

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python create-dynamic-index.py

         .. output::
            :visible: false

            New index name: default