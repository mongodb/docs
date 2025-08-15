a. Install the MongoDB Python Driver.

   .. code-block:: shell

      pip install pymongo

   For detailed installation instructions, see 
   :ref:`MongoDB Python Driver (PyMongo) <pymongo-get-started-download-and-install>`.

#. Create the index.

   .. tabs::

      .. tab:: autocomplete
         :tabid: autocomplete

         Create a file named ``create_auto_complete_index.py`` and paste the following code:

         .. literalinclude:: /includes/fts/partial-match/createAutoCompleteIndex.py
            :copyable: true
            :language: python

      .. tab:: string
         :tabid: string

         Create a file named ``create_string_index.py`` and paste the following code:

         .. literalinclude:: /includes/fts/partial-match/createStringIndex.py
            :copyable: true
            :language: python

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Run the script.

   .. code-block:: shell

      python create_auto_complete_index.py
      # or
      python create_string_index.py