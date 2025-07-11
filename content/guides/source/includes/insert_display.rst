.. tabs-drivers::

   tabs:

     - id: go
       content: |

         For insert operations, the result object will contain the
         ``_id`` of documents the driver successfully inserted. Here,
         you access this property and print them. 
         
         .. literalinclude:: /includes/code/go/crud-insert-display.go
            :caption: crud-insert.go
            :language: go
            :linenos:
            :dedent: 0

     - id: python
       content: |
       
         For insert operations, the result object will contain the
         ``_id`` of documents the driver successfully inserted. Here,
         you access this property and print them. 

         .. literalinclude:: /includes/code/python/crud_insert_display.py
            :caption: crud_insert.py
            :language: python
            :dedent: 0

     - id: java-sync
       content: |
       
         For insert operations, the result object will contain the
         ``_id`` of documents the driver successfully inserted. Here,
         you access this property and print them.  

         .. literalinclude:: /includes/code/java/CrudInsertDisplay.java
            :caption: CrudInsert.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |
       
         For insert operations, the result object will contain the
         ``_id`` of documents the driver successfully inserted. Here,
         you access this property and print them. 

         .. literalinclude:: /includes/code/node/crud-insert-display.js
            :caption: crud-insert.js
            :language: javascript
            :dedent: 0

     - id: csharp
       content: |
       
         For insert operations, the C# driver automatically creates the
         ``_id`` of documents that are being inserted. Here, you
         access this property from the original array and print them.

         .. literalinclude:: /includes/code/dotnet/CrudInsertDisplay.cs
            :caption: CrudInsert.cs
            :language: csharp
            :dedent: 0
