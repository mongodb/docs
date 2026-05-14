.. list-table::
   :widths: 15 15 15 55
   :header-rows: 1

   * - Option
     - Type 
     - Necessity
     - Purpose

   * - ``fields``
     - Array of field definition documents 
     - Required 
     - Definitions for the vector and filter fields to index, one
       definition per document. Each field definition document specifies
       the ``type``, ``path``, and other configuration options for the
       field to index.
       
       The ``fields`` array must contain one ``autoEmbed`` type
       field definition. You can add additional ``filter``-type field
       definitions to your array to pre-filter your data.  
       
   * - | ``fields.``
       | ``type``
     - String 
     - Required 
     - Field type to use to index fields for :pipeline:`$vectorSearch`.
       You can specify one of the following values:  

       - ``autoEmbed`` - for automatically generating vector embeddings.       
       - ``filter`` - for pre-filtering documents by non-vector fields. You
         can filter on {+avs-filter-types+}.

       To learn more, see :ref:`avs-types-auto-embed` and
       :ref:`avs-types-filter-auto-embed`. 

   * - | ``fields.``
       | ``modality``
     - String
     - Required
     - Type of data in the field that you specified in the ``path``.
       Value must be ``text``.

   * - | ``fields.``
       | ``path``
     - String 
     - Required 
     - Name of the text field to index. For nested fields, use dot notation
       to specify the path to embedded fields. If the text value in the 
       specified field exceeds 32,000 tokens, {+avs+} automatically 
       truncates during indexing to fit the context window of the embedding 
       model.

   * - | ``fields.``
       | ``model``
     - String
     - Required
     - |voyage| embedding model to use for generating the embeddings. 
       You can specify one of the following models:

       - ``voyage-4-lite`` - Optimized for high-volume, cost-sensitive 
         applications. 
       - ``voyage-4`` - (**Recommended**) Balanced performance for general 
         text search.
       - ``voyage-4-large`` - Maximum accuracy for complex semantic 
         relationships.
       - ``voyage-code-3`` - Specialized for code search and technical 
         documentation.

       To learn more, see :ref:`Automated Embedding Models <avs-auto-embeddings-model-ecosystem>`.

   * - | ``fields.``
       | ``numDimensions``
     - Int
     - Optional
     - Number of vector dimensions that {+avs+} enforces at index-time and
       query-time. You can specify one of the following values: 

       - ``256`` 
       - ``512`` 
       - ``1024`` 
       - ``2048``

       If omitted, defaults to ``1024`` vector dimensions. 

   * - | ``fields.``
       | ``quantization``
     - String
     - Optional
     - Data type to use to store the embeddings. You can specify one of 
       the following values:  

       - ``float`` - Builds an index using float (4 bytes) vector values.
       - ``scalar`` - Builds an index using scalar (1 byte) vector values. 
       - ``binary`` - Builds an index with binary (1 bit) vector values 
         and rescores using float (full-precision) vector values. 
       - ``binaryNoRescore`` - Builds an index with binary vector values. 
         Compared to ``binary`` (binary quantization with rescoring), 
         this option ensures faster query and lowers storage costs, but 
         provides lower accuracy.

       If omitted, defaults to ``scalar`` quantization. To learn more, see 
       :ref:`mdb-vs-quantization-auto`.
         
   * - | ``fields.``
       | ``similarity``
     - String
     - Optional
     - Vector similarity function to use to search for top K-nearest 
       neighbors. You can specify one of the following values:

       - ``euclidean`` - measures the distance between ends of vectors. 
       - ``cosine`` - measures similarity based on the angle between 
         vectors. 
       - ``dotProduct`` - measures similarity like ``cosine``, but takes 
         into account the magnitude of the vector.

       To learn more, see :ref:`mdb-vs-similarity-functions-auto`.

   * - | ``fields.``
       | ``indexingMethod``
     - String
     - Optional 
     - Index structure for the vector field. Value can be: 
       
       - ``hnsw`` - for graph-based index where similar vectors are 
         connected
       - ``flat`` - for flat, non-graph, index

       If omitted, defaults to ``hnsw``. To learn more, see 
       :ref:`mdb-vs-indexing-method-auto`.

   * - | ``fields.``
       | ``hnswOptions`` 
     - Object 
     - Optional 
     - Parameters to use for |hnsw| graph construction. If omitted, uses
       the default values for the ``maxEdges`` and ``numEdgeCandidates``
       parameters. 

       :gold:`NOTE:` We recommend using the default values and tuning the
       default settings only if you are experiencing suboptimal recall on
       large indexes. While higher values provide better recall, they
       also increase memory usage and slow down indexing and search speed.

       To learn more, see 
       :ref:`About the Indexing Methods <avs-vector-index-method>`.

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