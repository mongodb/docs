You can use the ``vectorSearch`` type to index fields for running 
:pipeline:`$vectorSearch` queries. You can define the index for the
vector embeddings that you want to query and any additional fields
that you want to use to :ref:`pre-filter <avs-types-filter>` your data. 
Filtering your data is useful to narrow the scope of your semantic search 
and ensure that certain vector embeddings are not considered for comparison, 
such as in a multi-tenant environment.

You can use the {+atlas-ui+}, {+atlas-admin-api+}, 
{+atlas-cli+}, {+mongosh+}, or a supported :driver:`MongoDB Driver </>`
to :ref:`create <avs-create-index>` your {+avs+} index. 

.. note:: 

   You can't use the deprecated :ref:`knnBeta <knn-beta-ref>` operator to query
   fields indexed using the ``vectorSearch`` type index definition. 

.. _avs-types-vector-search-considerations:

Considerations
--------------

In a ``vectorSearch`` type index definition, you can index arrays with
only a single element. You can't index embedding fields inside arrays of documents
or embedding fields inside arrays of objects. You can index embedding fields inside
documents using the dot notation. The same embedding field can't be indexed 
multiple times in the same index defintion.

Before indexing your embeddings, we recommend converting your embeddings
to |bson| :manual:`BinData </reference/method/BinData/>` vectors with
subtype ``float32``, ``int1``, or ``int8`` for efficient storage
in your {+cluster+}.  To learn more, see :ref:`how to convert
your embeddings to BSON vectors <avs-bindata-vector-subtype>`. 

.. |search-type| replace:: {+avs+}

.. include:: /includes/search-shared/fact-fts-avs-index-resource-consumption.rst

To learn more about sizing considerations for your indexes, 
see :ref:`avs-index-memory-requirements`.

If you make changes to the collection for which you defined {+avs+} 
index, the latest data might not be available immediately for queries.
However, ``mongot`` monitors the change streams and updates stored
copies of data, making {+avs+} indexes eventually consistent. You can
view the number of indexed :guilabel:`Documents` in the {+atlas-ui+} 
to verify that changes to the collection are reflected in the index.

Alternatively, you can create a new index after adding new documents to
your collection and wait for the index to become queryable. You can also
implement a polling logic similar to the following to ensure that the
index is ready for querying before attempting to use it.

.. example:: 

   .. code-block:: 

      console.log("Polling to check if the index is ready. This may take up to a minute.")
      let isQueryable = false;
      while (!isQueryable) {
        const cursor = collection.listSearchIndexes();
        for await (const index of cursor) {
          if (index.name === result) {
            if (index.queryable) {
              console.log(`${result} is ready for querying.`);
              isQueryable = true;
            } else {
              await new Promise(resolve => setTimeout(resolve, 5000));
            }
          }
        }
      }

.. _avs-index-supported-drivers:
.. _avs-create-index-supported-clients:

Supported Clients 
-----------------

You can create and manage {+avs+} indexes through the {+atlas-ui+},
{+mongosh+}, {+atlas-cli+}, {+atlas-admin-api+}, and the following 
:driver:`MongoDB Drivers </>`:

.. include:: /includes/avs/list-table-index-supported-drivers-avs.rst

.. _avs-index-definition:

Syntax 
------

The following syntax defines the ``vectorSearch`` index type:

.. code-block:: json
   :copyable: true 
   :linenos:

   {
     "fields":[ 
       {
         "type": "vector",
         "path": "<field-to-index>",
         "numDimensions": <number-of-dimensions>,
         "similarity": "euclidean | cosine | dotProduct",
         "quantization": "none | scalar | binary",
         "hnswOptions": {
           "maxEdges": <number-of-connected-neighbors>,
           "numEdgeCandidates": <number-of-nearest-neighbors>
         }
       },
       {
         "type": "filter",
         "path": "<field-to-index>"
       },
       ...
     ]
   }

.. _avs-types-vector-search-options:

{+avs+} Index Fields
----------------------------------

The {+avs+} index definition takes the following fields:

