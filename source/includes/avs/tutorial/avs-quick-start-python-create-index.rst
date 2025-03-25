a. Add the PyMongo Driver as a dependency in your project:

   .. code-block:: sh

      pip install pymongo

   For more detailed installation instructions, see the 
   :ref:`MongoDB Python Driver documentation <pymongo-get-started-download-and-install>`.

#. Define the index.

   Create a file named ``vector-index.py``. Copy and paste the following
   code into the file.

   ..
      NOTE: If you edit this Python file, also update the Jupyter Notebook
      at https://github.com/mongodb/docs-notebooks/blob/main/get-started/quick-start.ipynb

   .. literalinclude:: /includes/avs/index-management/create-index/basic-example.py
      :language: python
      :copyable: true
      :caption: vector-index.py
      :emphasize-lines: 6
      :linenos:

   .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst

   This code also includes a polling mechanism to check if the index is ready to use.

#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Run the following command to create the index.

   .. io-code-block::
      :copyable: true 

      .. input:: 
         :language: shell 

         python vector-index.py

      .. output:: /includes/avs/index-management/create-index/create-index-output.sh
         :language: console
