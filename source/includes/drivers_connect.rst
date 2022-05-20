.. tabs-drivers::

   tabs:

     - id: python
       content: |
        
         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to read data.

            At line 4, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/python/crud_read_connect.py
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

         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to read data.

            At line 11, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/go/crud-read-connect.go
            :caption: crudRead.go
            :language: go
            :linenos:
            :dedent: 0

     - id: java-sync
       content: |

         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to read data.

            At line 8, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/java/CrudReadConnect.java
            :caption: CrudRead.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to read data.

            At line 4, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/node/crud-read-connect.js
            :caption: crud-read.js
            :language: javascript
            :linenos:
            :dedent: 0

     - id: csharp
       content: |

         .. tip::

            The following is an outline with the minimum code necessary to connect to MongoDB.
            You'll make additions over the next few steps to read data.

            At line 5, replace the URI string with your own
            :ref:`Atlas connection string <guides-get-connection-string>`.

         .. literalinclude:: /includes/code/dotnet/CrudReadConnect.cs
            :caption: CrudRead.cs
            :language: csharp
            :linenos:
            :dedent: 0
