.. tabs-drivers::

   tabs:

     - id: go
       content: |
         Use the ``Find()`` method to retrieve all documents. In another
         guide, you'll learn how to use the same method to retrieve documents
         that match specific criteria.

         .. tip::

            The empty ``bson.D{}`` is required to match all documents.

         .. literalinclude:: /includes/code/go/crud-read-retrieve.go
            :caption: crudRead.go
            :language: go
            :linenos:
            :dedent: 0

     - id: python
       content: |
         Use the ``find()`` method to retrieve all documents. In another
         guide, you'll learn how to use the same method to retrieve documents
         that match specific criteria.

         .. literalinclude:: /includes/code/python/crud-read-retrieve.py
            :caption: crud_read.py
            :language: python
            :dedent: 0

     - id: motor
       content: |
         TODO:


     - id: java-sync
       content: |

         Use the ``find()`` method to retrieve all documents. In another
         guide, you'll learn how to use the same method to retrieve documents
         that match specific criteria.

         .. literalinclude:: /includes/code/java/CrudReadRetrieve.java
            :caption: CrudRead.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         Use the ``find()`` method to retrieve all documents. In another
         guide, you'll learn how to use the same method to retrieve documents
         that match specific criteria.

         .. literalinclude:: /includes/code/node/crud-read-retrieve.js
            :caption: crud-read.js
            :language: javascript
            :dedent: 0

     - id: csharp
       content: |
         .. literalinclude:: /includes/code/dotnet/CrudReadRetrieve.cs
            :caption: CrudRead.cs
            :language: csharp
            :dedent: 0
