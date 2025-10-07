The following index definition for the
``sample_training.companies`` namespace configures |fts| to
automatically index all dynamically indexable fields inside the
objects in the ``products`` array. It also configures the
``category_code`` field to be indexed as the :ref:`token
<bson-data-types-token>` type, which is not included in the default type
set for dynamic mappings, to support |fts| :ref:`fts-facet-ref` queries
against that field. 