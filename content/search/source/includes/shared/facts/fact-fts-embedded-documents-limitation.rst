.. include:: /includes/query/operators-collectors/shared/facts/fact-fts-embedded-documents-limitation-short.rst

The exact number of index objects can vary based on the rate of document
changes and deletions. The :ref:`Search Max Number of Lucene Docs
<review-atlas-search-metrics>` metric shows the largest number of
Lucene documents in a single partition of any search index within a
replica set or shard.

For example, suppose the metric displays "1,500,000,000." The index
with the highest number of Lucene documents in a single partition has
about 1,500,000,000 documents in that partition. If the index uses
many partitions, it can contain more documents overall.

You can approximate the expected number of index objects in a single
index by doing the following steps: 

1. Calculate the number of index objects per document. For every level of nesting, each embedded document counts as a separate index object.  

   .. code-block:: shell 
      :copyable: false 

      number of index objects in document = 1 + number of nested embedded documents

2. Multiply the number of index objects per document by the
   total number of documents in the collection

   .. code-block:: shell 
      :copyable: false 

      total number of index objects = number of index objects in document x total number of documents in collection

Note that this approximation is a lower bound. 

.. example::

   Consider the :asp:`collection </6601831bf3ec7476bd9da8c9>` named
   ``schools``, described in this :ref:`tutorial 
   <embedded-documents-tutorial-sample-collection>`, and suppose the
   collection contains 1000 documents similar to the following: 

   .. code-block:: json 
      :copyable: false 

      {
        "_id": 0,
        "name": "Springfield High",
        "mascot": "Pumas",
        "teachers": [
          {
            "first": "Jane",
            "last": "Smith",
            "classes": [
              {
                "subject": "art of science",
                "grade": "12th"
              },
              ... // 2 more embedded documents
            ]
          },
          ... // 1 more embedded document
        ],
        "clubs": {
          "stem": [
            {
              "club_name": "chess",
              "description": "provides students opportunity to play the board game of chess informally and competitively in tournaments."
            },
            ... // 1 more embedded document
          ],
          ... // 1 more embedded document
        }
      }
   
   Now consider the index definition for the following fields in the
   ``schools`` collection:  

   .. tabs:: 

      .. tab:: Nested Array 
         :tabid: nested-array

         The array of documents named ``teachers`` is indexed as the
         ``embeddedDocuments`` type with dynamic mappings enabled.
         However, the ``classes`` field *isn't indexed*. Use the
         following to calculate the index objects:  

         1. Calculate the number of index objects per document.

            .. code-block:: shell 
               :copyable: false 

               Number of ``teachers`` embedded documents = up to 2 
               Total number of index objects per document = 1 + 2 = 3

         #. Multiply by the total number of documents in the collection.
  
            .. code-block:: shell 
               :copyable: false 

               Number of documents in the collection = 1000
               Number of index objects per document = 3
               Total number of index objects for collection = 1000 x 3 = 3000

      .. tab:: Nested Array Within Array
         :tabid: nested-within-array

         The arrays of documents named ``teachers`` and
         ``teachers.classes`` are indexed as the ``embeddedDocuments``
         type with dynamic mappings enabled. Use the following to 
         calculate the index objects:

         2. Calculate the number of index objects per document:                                      

            .. code-block:: shell 
               :copyable: false 

               Number of documents = 1
               Number of ``teachers`` embedded documents  = up to 2
               Number of ``classes`` embedded documents = up to 3
               Number of index objects per document = 1 + ( 2 x 3 ) = 7

         #. Multiply by the total number of documents in the collection.

            .. code-block:: shell 
               :copyable: false 

               Number of documents in the collection = 1000
               Number of index objects per document = 7
               Total number of index objects: 1000 x 7 = 7000

If your collection has large arrays that might generate 2,100,000,000
index objects, you must :ref:`shard <create-cluster-sharding>` any
clusters that contain indexes with the ``embeddedDocuments`` type. 
