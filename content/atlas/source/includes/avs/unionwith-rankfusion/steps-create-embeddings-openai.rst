.. procedure:: 
   :style: normal 

   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension, and then run the 
      following command in the notebook to install the dependencies:

      .. code-block:: python

         pip install --quiet --upgrade openai pymongo

   .. step:: Define and use a function to generate vector embeddings.

      Paste and run the following code in your notebook after replacing
      the following placeholder values: 

      .. list-table:: 
         :stub-columns: 1

         * - ``<api-key>`` 
           - Your OpenAI |api| key (line 6).
      
         * - ``<connection-string>``
           - Your MongoDB cluster connection string (line 18). 
      
      The following code defines a function that generates vector
      embeddings by using a proprietary embedding model from 
      `OpenAI <http://openai.com>`__. Specifically, this code does the
      following: 

      - Specifies the ``text-embedding-3-large`` embedding model.
      - Creates a function named ``get_embedding()`` that calls the model's |api|
        to generate an embedding for a given text input.
      - Connects to the cluster and fetches ``3500`` documents
        from the ``sample_mflix.embedded_movies`` namespace.
      - Generates embeddings from each document's ``title`` field by
        using the ``get_embedding()`` function. 
      - Updates each document with a new field named ``title_embedding``
        that contains the embedding value by using the MongoDB PyMongo
        Driver.  

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: /includes/avs/unionwith-rankfusion/generate-embeddings-openai.py
            :language: python
            :linenos: 

         .. output:: 
            :language: sh

            Updated 3500 documents.
            
      .. note::

         It might take up to 15 minutes for the operation to complete.