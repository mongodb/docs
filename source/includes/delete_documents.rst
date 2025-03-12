.. tabs-drivers::

   tabs:

     - id: csharp
       content: |

         .. literalinclude:: /includes/code/dotnet/CrudDeleteDocuments.cs
            :caption: CrudDelete.cs
            :language: csharp
            :dedent: 0

     - id: go
       content: |

         .. literalinclude:: /includes/code/go/crud-delete-documents.go
            :caption: crud-delete.go
            :language: go
            :linenos:
            :dedent: 0

     - id: java-sync
       content: |

         The MongoDB Java Sync Driver includes
         :driver:`Builders </java/sync/current/fundamentals/builders/>`
         that simplify the process of creating queries (and other operations).
         Here, you use the ``Filters.and``, ``Filters.lt``, and
         ``Filters.gt`` builders to construct the query document.

         .. literalinclude:: /includes/code/java/CrudDeleteDocuments.java
            :caption: CrudDelete.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         .. literalinclude:: /includes/code/node/crud-delete-documents.js
            :caption: crud-delete.js
            :language: javascript
            :dedent: 0

     - id: python
       content: |

         .. literalinclude:: /includes/code/python/crud_delete_documents.py
            :caption: crud_delete.py
            :language: python
            :dedent: 0
