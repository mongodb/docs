.. tabs-drivers::

   tabs:

     - id: go
       content: |

         .. literalinclude:: /includes/code/go/crud-read-find-less-than.go
            :caption: crudRead.go
            :language: go
            :linenos:
            :dedent: 0

     - id: python
       content: |

         .. literalinclude:: /includes/code/python/crud_read_find_less_than.py
            :caption: crud_read.py
            :language: python
            :dedent: 0

     - id: java-sync
       content: |

         The MongoDB Java Sync Driver includes
         :driver:`Builders </java/sync/current/fundamentals/builders/>`
         that simplify the process of creating queries (and other operations).
         Here, you use the ``Filters.lt`` builder to construct the query document.

         .. literalinclude:: /includes/code/java/CrudReadFindLessThan.java
            :caption: CrudRead.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         .. literalinclude:: /includes/code/node/crud-read-find-less-than.js
            :caption: crud-read.js
            :language: javascript
            :dedent: 0

     - id: csharp
       content: |
         .. literalinclude:: /includes/code/dotnet/CrudReadFindLessThan.cs
            :caption: CrudRead.cs
            :language: csharp
            :dedent: 0
