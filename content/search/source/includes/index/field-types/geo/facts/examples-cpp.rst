Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/index/shared/facts/try-an-example.rst

.. include:: /includes/index/shared/facts/configure-and-run.rst

The following index definition for the ``sample_airbnb.listingsAndReviews`` collection
indexes the ``address.location`` field as the ``geo`` type. This index allows
you to query against that field by using the |fts| :ref:`geoShape <geoshape-ref>`
and :ref:`geoWithin <geowithin-ref>` operators. 

.. literalinclude:: /includes/index/field-types/geo/code-snippets/cpp/create-index-example-representation.cpp
   :language: cpp
   :linenos:
   :copyable: true 
