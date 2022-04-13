.. tabs-drivers::

   tabs:

     - id: csharp
       content: |

         The following is an outline with the minimum code necessary to connect to MongoDB using the C#/.NET driver.
         You'll make additions over the next few steps to read data.

         In lines 18 to 28, we map the ``Comet`` class to the fields of
         a document in the ``comets`` collection. In C#, we capitalize
         the first letter of each field. In lines 8 to 10, we instruct
         the driver to camel case each field in our collection.

         .. literalinclude:: /includes/code/dotnet/CrudDeleteConnect.cs
            :caption: CrudDelete.cs
            :language: csharp
            :linenos:
            :dedent: 0
            
     - id: go
       content: |

         The following is an outline with the minimum code necessary to connect to MongoDB using the Go driver.
         You'll make additions over the next few steps to read data.

         .. literalinclude:: /includes/code/go/crud-delete-connect.go
            :caption: crudDelete.go
            :language: go
            :linenos:
            :dedent: 0

     - id: java-sync
       content: |

         The following is an outline with the minimum code necessary to connect to MongoDB using the Java driver.
         You'll make additions over the next few steps to read data.

         .. literalinclude:: /includes/code/java/CrudDeleteConnect.java
            :caption: CrudDelete.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         The following is an outline with the minimum code necessary to connect to MongoDB using the Node.js driver.
         You'll make additions over the next few steps to read data.

         .. literalinclude:: /includes/code/node/crud-delete-connect.js
            :caption: crud-delete.js
            :language: javascript
            :linenos:
            :dedent: 0

     - id: python
       content: |
         
         The following is an outline with the minimum code necessary to connect to MongoDB using PyMongo.
         You'll make additions over the next few steps to read data.

         .. literalinclude:: /includes/code/python/crud_delete_connect.py
            :caption: crud_delete.py
            :language: python
            :linenos:
            :dedent: 0

         .. tip:: ``mongodb+srv``

            Make sure you've installed PyMongo with the ``srv`` option.

            .. code-block:: sh

               python3 -m pip install "pymongo[srv]"
