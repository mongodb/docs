.. tabs-drivers::

   tabs:

     - id: go
       content: |
         Use the ``Find()`` method to retrieve all documents. In another
         guide, you'll learn how to use the same method to retrieve documents
         that match specific criteria.

         .. tip::

            The empty ``bson.D{}`` is required to match all documents.

         .. literalinclude:: /includes/code/go/crud-read-find-noquery.go
            :caption: crudRead.go
            :language: go
            :linenos:
            :dedent: 0

     - id: python
       content: |
         Use the ``find()`` method to retrieve all documents. In another
         guide, you'll learn how to use the same method to retrieve documents
         that match specific criteria.

         .. literalinclude:: /includes/code/python/crud_read_find_noquery.py
            :caption: crud_read.py
            :language: python
            :dedent: 0


     - id: java-sync
       content: |

         Use the ``find()`` method to retrieve all documents. In another
         guide, you'll learn how to use the same method to retrieve documents
         that match specific criteria.

         .. literalinclude:: /includes/code/java/CrudReadFindNoquery.java
            :caption: CrudRead.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         Use the ``find()`` method to retrieve all documents. In another
         guide, you'll learn how to use the same method to retrieve documents
         that match specific criteria.

         .. literalinclude:: /includes/code/node/crud-read-find-noquery.js
            :caption: crud-read.js
            :language: javascript
            :dedent: 0

     - id: csharp
       content: |
         .. literalinclude:: /includes/code/dotnet/CrudReadFindNoquery.cs
            :caption: CrudRead.cs
            :language: csharp
            :dedent: 0
