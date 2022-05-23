.. tabs-drivers::

   tabs:

     - id: csharp
       content: |

         .. procedure::
           :style: connected

           .. step:: Create a class that resembles a document from your collection.

              The following class lists all the field names and types
              that your document will have.

              .. literalinclude:: /includes/code/dotnet/CrudWriteOpsClass.cs
                 :caption: CrudDelete.cs
                 :language: csharp
                 :linenos:
                 :dedent: 0
              
           .. step:: Automap your class to the documents fields.

              In C#, you map fields to class properties, which are
              uppercase by convention. However, you should delete the
              data with camel case fields. To make the driver
              automatically convert the fields from uppercase to camel
              case, create a ``ConventionPack`` and register the naming
              convention for ``CamelCase``.

              .. literalinclude:: /includes/code/dotnet/CrudWriteOpsCamelCase.cs
                 :caption: CrudDelete.cs
                 :language: csharp
                 :linenos:
                 :dedent: 0

           .. step:: Verify your connection code.

              .. tip::

                 The following is an outline with the minimum code necessary to connect to MongoDB.
                 You'll make additions over the next few steps to delete data.
                 
                 At line 6, replace the URI string with your own
                 :ref:`Atlas connection string <guides-get-connection-string>`.

              .. literalinclude:: /includes/code/dotnet/CrudDeleteConnect.cs
                 :caption: CrudDelete.cs
                 :language: csharp
                 :linenos:
                 :dedent: 0
    
     - id: go
       content: |

         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to delete data.
                 
            At line 15, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/go/crud-delete-connect.go
            :caption: crud-delete.go
            :language: go
            :linenos:
            :dedent: 0

     - id: java-sync
       content: |

         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to delete data.
                 
            At line 13, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/java/CrudDeleteConnect.java
            :caption: CrudDelete.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to delete data.
                 
            At line 5, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/node/crud-delete-connect.js
            :caption: crud-delete.js
            :language: javascript
            :linenos:
            :dedent: 0

     - id: python
       content: |
         
         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to delete data.
                 
            At line 4, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/python/crud_delete_connect.py
            :caption: crud_delete.py
            :language: python
            :linenos:
            :dedent: 0

         .. tip:: ``mongodb+srv``

            Make sure you've installed PyMongo with the ``srv`` option.

            .. code-block:: sh

               python3 -m pip install "pymongo[srv]"