.. list-table::
   :widths: 25 15 15 45
   :header-rows: 1

   * - Option
     - Type 
     - Necessity
     - Purpose

   * - ``fields``
     - Array of field definition documents 
     - Required 
     - Definitions for the vector and filter fields to index, one definition per document.
       Each field definition document specifies the ``type``, ``path``, and other configuration options for the field to index. 
       
       The ``fields`` array must contain at least one ``vector``-type field definition. You can add additional
       ``filter``-type field definitions to your array to pre-filter your data. 
       
   * - | ``fields.``
       | ``type``
     - String 
     - Required 
     - Field type to use to index fields for :pipeline:`$vectorSearch`.
       You can specify one of the following values:  
       
       - ``vector`` - for fields that contain vector embeddings.
       - ``filter`` - for additional fields to filter on. You
         can filter on {+avs-filter-types+}.

       To learn more, see :ref:`avs-types-vector` and :ref:`avs-types-filter`.

   * - | ``fields.``
       | ``path``
     - String 
     - Required 
     - Name of the field to index. For nested fields, use dot notation
       to specify path to embedded fields.

   * - | ``fields.``
       | ``numDimensions``
     - Int
     - Required
     - Number of vector dimensions that {+avs+} enforces at index-time and
       query-time. You can set this field only for ``vector``-type fields.
       You must specify a value less than or equal to ``8192``.
       
       For indexing quantized vectors or :manual:`BinData </reference/method/BinData/>`,
       you can specify one of the following values:

       - ``1`` to ``8192`` for ``int8`` vectors for ingestion.
       - Multiple of ``8`` for ``int1`` vectors for ingestion.
       - ``1`` to ``8192`` for ``binData(float32)`` and
         ``array(float32)`` vectors for automatic scalar quantization.
       - Multiple of ``8`` for ``binData(float32)`` and
         ``array(float32)`` vectors for automatic binary quantization.
       
       The embedding model you choose determines the number of dimensions
       in your vector embeddings, with some models having multiple options 
       for how many dimensions are output. To learn more, see :ref:`choose-embedding-method`. 

   * - | ``fields.``
       | ``similarity``
     - String
     - Required
     - .. _fields-similarity:
      
       Vector similarity function to use to search for top K-nearest 
       neighbors. You can set this field only for ``vector``-type fields.
       
       You can specify one of the following values:

       - ``euclidean`` - measures the distance between ends of vectors. 
       - ``cosine`` - measures similarity based on the angle between 
         vectors. 
       - ``dotProduct`` - measures similarity like ``cosine``, but takes 
         into account the magnitude of the vector.  
         
       To learn more, see :ref:`avs-similarity-functions`.

   * - | ``fields.``
       | ``quantization``
     - String
     - Optional
     - .. _fields-quantization:

       Type of automatic vector quantization for your vectors. Use
       this setting only if your embeddings are ``float`` or ``double``
       vectors. 
       
       You can specify one of the following values:  

       - ``none`` - Indicates no automatic quantization for the vector
         embeddings. Use this setting if you have pre-quantized vectors
         for ingestion. If omitted, this is the default value. 
       - ``scalar`` - Indicates scalar quantization, which transforms
         values to 1 byte integers.    
       - ``binary`` - Indicates binary quantization, which transforms
         values to a single bit. To use this value,
         ``numDimensions`` must be a multiple of 8. 
         
         If precision is critical, select ``none`` or ``scalar`` instead
         of ``binary``. 

       To learn more, see :ref:`avs-quantization`.

   * - | ``fields.``
       | ``hnswOptions`` 
     - Object 
     - Optional 
     - Parameters to use for |hnsw| graph construction. If omitted, uses
       the default values for the ``maxEdges`` and ``numEdgeCandidates``
       parameters. 

       :gold:`IMPORTANT:` This is available as a Preview feature. Modifying 
       the default values might negatively impact your {+avs+} index and queries.

   * - | ``fields.`` 
       | ``hnswOptions.`` 
       | ``maxEdges``
     - Int
     - Optional 
     - Maximum number of edges (or connections) that a node can have in
       the |hnsw| graph. Value can be between ``16`` and ``64``, both 
       inclusive. If omitted, defaults to ``16``. For example, for a
       value of ``16``, each node can have a maximum of sixteen outgoing
       edges at each layer of the |hnsw| graph.

       A higher number improves :term:`recall` (accuracy of search
       results) because the graph is better connected. However, this
       slows down query speed because of the number of neighbors to
       evaluate per graph node, increases the memory for the |hnsw| graph because each
       node stores more connections, and slows down indexing because
       {+avs+} evaluates more neighbors and adjusts for every new node
       added to the graph. 

   * - | ``fields.``
       | ``hnswOptions.``
       | ``numEdgeCandidates``
     - Int
     - Optional
     - Analogous to ``numCandidates`` at query-time, this parameter
       controls the maximum number of nodes to evaluate to find the
       closest neighbors to connect to a new node. Value can be between
       ``100`` and ``3200``, both inclusive. If omitted, defaults to
       ``100``. 

       A higher number provides a graph with high-quality connections,
       which can improve search quality (recall), but it can also
       negatively affect query latency. 

