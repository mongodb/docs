Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

The following index definition for the ``sample_airbnb.listingsAndReviews`` collection
indexes the ``address.location`` field as the ``geo`` type. This index allows
you to query against that field by using the |fts| :ref:`geoShape <geoshape-ref>`
and :ref:`geoWithin <geowithin-ref>` operators. 

.. literalinclude:: /includes/fts/field-types/geo/create-index-example-representation.c
   :language: c
   :linenos:
   :copyable: true 
