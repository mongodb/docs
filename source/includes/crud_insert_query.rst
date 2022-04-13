
.. tabs-drivers::

   tabs:

     - id: csharp
       content: |

         .. io-code-block::
            :caption: CrudInsert.cs
            :copyable: true

            .. input:: /includes/code/dotnet/CrudInsertFinalQuery.cs
               :language: csharp
               :linenos:

            .. output:: 
               :language: json

               625604fbd301606fd9998b14
               625604fbd301606fd9998b15
               625604fbd301606fd9998b16

     - id: go
       content: |

         .. io-code-block::
            :caption: crud-insert.go
            :copyable: true

            .. input:: /includes/code/go/crud-insert-final-query.go
               :language: go
               :linenos:

            .. output::
               :language: json

               ObjectID("624cf31b350635c487d55215")
               ObjectID("624cf31b350635c487d55216")
               ObjectID("624cf31b350635c487d55217")

     - id: java-sync
       content: |

         .. io-code-block::
            :caption: CrudInsert.java
            :copyable: true

            .. input:: /includes/code/java/CrudInsertFinalQuery.java
               :language: java
               :linenos:

            .. output::
               :language: json

               625716fc5749232edfb4b2d7
               625716fc5749232edfb4b2d8
               625716fc5749232edfb4b2d9

     - id: nodejs
       content: |

         .. io-code-block::
            :caption: crud-insert.js
            :copyable: true

            .. input:: /includes/code/node/crud-insert-final-query.js
               :language: javascript
               :linenos:

            .. output::
               :language: json

               {
                  '0': 624d06994e68f44afe8c0da6,
                  '1': 624d06994e68f44afe8c0da7,
                  '2': 624d06994e68f44afe8c0da8
               }

     - id: python
       content: |

         .. io-code-block::
            :caption: crud_insert.py
            :copyable: true

            .. input:: /includes/code/python/crud_insert_final_query.py
               :language: python
               :linenos:

            .. output::
               :language: json

               [ObjectId('624d078756f4582197aad408'), ObjectId('624d078756f4582197aad409'), ObjectId('624d078756f4582197aad40a')]