.. _avs-types-vector:

About the ``vector`` Type 
~~~~~~~~~~~~~~~~~~~~~~~~~

Your index definition's ``vector`` field must contain an array of numbers of 
*one* of the following types: 

- |bson| ``double`` 
- |bson| :manual:`BinData </reference/method/BinData/>` ``vector``
  subtype ``float32``  
- |bson| :manual:`BinData </reference/method/BinData/>` ``vector``
  subtype ``int1`` 
- |bson| :manual:`BinData </reference/method/BinData/>` ``vector``
  subtype ``int8`` 

.. note:: 

   To learn more about generating |bson| :manual:`BinData
   </reference/method/BinData/>` vectors with subtype ``float32``
   ``int1`` or ``int8`` for your data, see 
   :ref:`avs-bindata-vector-subtype`.

You must index the vector field as the ``vector`` type inside the
``fields`` array.

The following syntax defines the ``vector`` field type: 

.. code-block:: json
   :copyable: true 
   :linenos:
   :emphasize-lines: 4-12

   {
     "fields":[ 
       {
         "type": "vector",
         "path": <field-to-index>,
         "numDimensions": <number-of-dimensions>,
         "similarity": "euclidean | cosine | dotProduct",
         "quantization": "none | scalar | binary",
         "hnswOptions": {
           "maxEdges": <number-of-connected-neighbors>,
           "numEdgeCandidates": <number-of-nearest-neighbors>
         }
       },
       ...
     ]
   }

.. _avs-similarity-functions:

About the Similarity Functions 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

{+avs+} supports the following similarity functions: 

- ``euclidean`` - measures the distance between ends of vectors. This
  value allows you to measure similarity based on varying dimensions. To
  learn more, see :wikipedia:`Euclidean <Euclidean_distance>`.  
- ``cosine`` - measures similarity based on the angle between  vectors.
  This value allows you to measure similarity that isn't scaled by
  magnitude. You can't use zero magnitude vectors with ``cosine``. To
  measure cosine similarity, we recommend that you normalize your
  vectors and use ``dotProduct`` instead.  
- ``dotProduct`` - measures similarity like ``cosine``, but takes into
  account the magnitude of the vector. If you normalize the magnitude,
  ``cosine`` and ``dotProduct`` are almost identical in measuring
  similarity.   
         
  To use ``dotProduct``, you must normalize the vector to unit length at
  index-time and query-time.  

The following table shows the similarity functions for the various types:

.. list-table:: 
   :widths: 25 25 25 25 
   :header-rows: 1 

   * - Vector Embeddings Type
     - ``euclidean``
     - ``cosine``  
     - ``dotProduct``

   * - ``binData(int1)`` :icon-fa5:`star`
     - √
     - 
     - 

   * - ``binData(int8)`` :icon-fa5:`star`
     - √
     - √
     - √

   * - ``binData(float32)`` :icon-fa5:`asterisk`
     - √
     - √
     - √

   * - ``array(float32)`` :icon-fa5:`asterisk`
     - √
     - √
     - √

