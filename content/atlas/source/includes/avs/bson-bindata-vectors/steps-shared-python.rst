.. step:: Install the required libraries.

    Run the following command to install Voyage AI and the
    :driver:`PyMongo Driver </pymongo/>`. You must install
    :driver:`PyMongo </pymongo/>` v4.10 or later driver.

    .. code-block:: shell 

       pip install --quiet --upgrade voyageai pymongo 
        
    This operation might take a few minutes to complete.

.. step:: Define the functions to generate embeddings from your data. 
    
    In this step, you define functions for the following purposes:
    
    - Generate embeddings by using Voyage AI.
    - Convert embeddings to |bson| vectors by using the :driver:`PyMongo </pymongo/>`
      driver. 

    Copy, paste, and run the sample code below after replacing the
    following placeholder value (highlighted in the code):

    .. list-table:: 
       :widths: 30 70 
       :header-rows: 1

       * - Placeholder 
         - Valid Value 

       * - ``<VOYAGE-API-KEY>``
         - Voyage AI API key to use for generating embeddings. 

    .. literalinclude:: /includes/avs/bson-bindata-vectors/python/define-embeddings-functions.py 
        :copyable: true
        :language: python 
        :linenos: 
        :emphasize-lines: 6
