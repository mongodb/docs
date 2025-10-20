Procedure
~~~~~~~~~

Create an interactive Python notebook by saving a file with
the ``.ipynb`` extension, and then perform the following
steps in the notebook. To try the example, replace the
placeholders with valid values.

..
  NOTE: If you edit the Python code in this section, you must update the Jupyter Notebook
  at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb 

.. cta-banner::
   :url: https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb
   :icon: Code

   Work with a runnable version of this tutorial as a :github:`Python notebook <mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb>`.

.. procedure:: 
   :style: normal 

   .. include:: /includes/avs/bson-bindata-vectors/steps-shared-python.rst 

   .. step:: Connect to the cluster and retrieve existing data. 

      You must provide the following: 
      
      - Connection string to connect to your cluster that
        contains the database and collection for which you want to
        generate embeddings.
      - Name of the database that contains the collection for which you
        want to generate embeddings.
      - Name of the collection for which you want to generate embeddings.

      To retrieve the data, copy, paste, and run the sample code below
      after replacing the placeholder values (highlighted in the code):

      .. list-table:: 
         :widths: 30 70 
         :header-rows: 1

         * - Placeholder 
           - Valid Value 

         * - ``<CONNECTION-STRING>``
           - Cluster connection string. To learn more, see
             :ref:`connect-via-driver`.  

         * - ``<DATABASE-NAME>``
           - Name of the database that contains the collection for which
             you want to generate and convert embeddings. For this
             example, specify ``sample_airbnb``.

         * - ``<COLLECTION-NAME>``
           - Name of the collection for which you want to generate and
             convert embeddings. For this example, specify
             ``listingsAndReviews``. 

         * - ``<TEXT-FIELD-NAME>``
           - Name of the text field for which you want to generate
             embeddings. For this example, specify ``summary``.

      .. literalinclude:: /includes/avs/bson-bindata-vectors/python/load-existing-data.py
         :copyable: true 
         :language: python
         :linenos:
         :emphasize-lines: 4-6, 9

   .. step:: Generate, convert, and load embeddings into your collection. 

      The sample code performs the following actions:
     
      a. Generates embeddings from your data using any embedding 
         model if your data doesn't already have embeddings. To learn 
         more about generating embeddings from your data, see 
         :ref:`create-vector-embeddings`. 
      #. Converts the embeddings to |bson| vectors (as shown 
         on line 7 in the following example). 
      #. Uploads the embeddings to your collection on your cluster.

      These operation might take a few minutes to complete.

      Copy, paste, and run the code below after replacing the following
      placeholder values (highlighted in the code):

      .. list-table:: 
         :widths: 30 70 
         :header-rows: 1

         * - Placeholder 
           - Valid Value 

         * - ``<EMBEDDING-MODEL>``
           - Embedding model to use for generating the embeddings. For
             this example, specify ``voyage-3-large``. 

         * - ``<NUMBER-OF-DIMENSIONS>``
           - Number of dimensions for the resulting output embeddings.
             For this example, specify ``1024``.

         * - ``<FIELD-NAME-FOR-FLOAT32-TYPE>``
           - Name of field with ``float32`` values.

         * - ``<FIELD-NAME-FOR-INT8-TYPE>``
           - Name of field with ``int8`` values.

         * - ``<FIELD-NAME-FOR-INT1-TYPE>``
           - Name of field with ``int1`` values. 

         * - ``<EMBEDDING-MODEL>``
           - Embedding model to use for generating the embeddings. For
             this example, specify ``voyage-3-large``.

         * - ``<TEXT-FIELD-NAME>``
           - Name of the text field for which you generated
             embeddings. For this example, specify ``summary``.

      .. literalinclude:: /includes/avs/bson-bindata-vectors/python/generate-embeddings-existing-data.py 
         :copyable: true 
         :language: python
         :linenos:
         :emphasize-lines: 1-5, 10

   .. step:: Create the {+avs+} index on the collection.

      You can create {+avs+} indexes by using the {+atlas-ui+},
      {+atlas-cli+}, {+atlas-admin-api+}, and MongoDB drivers. To learn
      more, see :ref:`avs-types-vector-search`. 

      To create the index, copy, paste, and run the sample code below after
      replacing the following placeholder value (highlighted in the code):  

      .. list-table:: 
         :widths: 30 70 
         :header-rows: 1

         * - Placeholder 
           - Valid Value 

         * - ``<INDEX-NAME>``
           - Name of ``vector`` type index. 
            
      .. io-code-block::  
         :copyable: true 

         .. input:: /includes/avs/bson-bindata-vectors/python/create-index-new-data.py
            :language: python 
            :linenos:
            :emphasize-lines: 5

         .. output:: 
            :language: shell 
            :visible: false

            New search index named <INDEX-NAME> is building.
            Polling to check if the index is ready. This may take up to a minute.
            <INDEX-NAME> is ready for querying.

   .. step:: Run {+avs+} queries on the collection. 

      a. Define a function to run a vector search query.

         The function to run {+avs+} queries performs the following
         actions:
         
         - Generates embeddings using Voyage AI for the query text.
         - Converts the embeddings to |bson| vectors. 
         - Defines the aggregation pipeline for the vector search.
         - Runs the aggregation pipeline and returns the results.

         .. list-table:: 
            :widths: 30 70 
            :header-rows: 1

            * - Placeholder 
              - Valid Value 

            * - ``<NUMBER-OF-CANDIDATES-TO-CONSIDER>`` 
              - Number of nearest neighbors to use during the search.
                For this example, specify ``20``

            * - ``<NUMBER-OF-DOCUMENTS-TO-RETURN>`` 
              - Number of documents to return in the results. For this
                example, specify ``5``.

            * - ``<TEXT-FIELD-NAME>`` 
              - Name of the field that contains the text data. For this
                example, specify ``summary``.

         .. literalinclude:: /includes/avs/bson-bindata-vectors/python/query-function.py 
            :copyable: true 
            :language: python 
            :linenos:
            :emphasize-lines: 37-38, 22, 44

      #. Run the {+avs+} query.

         You can run {+avs+} queries programmatically. To learn more, see
         :ref:`return-vector-search-results`. 

         .. list-table:: 
            :widths: 30 70 
            :header-rows: 1

            * - Placeholder 
              - Valid Value 

            * - ``<QUERY-TEXT>`` 
              - Text string for which to retrieve semantically similar
                documents. For this example, specify ``ocean view``.

         .. io-code-block:: 
            :copyable: true 
            
            .. input:: /includes/avs/bson-bindata-vectors/python/run-query.py 
               :language: python 
               :linenos:
               :emphasize-lines: 8

            .. output:: 
               :language: shell 

               Results from float32-embeddings
               [{'score': 0.8044508695602417,
               'summary': 'A beautiful and comfortable 1 Bedroom Air Conditioned Condo in '
                           'Makaha Valley - stunning Ocean & Mountain views All the '
                           'amenities of home, suited for longer stays. Full kitchen & large '
                           "bathroom.  Several gas BBQ's for all guests to use & a large "
                           'heated pool surrounded by reclining chairs to sunbathe.  The '
                           'Ocean you see in the pictures is not even a mile away, known as '
                           'the famous Makaha Surfing Beach. Golfing, hiking,snorkeling  '
                           'paddle boarding, surfing are all just minutes from the front '
                           'door.'},
               {'score': 0.7622430920600891,
               'summary': 'THIS IS A VERY SPACIOUS 1 BEDROOM FULL CONDO (SLEEPS 4) AT THE '
                           'BEAUTIFUL VALLEY ISLE RESORT ON THE BEACH IN LAHAINA, MAUI!! YOU '
                           'WILL LOVE THE PERFECT LOCATION OF THIS VERY NICE HIGH RISE! ALSO '
                           'THIS SPACIOUS FULL CONDO, FULL KITCHEN, BIG BALCONY!!'},
               {'score': 0.7484776973724365,
               'summary': 'Para 2 pessoas. Vista de mar a 150 mts. Prédio com 2 elevadores. '
                           'Tem: - quarto com roupeiro e cama de casal (colchão '
                           'magnetizado); - cozinha: placa de discos, exaustor, frigorifico, '
                           'micro-ondas e torradeira; casa de banho completa; - sala e '
                           'varanda.'},
               {'score': 0.7452666759490967,
               'summary': 'Quarto com vista para a Lagoa Rodrigo de Freitas, cartão postal '
                           'do Rio de Janeiro. Linda Vista.  1 Quarto e 1 banheiro  Amplo, '
                           'arejado, vaga na garagem. Prédio com piscina, sauna e '
                           'playground.  Fácil acesso, próximo da praia e shoppings.'},
               {'score': 0.73777174949646,
               'summary': 'próximo aos principais pontos turísticos,,do lado do metro, '
                           'vista p o CRISTO REDENTOR, GARAGEM, FAXINEIRA, PLAY.'}]
               Results from int8-embeddings embeddings
               [{'score': 0.5057082176208496,
               'summary': 'A beautiful and comfortable 1 Bedroom Air Conditioned Condo in '
                           'Makaha Valley - stunning Ocean & Mountain views All the '
                           'amenities of home, suited for longer stays. Full kitchen & large '
                           "bathroom.  Several gas BBQ's for all guests to use & a large "
                           'heated pool surrounded by reclining chairs to sunbathe.  The '
                           'Ocean you see in the pictures is not even a mile away, known as '
                           'the famous Makaha Surfing Beach. Golfing, hiking,snorkeling  '
                           'paddle boarding, surfing are all just minutes from the front '
                           'door.'},
               {'score': 0.5048595666885376,
               'summary': 'THIS IS A VERY SPACIOUS 1 BEDROOM FULL CONDO (SLEEPS 4) AT THE '
                           'BEAUTIFUL VALLEY ISLE RESORT ON THE BEACH IN LAHAINA, MAUI!! YOU '
                           'WILL LOVE THE PERFECT LOCATION OF THIS VERY NICE HIGH RISE! ALSO '
                           'THIS SPACIOUS FULL CONDO, FULL KITCHEN, BIG BALCONY!!'},
               {'score': 0.5045757293701172,
               'summary': 'Para 2 pessoas. Vista de mar a 150 mts. Prédio com 2 elevadores. '
                           'Tem: - quarto com roupeiro e cama de casal (colchão '
                           'magnetizado); - cozinha: placa de discos, exaustor, frigorifico, '
                           'micro-ondas e torradeira; casa de banho completa; - sala e '
                           'varanda.'},
               {'score': 0.5044537782669067,
               'summary': 'Quarto com vista para a Lagoa Rodrigo de Freitas, cartão postal '
                           'do Rio de Janeiro. Linda Vista.  1 Quarto e 1 banheiro  Amplo, '
                           'arejado, vaga na garagem. Prédio com piscina, sauna e '
                           'playground.  Fácil acesso, próximo da praia e shoppings.'},
               {'score': 0.5044353604316711,
               'summary': 'The ultimate way to experience Sydney Harbour; fireworks, the '
                           'bridge, and the proximity to the city means you can experience '
                           'everything this city has to offer.  Tucked into the Balmain '
                           "Peninsula, you're close to parks, pubs, shops, buses, and more!"}]
               Results from int1-embeddings embeddings
               [{'score': 0.7158203125,
               'summary': 'A beautiful and comfortable 1 Bedroom Air Conditioned Condo in '
                           'Makaha Valley - stunning Ocean & Mountain views All the '
                           'amenities of home, suited for longer stays. Full kitchen & large '
                           "bathroom.  Several gas BBQ's for all guests to use & a large "
                           'heated pool surrounded by reclining chairs to sunbathe.  The '
                           'Ocean you see in the pictures is not even a mile away, known as '
                           'the famous Makaha Surfing Beach. Golfing, hiking,snorkeling  '
                           'paddle boarding, surfing are all just minutes from the front '
                           'door.'},
               {'score': 0.6865234375,
               'summary': 'Para 2 pessoas. Vista de mar a 150 mts. Prédio com 2 elevadores. '
                           'Tem: - quarto com roupeiro e cama de casal (colchão '
                           'magnetizado); - cozinha: placa de discos, exaustor, frigorifico, '
                           'micro-ondas e torradeira; casa de banho completa; - sala e '
                           'varanda.'},
               {'score': 0.677734375,
               'summary': 'próximo aos principais pontos turísticos,,do lado do metro, '
                           'vista p o CRISTO REDENTOR, GARAGEM, FAXINEIRA, PLAY.'},
               {'score': 0.6748046875,
               'summary': 'Cozy and comfortable apartment. Ideal for families and '
                           'vacations.  3 bedrooms, 2 of them suites.  Located 20-min walk '
                           'to the beach and close to the Rio 2016 Olympics Venues. Situated '
                           'in a modern and secure condominium, with many entertainment '
                           'available options around.'},
               {'score': 0.6728515625,
               'summary': 'THIS IS A VERY SPACIOUS 1 BEDROOM FULL CONDO (SLEEPS 4) AT THE '
                           'BEAUTIFUL VALLEY ISLE RESORT ON THE BEACH IN LAHAINA, MAUI!! YOU '
                           'WILL LOVE THE PERFECT LOCATION OF THIS VERY NICE HIGH RISE! ALSO '
                           'THIS SPACIOUS FULL CONDO, FULL KITCHEN, BIG BALCONY!!'}]