.. tabs-drivers::

   tabs:
     - id: python
       content: |

         .. literalinclude:: /includes/code/python/crud-read-switch.py
            :caption: crud_read.py
            :language: python
            :dedent: 0

     - id: motor
       content: |

         To access the ``test`` database:

         .. code-block:: python

            db = client.test

     - id: go
       content: |

         .. literalinclude:: /includes/code/go/crud-read-switch.go
            :caption: crudRead.go
            :language: go
            :linenos:
            :dedent: 0


     - id: java-sync
       content: |

         .. literalinclude:: /includes/code/java/CrudReadSwitch.java
            :caption: CrudRead.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         .. literalinclude:: /includes/code/node/crud-read-switch.js
            :caption: crud-read.js
            :language: javascript
            :dedent: 0


     - id: csharp
       content: |

         .. literalinclude:: /includes/code/dotnet/CrudReadSwitch.cs
            :caption: CrudRead.cs
            :language: csharp
            :dedent: 0
..
  # - id: php
  #  content: |

  #   .. code-block:: php
  #
  #      $db = $manager->test;


  # - id: perl
  #  content: |

  #    .. code-block:: perl

  #       use MongoDB;
  #       my $client = MongoDB->connect('<URISTRING>');
  #       my $db = $client->get_database('test');


  # - id: ruby
  #   content: |
  #      If you specified `test` as your database in your URI string,
  #      you should already be connected to the `test` database.
  #      You can also use JSON to configure the connect options. Note
  #      that you will need to pass in the authSource along with the
  #      username and password, or as part of the URI String.
  #
  #      .. code-block:: ruby
  #
  #         client_options = {
  #           database: 'test',
  #           user: '<USERNAME>',
  #           password: '<PASSWORD>',
  #         }
  #
  #         client = Mongo::Client.new('mongodb://localhost:27017/?authSource=admin', client_options);
  #
  # - id: scala
  #   content: |
  #
  #      .. code-block:: scala
  #
  #         val database: MongoDatabase = mongoClient.getDatabase("test")
  #
  #
  # - id: shell
  #   content: |

  #     To switch to the ``test`` database in the ``mongo`` shell, type

  #     .. code-block:: sh

  #        use test

  # - id: compass
  #   content: |

  #     If the database has not been created already, click the
  #     :guilabel:`Create Database` button.

  #     .. figure:: /images/compass-create-database.png
  #        :alt: Screeenshot after connecting with the "Create Database" button.
  #        :figwidth: 750px

  #     Select the ``test`` database on the left side of the Compass
  #     interface. Compass will list all of the collections in the
  #     database below the database name.

  #     .. figure:: /images/compass-select-test-database.png
  #        :alt: Screenshot of the MongoDB Compass UI showing with the "test" database selected in the list of databases in the cluster.
  #        :figwidth: 500px

