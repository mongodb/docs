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

       To learn more, see :ref:`avs-types-vector` and :ref:`avs-types-filter-vector`.

   * - | ``fields.``
       | ``path``
     - String 
     - Required 
     - Name of the field to index. For nested fields, use dot notation
       to specify path to embedded fields. The field must be a top-level field 
       or a child of the field specified in the ``nestedRoot`` option.

   * - | ``fields.``
       | ``numDimensions``
     - Int
     - Required
     - Number of vector dimensions that {+avs+} enforces at index-time and
       query-time. You can set this field only for ``vector``-type fields.
       You must specify a value less than or equal to ``8192``.
       
       For indexing quantized vectors or :ref:`BinData <server-binData-method>`,
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
     - Vector similarity function to use to search for top K-nearest 
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

   * - | ``fields.``
       | ``indexingMethod``
     - String
     - Optional 
     - Index structure for the vector field. Value can be: 
       
       - ``hnsw`` - for graph-based index where similar vectors are 
         connected
       - ``flat`` - for flat, non-graph, index

       If omitted, defaults to ``hnsw``. To learn more, see 
       :ref:`avs-vector-index-method`. 

       This setting is not yet available in the {+atlas-ui+} 
       :guilabel:`Visual Editor`. Use the :guilabel:`JSON Editor` instead.

   * - | ``fields.``
       | ``hnswOptions`` 
     - Object 
     - Optional 
     - Parameters to use for |hnsw| graph construction. You can specify   
       this field only if ``indexingMethod`` is ``hnsw``. If omitted, uses
       the default values for the ``maxEdges`` and ``numEdgeCandidates``
       parameters. 

       :gold:`NOTE:` We recommend using the default values and tuning the 
       default settings only if you are experiencing suboptimal recall on
       large indexes. While higher values provide better recall, they 
       also increase memory usage and slow down indexing and search speed.

       To learn more, see :ref:`About the Indexing Methods 
       <avs-vector-index-method>`.

       This setting is not yet available in the {+atlas-ui+} 
       :guilabel:`Visual Editor`. Use the :guilabel:`JSON Editor` instead.

   * - | ``fields.`` 
       | ``hnswOptions.`` 
       | ``maxEdges``
     - Int
     - Optional 
     - Maximum number of edges (or connections) that a node can have in
       the :abbr:`HNSW (Hierarchical Navigable Small Worlds)` graph. Value 
       can be between ``16`` and ``64``, both inclusive. If omitted, defaults 
       to ``16``. For example, for a value of ``16``, each node can have 
       a maximum of sixteen outgoing edges at each layer of the |hnsw| graph.

       A higher number improves :term:`recall` (accuracy of search
       results) because the graph is better connected. However, this
       slows down query speed because of the number of neighbors to
       evaluate per graph node, increases the memory for the :abbr:`HNSW 
       (Hierarchical Navigable Small Worlds)` graph because each node 
       stores more connections, and slows down indexing because {+avs+} 
       evaluates more neighbors and adjusts for every new node added to 
       the graph. 

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

   * - ``nestedRoot``
     - String
     - Optional
     - Path to the array field for vector fields that are nested 
       in an array of documents. If you specify a value, the value of  
       ``fields.path`` must be a child of the field specified 
       here.

       This setting is not yet available in the {+atlas-ui+} 
       :guilabel:`Visual Editor`. Use the :guilabel:`JSON Editor` 
       instead.

   * - ``storedSource``
     - Object
     - Optional
     - Specifies the fields in the documents to store for query-time
       look-ups using the ``returnStoredSource`` option. Value must
       be an object that specifies the fields to ``include`` or
       ``exclude`` from storage. By default, {+avs+} doesn't store any
       fields on ``mongot``.

       To learn more, see :ref:`avs-stored-source-definition`.

   * - | ``storedSource.``
       | ``include``
     - Array of Strings
     - Optional
     - List of fields or dot-separated paths to fields to store. In
       addition to the specified fields, {+avs+} stores ``_id`` also by
       default. Either ``include`` or ``exclude`` is required.

   * - | ``storedSource.``
       | ``exclude``
     - Array of Strings
     - Optional
     - List of fields or dot-separated paths to fields to exclude from
       being stored. If specified, {+avs+} stores original documents
       except the fields listed here. Either ``exclude`` or ``include``
       is required.
