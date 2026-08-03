MongoDB Version Compatibility
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: 
   :header-rows: 1
   :widths: 50 50

   * - {+avs+} Feature 
     - MongoDB Version for Feature 

   * - :ref:`Create indexes on Views
       <avs-transform-documents-collections>`
     - 8.0+

   * - Query Views directly with :pipeline:`$vectorSearch`
     - 8.1+

   * - Views with sharded sub-pipelines via ``$lookup``/``$unionWith``
     - 8.2+

   * - :pipeline:`$rankFusion` on Views
     - 8.2+

   * - :ref:`Ingest Pre-Quantized BinData Vectors <avs-bindata-vector-subtype>`
     - 7.0.2+

   * - :ref:`Native Reranking <native-reranking-quickstart>`
     - 8.3+
