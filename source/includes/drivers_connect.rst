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

         .. literalinclude:: /driver-examples/connect.py
            :language: python
            :dedent: 0
            :start-after: Start Connect
            :end-before: End Connect


         If your ``connection_string`` starts with `mongodb+srv`, you need to install the dnspython module with
           
         .. code-block:: sh
            
            python -m pip install dnspython 

         Now add code to call the class you just created.

         .. literalinclude:: /driver-examples/connecttest.py
            :language: python
            :dedent: 0
            :start-after: Start Caller Connect
            :end-before: End Caller Connect
     - id: motor
       content: |

         The ``asyncio`` and ``pprint`` imports will be used as you add functionality to your example code.
         
         .. literalinclude:: /driver-examples/motorconnect.py
            :language: python
            :dedent: 0
            :start-after: Start Connect
            :end-before: End Connect

     - id: java-sync
       content: |

         .. literalinclude:: /driver-examples/JavaConnectExample.java
            :language: java
            :dedent: 4
            :start-after: Start Connection
            :end-before: End Connection

     - id: nodejs
       content: |

         .. literalinclude:: /driver-examples/connect.js
            :language: javascript
            :dedent: 0
            :start-after: Start Connect
            :end-before: End Connect

     - id: csharp
       content: |
         
         The ``MongoDB.Bson`` package is used in CRUD operations, so you'll import it here.
         
         .. literalinclude:: /driver-examples/csharpconnect.cs
            :language: javascript
            :dedent: 0
            :start-after: Start Connect
            :end-before: End Connect

    # - id: php
    #   content: |
    #
    #     The connection code has been separated into a class.
    #
    #     .. literalinclude:: /driver-examples/connect.php
    #        :language: php
    #        :dedent: 0
    #        :start-after: Start Connect
    #        :end-before: End Connect
    #
    #     And the caller script:
    #
    #     .. literalinclude:: /driver-examples/phpconnecttest.phpt
    #        :language: php
    #        :dedent: 0
    #        :start-after: Start Connect Call
    #        :end-before: End Connect Call
    #
    # - id: perl
    #   content: |
    #
    #     .. code-block:: sh
    #
    #        use MongoDB;
    #
    #        my $client = MongoDB->connect('<URISTRING>');
    #
    # - id: ruby
    #   content: |
    #
    #     The MongoDB ruby driver will initiate a connection with the server when you run this command:
    #
    #     .. code-block:: sh
    #
    #        require 'mongo'
    #
    #        client = Mongo::Client.new('<URISTRING>')
    #
    #
    # - id: scala
    #   content: |
    #
    #     The MongoClient instance below is a connection *pool* -- which
    #     means per application you typically only need one instance. The
    #     instance is then shared across operations whenever possible.
    #
    #     .. code-block:: sh
    #
    #        import org.mongodb.scala._
    #
    #          object Main extends App {
    #
    #            val ages = Seq(42, 75, 29, 64)
    #            println(s"The oldest person is ${ages.max}")
    #
    #            // Use a Connection String
    #            val mongoClient: MongoClient = MongoClient("<URISTRING>")
    #
    #          }
