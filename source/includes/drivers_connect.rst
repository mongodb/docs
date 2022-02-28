.. tabs-drivers::

   tabs:

     - id: python
       content: |

         The following is a basic example of how to connect to MongoDB using PyMongo.
         You'll make addiitons over the next few steps to read data.

         .. literalinclude:: /includes/code/python/crud-read-connect.py
            :caption: crud_read.py
            :language: python
            :linenos:
            :dedent: 0

         .. tip:: ``mongodb+srv``

           Make sure you've installed PyMongo with the ``srv`` option.

           .. code-block:: sh

              python3 -m pip install "pymongo[srv]"


     - id: go
       content: |

         The following is a basic example of how to connect to MongoDB using the Go driver.
         You'll make addiitons over the next few steps to read data.

         .. literalinclude:: /includes/code/go/crud-read-connect.go
            :caption: crudRead.go
            :language: go
            :linenos:
            :dedent: 0

     - id: java-sync
       content: |

         The following is a basic example of how to connect to MongoDB using the Java driver.
         You'll make addiitons over the next few steps to read data.

         .. literalinclude:: /includes/code/java/CrudReadConnect.java
            :caption: CrudRead.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         The following is a basic example of how to connect to MongoDB using the Node.js driver.
         You'll make addiitons over the next few steps to read data.

         .. literalinclude:: /includes/code/node/crud-read-connect.js
            :caption: crud-read.js
            :language: javascript
            :linenos:
            :dedent: 0

     - id: csharp
       content: |

         The ``MongoDB.Bson`` package is used in CRUD operations, so
         you'll import it here.

         .. literalinclude:: /includes/code/dotnet/CrudReadConnect.cs
            :caption: CrudRead.cs
            :language: csharp
            :linenos:
            :dedent: 0
