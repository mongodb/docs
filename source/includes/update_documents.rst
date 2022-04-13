.. tabs-drivers::

   tabs:

     - id: csharp
       content: |

         The MongoDB C# Driver includes
         `Builders <https://mongodb.github.io/mongo-csharp-driver/2.15/reference/driver/definitions/>`__
         that simplify the process of creating queries (and other operations).
         Here, you use the ``Filter.Empty`` and ``Update.Mul``
         builders to construct the query document and update document.

         .. literalinclude:: /includes/code/dotnet/CrudUpdateDocuments.cs
            :caption: CrudUpdate.cs
            :language: csharp
            :dedent: 0

     - id: go
       content: |

         .. literalinclude:: /includes/code/go/crud-update-documents.go
            :caption: crud-update.go
            :language: go
            :linenos:
            :dedent: 0

     - id: java-sync
       content: |

         The MongoDB Java Driver includes
         `Builders <https://www.mongodb.com/docs/drivers/java/sync/current/fundamentals/builders/>`__
         that simplify the process of creating queries (and other operations).
         Here, you use the ``Filters.empty`` and ``Updates.mul``
         builders to construct the query document and update document.
         
         .. literalinclude:: /includes/code/java/CrudUpdateDocuments.java
            :caption: CrudUpdate.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         .. literalinclude:: /includes/code/node/crud-update-documents.js
            :caption: crud-update.js
            :language: javascript
            :dedent: 0

     - id: python
       content: |

         .. literalinclude:: /includes/code/python/crud_update_documents.py
            :caption: crud_update.py
            :language: python
            :dedent: 0
