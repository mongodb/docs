.. tabs-drivers::

   tabs:

     - id: csharp
       content: |

         .. procedure::
           :style: connected

           .. step:: Create a class that resembles a document from the ``comet`` collection.

              The following class lists all the field names and types
              that your document will have.

              .. literalinclude:: /includes/code/dotnet/CrudInsertClass.cs
                 :caption: CrudInsert.cs
                 :language: csharp
                 :linenos:
                 :dedent: 0
              
           .. step:: Automap your class to the documents fields.

              In C#, you map fields to class variables, which are uppercase
              by convention. However, you should insert the data with camel
              case fields. To make the driver automatically convert the
              fields from uppercase to camel case, create a
              ``ConventionPack`` and register the naming convention for
              ``CamelCase``.

              .. literalinclude:: /includes/code/dotnet/CrudInsertCamelCase.cs
                 :caption: CrudInsert.cs
                 :language: csharp
                 :linenos:
                 :dedent: 0

           .. step:: Verify your code.

              .. tip::

                 The following is an outline with the minimum code necessary to connect to MongoDB.
                 You'll make additions over the next few steps to insert data.
                 
                 At line 6, replace the URI string with your own
                 :ref:`Atlas connection string <guides-get-connection-string>`.

                 .. literalinclude:: /includes/code/dotnet/CrudInsertConnect.cs
                    :caption: CrudInsert.cs
                    :language: csharp
                    :linenos:
                    :dedent: 0

     - id: go
       content: |

         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to insert data.
                 
            At line 13, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/go/crud-insert-connect.go
            :caption: crud-insert.go
            :language: go
            :linenos:
            :dedent: 0

     - id: java-sync
       content: |

         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to insert data.
                 
            At line 15, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/java/CrudInsertConnect.java
            :caption: CrudInsert.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to insert data.
                 
            At line 4, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/node/crud-insert-connect.js
            :caption: crud-insert.js
            :language: javascript
            :linenos:
            :dedent: 0

     - id: python
       content: |

         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to insert data.
                 
            At line 4, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/python/crud_insert_connect.py
            :caption: crud_insert.py
            :language: python
            :linenos:
            :dedent: 0

         .. tip:: ``mongodb+srv``

            Make sure you've installed PyMongo with the ``srv`` option.

            .. code-block:: sh

               python3 -m pip install "pymongo[srv]"