:icon-fa5:`star` For vector ingestion.

:icon-fa5:`asterisk` For automatic scalar or binary quantization.

The formula for each similarity function is as follows: 

.. tabs::

   .. tab:: Cosine
      :tabid: cosine

      For ``cosine``, {+avs+} uses the following algorithm to normalize
      the score: 

      .. code-block:: shell 
         :copyable: false 

         score = (1 + cosine(v1,v2)) / 2

      - This algorithm normalizes the score by considering the similarity
        score of the document vector (``v1``) and the query vector
        (``v2``), which has the range [``-1``, ``1``]. {+avs+} adds ``1``
        to the similarity score to normalize the score to a range [``0``,
        ``2``] and then divides by ``2`` to ensure a value between ``0``
        and ``1``.

   .. tab:: Dot Product
      :tabid: dotProduct
     
      For ``dotProduct``, {+avs+} uses the following algorithm to normalize
      the score:  

      .. code-block:: shell 
         :copyable: false 

         score = (1 + dotProduct(v1,v2)) / 2

      - This algorithm normalizes the score by considering the similarity score of the 
        document vector (``v1``) and the query vector (``v2``), which has the range 
        [``-1``, ``1``]. {+avs+} adds ``1`` to the similarity score to normalize 
        the score to a range [``0``, ``2``] and then divides by ``2`` to ensure a 
        value between ``0`` and ``1``.

   .. tab:: Euclidean 
      :tabid: euclidean
     
      For ``euclidean`` similarity, {+avs+} uses the following algorithm to
      normalize the score to ensure a value between ``0`` and ``1``: 

      .. code-block:: shell 
         :copyable: false 

         score = 1 / (1 + euclidean(v1,v2))

      - This algorithm normalizes the score by calculating the euclidean distance,
        which is the distance between the document vector (``v1``) and the query 
        vector (``v2``), which has the range [``0``, ``∞``]. {+avs+} then transforms 
        the distance to a similarity score by adding ``1`` to the distance and then 
        divides ``1`` by the result to ensure a value between ``0`` and ``1``.

For best performance, check your embedding model to determine which
similarity function aligns with your embedding model's training
process. If you don't have any guidance, start with ``dotProduct``.
Setting ``fields.similarity`` to the ``dotProduct`` value allows you
to efficiently measure similarity based on both angle and magnitude.
``dotProduct`` consumes less computational resources than ``cosine``
and is efficient when vectors are of unit length. However, if your
vectors aren't normalized, evaluate the similarity scores in the
results of a sample query for ``euclidean`` distance and ``cosine``
similarity to determine which corresponds to reasonable results. 

.. _avs-types-filter:

About the ``filter`` Type 
~~~~~~~~~~~~~~~~~~~~~~~~~

You can optionally index additional fields to pre-filter your data. 
You can filter on {+avs-filter-types+}. Filtering your data is useful to
narrow the scope of your semantic search and ensure that not all vectors
are considered for comparison. It reduces the number of documents
against which to run similarity comparisons, which can decrease query
latency and increase the accuracy of search results. 

You must index the fields that you want to filter by using the
``filter`` type inside the ``fields`` array. 

The following syntax defines the ``filter`` field type: 

.. code-block:: json
   :copyable: true 
   :linenos:
   :emphasize-lines: 8-9

   {
     "fields":[ 
       {
         "type": "vector",
         ...
       },
       {
         "type": "filter",
         "path": "<field-to-index>"
       },
       ...
     ]
   }
 
If you want to pre-filter using fuzzy search, phrase matching, location
filtering, and other analyzed text capabilities, create a |fts|
:ref:`vector <bson-data-types-vector>` type index and query using the
:ref:`$vectorSearch operator <fts-vectorSearch-ref>` in a 
:pipeline:`$search` stage.

.. include:: /includes/avs/facts/fact-avs-pre-filtering-score-impact.rst