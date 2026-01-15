Configure |fts-field-type| Field Properties 
-------------------------------------------

The |fts| |fts-field-type| type takes the following parameters:

.. list-table::
   :widths: 20 10 10 40
   :header-rows: 1

   * - Option
     - Type
     - Necessity
     - Description

   * - ``type``
     -  ``vector``
     - Required
     - Human-readable label that identifies this field type.
       Value must be ``vector``.

   * - ``numDimensions``
     - Int
     - Required
     - Number of vector dimensions that |fts| enforces at index-time and
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
       for how many dimensions are output. To learn more, see
       :ref:`choose-embedding-method`. 

   * - ``similarity``
     - String
     - Required
     - Vector similarity function to use to search for top K-nearest 
       neighbors. You can set this field only for ``vector``-type fields.
       
       You can specify one of the following values:

       - ``euclidean`` - measures the distance between ends of vectors. 
       - ``cosine`` - measures similarity based on the angle between 
         vectors. 
       - ``dotProduct`` - measures similarity like ``cosine``, but takes 
         into account the magnitude of the vector.  
         
       To learn more, see :ref:`avs-similarity-functions`.

   * - ``quantization``
     - String
     - Optional
     - Type of automatic vector quantization for your vectors. Use
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

   * - ``hnswOptions`` 
     - Object 
     - Optional 
     - Parameters to use for |hnsw| graph construction. If omitted, uses
       the default values for the ``maxEdges`` and ``numEdgeCandidates``
       parameters. 

       :gold:`IMPORTANT:` This is available as a Preview feature. Modifying 
       the default values might negatively impact your |fts| index and queries.

   * - | ``hnswOptions.`` 
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
       also increases query and indexing time by increasing the number
       of neighbors to evaluate per graph node, and requires more memory
       to store the additional nodes for each connection in the |hnsw|
       graph.  

   * - | ``hnswOptions.``
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
       increase query latency. 