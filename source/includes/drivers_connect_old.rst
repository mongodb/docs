.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         .. include:: /includes/mongo-shell-platform-connect.rst

     - id: compass
       content: |

         If you wish to manually configure your Compass connection, load
         Compass and select the ``New Connection`` link. You will see a
         form where you can enter connection information for MongoDB.

         .. tabs-cloud::

            hidden: true

            tabs:

              - id: cloud
                content: |

                  Atlas users can copy a URI string from the Atlas
                  console into Compass. MongoDB Compass can detect whether you have a MongoDB
                  URI connection string in your system clipboard and auto-
                  populate the connection dialog from the URI.
         
                  See :doc:`/cloud/connectionstring` for information on
                  how to get the Atlas connection string URI into your copy
                  buffer.
         
                  If Compass was already running when you copied the URI string,
                  click the :guilabel:`NEW CONNECTION` button.

         .. figure:: /images/connect-to-host.png
            :figwidth: 740px

         You will be prompted to populate the connection dialog.
         Click :guilabel:`Yes`.

         You should then populate the :guilabel:`password` field with the
         proper password for your MongoDB user in the connection form.

         .. note:: Errors related to connecting through Compass will
                   appear in red at the top of the Connect screen.

     - id: python
       content: |

         It's a good idea to put your connection code in a class so
         that it can be reused.

         .. literalinclude:: /includes/examples/python/connect/connect.py
            :language: python
            :dedent: 0
            :start-after: Start Connect
            :end-before: End Connect


         If your ``connection_string`` starts with `mongodb+srv`, you need to install the dnspython module with
           
         .. code-block:: sh
            
            python -m pip install dnspython 

         Now add code to call the class you just created.

         .. literalinclude:: /includes/examples/python/connect/connecttest.py
            :language: python
            :dedent: 0
            :start-after: Start Caller Connect
            :end-before: End Caller Connect
     

     - id: go
       content: |

         Replace your password and any parameters surrounded by ``$[]``
         in the connection string in the code below.

         For now, you will use the `context.TODO() <https://golang.org/pkg/context/#TODO>`_. 

         Later you'll configure the context specific to your requirements.
         
         .. literalinclude:: /includes/examples/go/connect.go
            :language: go
            :dedent: 1 
            :start-after: Open Connection
            :end-before: End Open Connection Code   

         You won't know if the connection has been successful until you
         use the connection. A `ping <https://godoc.org/github.com/mongodb/mongo-go-driver/mongo#Client.Ping>`_ is one way you can test the
         connection. This is a full example of a Go connection to
         mongoDB, including a test ``ping``.

         .. literalinclude:: /includes/examples/go/connect/connect.go
            :language: go
            :dedent: 0
            :start-after: Start code
            :end-before: End code   

         In your Go workspace and project folder, run build.

         .. code-block:: sh

            go build

         Now run the binary. For binaries that are not installed, you'll
         have to specify the path.

         .. code-block:: sh

            go <path-to-yourproject> 

         If you'd like to run the resulting binary without specifying
         a path, install the binary you just built into your Go workspace.

         .. code-block:: sh
    
            go install

         Now run the code. "yourprojectname" is the name of the project
         directory that contains the file with your ``main()`` function.

         For installed binaries use:
         
         .. code-block:: sh 

            go yourprojectname   

         For binaries that are not installed, you'll have to specify
         the path. 

         .. code-block:: sh

            go ./yourprojectname 


         The default timeout for the Go driver to connect to the database
         is 30 seconds. In the event that you are unable to connect, 
         you will see an error that resembles this:

         .. code-block:: none

            2019/01/09 10:01:50 server selection timeout


     - id: java-sync
       content: |

         For the MongoDB java driver 3.7 and beyond, use the ``MongoClients.create()`` method.

         .. literalinclude:: /includes/examples/java/ConnectExample.java
            :language: java
            :dedent: 4
            :start-after: Start Connection
            :end-before: End Connection


         For legacy drivers (prior to 3.7), use:

         .. literalinclude:: /includes/examples/java/ConnectExampleLegacy.java
            :language: java
            :dedent: 4
            :start-after: Start Connection
            :end-before: End Connection


     - id: nodejs
       content: |

         .. literalinclude:: /includes/examples/node/connect/connect.js
            :language: javascript
            :dedent: 0
            :start-after: Start Connect
            :end-before: End Connect

     - id: csharp
       content: |
         
         The ``MongoDB.Bson`` package is used in CRUD operations, so
         you'll import it here.

         
         .. literalinclude:: /includes/examples/csharp/Connect.cs
            :language: c#
            :dedent: 0
            :start-after: Start Connect
            :end-before: End Connect


