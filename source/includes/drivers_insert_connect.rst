.. tabs-drivers::

   tabs:

     - id: csharp
       content: |

         The following is an outline with the minimum code necessary to connect to MongoDB using the C#/.NET driver.
         You'll make additions over the next few steps to insert data.

         In C#, you map fields to class variables, which are uppercase
         by convention. However, you should insert the data with camel
         case fields. To make the driver automatically convert the
         fields from uppercase to camel case, create a
         ``ConventionPack`` and register the naming convention for
         ``CamelCase``.

         .. literalinclude:: /includes/code/dotnet/CrudInsertConnect.cs
            :caption: CrudRead.cs
            :language: csharp
            :linenos:
            :dedent: 0

     - id: go
       content: |

         The following is an outline with the minimum code necessary to connect to MongoDB using the Go driver.
         You'll make additions over the next few steps to insert data.

         .. literalinclude:: /includes/code/go/crud-insert-connect.go
            :caption: crudRead.go
            :language: go
            :linenos:
            :dedent: 0

     - id: java-sync
       content: |

         The following is an outline with the minimum code necessary to connect to MongoDB using the Java driver.
         You'll make additions over the next few steps to insert data.

         .. literalinclude:: /includes/code/java/CrudInsertConnect.java
            :caption: CrudRead.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         The following is an outline with the minimum code necessary to connect to MongoDB using the Node.js driver.
         You'll make additions over the next few steps to insert data.

         .. literalinclude:: /includes/code/node/crud-insert-connect.js
            :caption: crud-read.js
            :language: javascript
            :linenos:
            :dedent: 0

     - id: python
       content: |

         The following is an outline with the minimum code necessary to connect to MongoDB using PyMongo.
         You'll make additions over the next few steps to insert data.

         .. literalinclude:: /includes/code/python/crud_insert_connect.py
            :caption: crud_read.py
            :language: python
            :linenos:
            :dedent: 0

         .. tip:: ``mongodb+srv``

           Make sure you've installed PyMongo with the ``srv`` option.

           .. code-block:: sh

              python3 -m pip install "pymongo[srv]"
