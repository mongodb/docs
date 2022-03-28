.. tabs-drivers::

   tabs:

     - id: go
       content: |
         .. tip::

            ``BSON.D`` should be used when sending documents to MongoDB,
            because ``BSON.D`` is ordered. This is important in more complex
            operations.

         .. literalinclude:: /includes/code/go/crud-read-find-multiple-query.go
            :caption: crudRead.go
            :language: go
            :linenos:
            :dedent: 0

     - id: python
       content: |

         .. literalinclude:: /includes/code/python/crud_read_find_multiple_query.py
            :caption: crud_read.py
            :language: python
            :dedent: 0

     - id: motor
       content: |
         TODO:


     - id: java-sync
       content: |

         The MongoDB Java Driver includes
         `Builders <https://www.mongodb.com/docs/drivers/java/sync/current/fundamentals/builders/>`__
         that simplify the process of creating queries (and other operations).
         Here, you use the ``Filters.eq`` builder to construct the query document.

         .. literalinclude:: /includes/code/java/CrudReadFindMultipleQuery.java
            :caption: CrudRead.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         .. literalinclude:: /includes/code/node/crud-read-find-multiple-query.js
            :caption: crud-read.js
            :language: javascript
            :dedent: 0

     - id: csharp
       content: |
         .. literalinclude:: /includes/code/dotnet/CrudReadFindMultipleQuery.cs
            :caption: CrudRead.cs
            :language: csharp
            :dedent: 0
