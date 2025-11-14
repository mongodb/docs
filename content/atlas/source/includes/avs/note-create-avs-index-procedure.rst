.. note::

   The procedure includes index definition examples for the 
   ``embedded_movies`` collection in the ``sample_mflix`` database. If
   you load the :ref:`sample data <mflix-embedded_movies>` on your
   {+cluster+} and create the example {+avs+} indexes for this collection,
   you can run the sample :pipeline:`$vectorSearch` queries against this
   collection. To learn more about the sample queries that you can run,
   see :ref:`$vectorSearch Examples <vectorSearch-agg-pipeline-egs>`. 

.. |search-type| replace:: :guilabel:`Vector Search`
.. |index-name| replace:: ``vector_index`` is the default index name. 
            Index names must be unique within the namespace, regardless of the index type. 
            If you already have an index named ``vector_index`` on
            this collection, enter a different name.
      
.. |database-name| replace:: Select the database for which to create the index. For example, ``sample_mflix``.
.. |collection-name| replace:: Select the collection for which to create the index. For example, ``embedded_movies``.
.. |avs-namespace| replace:: ``sample_mflix.embedded_movies``
.. |embedding-field-name| replace:: ``plot_embedding_voyage_3_large``
   
.. |similarity-method| replace:: :guilabel:`Dot Product`
.. |quantization-method| replace:: :guilabel:`Scalar`
.. |filter-fields| replace:: ``genres`` and  ``year`` fields