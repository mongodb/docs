.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         Replace the password in the URI string and run the following:

         .. cssclass:: urilistener
         .. code-block:: sh

            mongo <URISTRING>

         If you would rather not provide your password on the command
         line, you can remove it from the URI string and pass the
         remaining URI to the mongo shell followed by the ``--password``
         option. You will then be prompted for your password.

         .. cssclass:: urilistener
         .. code-block:: sh

         mongo <URISTRING_NOUSER> --password
              
         Alternatively you can skip the URI and authenticate username
         and password once you run the ``mongo`` command and execute the
         shell. Pass in a hostname and port to the mongo shell in order
         to direct the shell to the server.

         .. code-block:: sh

            mongo --hostname <hostname> --port <port>

         Once you see the mongo prompt, you will need to authenticate
         in order to conduct any database operations. First, switch to
         the authentication database/authSource database and then call
         the authenticate function. For example:

         .. code-block:: sh

            use admin
            db.auth({user:"<username>", pwd:"<password>"})


     - id: compass
       content: |  

         MongoDB Compass can detect whether you have a MongoDB URI
         connection string in your system clipboard and auto-populate
         the connection dialog from the URI.

         First, copy the URI string below.

         .. code-block:: sh

            <URISTRING>

         Now start Compass. Compass will be able to access the URI and
         use it for the connection.

         If Compass was already running when you copied the URI string,
         click the :guilabel:`NEW CONNECTION` button.

         .. figure:: /images/connect-to-host.png
            :scale: 100 %

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

         Now add code to call the class you just created.
         
         .. literalinclude:: /driver-examples/connecttest.py
            :language: python
            :dedent: 0
            :start-after: Start Caller Connect
            :end-before: End Caller Connect

         While you wouldn't typically close a connection before you use
         it to do anything, it is good form to include a close statement
         in any code you are writing as you learn MongoDB.

         .. code-block:: sh

            client.close()
         
     - id: motor
       content: |
         
         The ``asyncio`` and ``pprint`` imports will be used as you add functionality to your example code.
         
         .. code-block:: sh
         
            import motor.motor_asyncio
            import asyncio
            import pprint

            client = motor.motor_asyncio.AsyncIOMotorClient('<URISTRING>')

         While you wouldn't typically close a connection before you use
         it to do anything, it is good form to include a close statement
         in any code you are writing as you learn MongoDB.

         .. code-block:: sh

            client.close()

     - id: java-sync
       content: |

         This example uses a static utility method to make a connection.

         .. literalinclude:: /driver-examples/JavaConnectDocumentationSamples.java
            :language: java
            :dedent: 4
            :start-after: Start Connect
            :end-before: End Connect

         The code below calls the static utility method above
         to return a connection.

         .. literalinclude:: /driver-examples/JavaConnectTest.java
            :language: java
            :dedent: 4
            :start-after: Start Call Example
            :end-before: End Call Example

         While you wouldn't typically close a connection before you use
         it to do anything, it is good form to include a close statement
         in any code you are writing as you learn MongoDB.

         .. code-block:: sh

            mongoClient.close();

     - id: nodejs
       content: |
        
         Note that you will need to modify the URI string
         manually below, as node requires URI encoding.
         
         .. literalinclude:: /driver-examples/connect.js
            :language: javascript
            :dedent: 0
            :start-after: Start Connect
            :end-before: End Connect
     
     - id: csharp
       content: |

         The ``MongoDB.Bson`` package is used in the CRUD operation.
         
         .. code-block:: sh
        
         
            using System;
            using MongoDB.Bson;
            using MongoDB.Driver;
           
            namespace csharptest
            {
                class Program
                {
                    static void Main(string[] args)
                    {
                       var client = new MongoClient("<URISTRING>");

                    }
                }
            }

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
    #     While you wouldn't typically close a connection before you use
    #     it to do anything, it is good form to include a close statement
    #     in any code you are writing as you learn MongoDB.
    #
    #     .. code-block:: sh
    #
    #        $test->close();
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
    #     While you wouldn't typically close a connection before you use
    #     it to do anything, it is good form to include a close statement
    #     in any code you are writing as you learn MongoDB.
    #
    #     .. code-block:: sh
    #
    #        $client->disconnect;
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
    #     While you wouldn't typically close a connection before you use
    #     it to do anything, it is good form to include a close statement
    #     in any code you are writing as you learn MongoDB.
    #
    #     .. code-block:: sh
    #
    #        client.close
    #
    #
    # - id: scala
    #   content: |
    #
    #     The MongoClient instance below is a connection *pool* -- which
    #     means per application you typically only need one instance. The
    #     instance is then shared across operations whenever possible.
    #
    #     The close statement used below is to ensure that your script
    #     does not leave connections open while you get acquainted with
    #     coding to MongoDB.
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
    #            mongoClient.close();
    #
    #          }
