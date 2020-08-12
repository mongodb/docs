.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         To create an index in the
         :doc:`Mongo Shell </tutorial/getting-started/>`, use
         :method:`db.collection.createIndex()`.

                  .. code-block:: javascript

            db.collection.createIndex( <key and index type specification>, <options> )

         The following example creates a single key descending index on
         the ``name`` field:

                  .. code-block:: javascript

            db.collection.createIndex( { name: -1 } )

         The :method:`db.collection.createIndex` method only
         creates an index if an index of the same specification does
         not already exist.

     - id: compass
       content: |
         .. important::

               To create an index on a collection in |compass|,
               the collection must contain documents.

         To create an index in
         :ref:`MongoDB Compass <compass-index>`:

         .. include:: /includes/steps/create-index-compass.rst

     - id: python
       content: |
         To create an index using the
         :api:`Python driver <pymongo>`,
         use :py:meth:`pymongo.collection.Collection.create_index`.

                  .. code-block:: python

            db.collection.create_index([(<key and index type specification>)], <options> )

         The following example creates a single key descending index on
         the ``name`` field:

                  .. code-block:: python

            collection.create_index([("name", pymongo.DESCENDING)])

         The :py:meth:`pymongo.collection.Collection.create_index`
         method only creates an index if an index of the same
         specification does not already exist.

     - id: motor
       content: |
         To create an index using the
         `Motor driver <https://motor.readthedocs.io/en/stable/>`_,
         use
         :py:meth:`motor.motor_asyncio.AsyncIOMotorCollection.create_index`.

                  .. code-block:: python

            await db.collection.create_index([(<key and index type specification>)], <options> )

         The following example creates a single key descending index on
         the ``name`` field:

                  .. code-block:: python

            await collection.create_index([("name", pymongo.DESCENDING)])

         The :py:meth:`motor.motor_asyncio.AsyncIOMotorCollection.create_index`
         method only creates an index if an index of the same
         specification does not already exist.

     - id: java-sync
       content: |
         To create an index using the
         `Java driver <https://mongodb.github.io/mongo-java-driver/>`_,
         use
         `com.mongodb.client.MongoCollection.createIndex <http://mongodb.github.io/mongo-java-driver/3.4/javadoc/?com/mongodb/client/MongoCollection.html#createIndex-org.bson.conversions.Bson->`_.

                  .. code-block:: java

            collection.createIndex( <key and index type specification>, <options> )

         The following example creates a single key descending index on
         the ``name`` field:

                  .. code-block:: java

            collection.createIndex(Indexes.descending("name"));

         The `com.mongodb.client.MongoCollection.createIndex <http://mongodb.github.io/mongo-java-driver/3.4/javadoc/?com/mongodb/client/MongoCollection.html#createIndex-org.bson.conversions.Bson->`_.
         method only creates an index if an index of the same
         specification does not already exist.

     - id: java-async
       content: |
         To create an index using the
         `Async Java driver <http://mongodb.github.io/mongo-java-driver/3.0/driver-async/>`_,
         use
         `com.mongodb.async.client.MongoCollection.createIndex <http://mongodb.github.io/mongo-java-driver/3.4/javadoc/?com/mongodb/async/client/MongoCollection.html#createIndex-org.bson.conversions.Bson-com.mongodb.async.SingleResultCallback->`_.

                  .. code-block:: java

            collection.createIndex( <key and index type specification>, <options>, <callbackFunction>)

         The following example creates a single key descending index on
         the ``name`` field:

                  .. code-block:: java

            collection.createIndex(Indexes.descending("name"), someCallbackFunction());

         The `com.mongodb.async.client.MongoCollection.createIndex <http://mongodb.github.io/mongo-java-driver/3.4/javadoc/?com/mongodb/async/client/MongoCollection.html#createIndex-org.bson.conversions.Bson-com.mongodb.async.SingleResultCallback->`_
         method only creates an index if an index of the same
         specification does not already exist.

     - id: nodejs
       content: |
         To create an index using the
         `Node.JS driver <https://mongodb.github.io/node-mongodb-native/>`_,
         use
         `createIndex() <http://mongodb.github.io/node-mongodb-native/2.1/tutorials/create-indexes/>`_.

                  .. code-block:: javascript

            collection.createIndex( { <key and index type specification> }, function(err, result) {
               console.log(result);
               callback(result);
            }

         The following example creates a single key descending index on
         the ``name`` field:

                  .. code-block:: javascript

             collection.createIndex( { name : -1 }, function(err, result) {
               console.log(result);
               callback(result);
            }

         The `createIndex() <http://mongodb.github.io/node-mongodb-native/2.1/tutorials/create-indexes/>`_
         method only creates an index if an index of the same
         specification does not already exist.

     - id: php
       content: |
         To create an index using the
         `PHP driver <https://docs.mongodb.com/php-library/current/>`_, use
         :phpmethod:`MongoDB\\Collection::createIndex() <phpmethod.MongoDB\\Collection::createIndex>`.

                  .. code-block:: php

            $collection->createIndex(<key and index type specification>, <options>);

         The following example creates a single key descending index on
         the ``name`` field:

                  .. code-block:: php

            $collection->createIndex(['name' => -1]);

         The :phpmethod:`MongoDB\\Collection::createIndex() <phpmethod.MongoDB\\Collection::createIndex>`
         method only creates an index if an index of the same
         specification does not already exist.

     - id: perl
       content: |
         To create an index using the
         `Perl driver <http://search.cpan.org/dist/MongoDB/lib/MongoDB.pm>`_,
         use
         `create_one() <https://metacpan.org/pod/MongoDB::Examples#CREATE-INDEX-myindexname-ON-users(name)>`_.

                  .. code-block:: perl

            my $indexes = $db->get_collection( <collection> )->indexes;
            $indexes->create_one( [ <key and index type specification> ] );

         The following example creates a single key descending index on
         the ``name`` field:

                  .. code-block:: perl

            my $indexes = $db->get_collection( <collection> )->indexes;
            $indexes->create_one( [ name => -1 ] );

         The `create_one() <https://metacpan.org/pod/MongoDB::Examples#CREATE-INDEX-myindexname-ON-users(name)>`_
         method only creates an index if an index of the same
         specification does not already exist.

     - id: ruby
       content: |
         To create an index using the
         `Ruby driver <https://api.mongodb.com/ruby/current/>`_, use
         `Mongo::Index::View#create_one <http://www.rubydoc.info/github/mongodb/mongo-ruby-driver/Mongo%2FIndex%2FView%3Acreate_one>`_.

                  .. code-block:: ruby

            client[:collection].indexes.create_one({ <key and index type specification> }, {options})

         The following example creates a single key descending index on
         the ``name`` field:

                  .. code-block:: ruby

            client[:collection].indexes.create_one({ name: -1 })

         The `Mongo::Index::View#create_one <http://www.rubydoc.info/github/mongodb/mongo-ruby-driver/Mongo%2FIndex%2FView%3Acreate_one>`_
         method only creates an index if an index of the same
         specification does not already exist.

     - id: scala
       content: |
         To create an index using the
         `Scala driver <http://mongodb.github.io/mongo-scala-driver/>`_,
         use
         `org.mongodb.scala.model.Indexes <https://mongodb.github.io/mongo-scala-driver/1.0/scaladoc/index.html#org.mongodb.scala.model.Indexes$>`_.

                  .. code-block:: scala

            collection.createIndex(<key and index type specification>)

         The following example creates a single key descending index on
         the ``name`` field:

                  .. code-block:: scala

            collection.createIndex(descending("name"))

         The `org.mongodb.scala.model.Indexes <https://mongodb.github.io/mongo-scala-driver/1.0/scaladoc/index.html#org.mongodb.scala.model.Indexes$>`_
         method only creates an index if an index of the same
         specification does not already exist.

     - id: csharp
       content: |
         To create an index using the
         `.NET driver <http://mongodb.github.io/mongo-csharp-driver/>`_,
         use
         `MongoCollection.CreateIndex <http://api.mongodb.com/csharp/current/html/Overload_MongoDB_Driver_MongoCollection_CreateIndex.htm>`_.

                  .. code-block:: csharp

            collection.CreateIndex( IndexKeys<collection>.<key and index type specification>, <options> );

         The following example creates a single key descending index on
         the ``name`` field:

                  .. code-block:: csharp

            collection.CreateIndex( IndexKeys<collection>.Descending("name") );

         The `MongoCollection.CreateIndex <http://api.mongodb.com/csharp/current/html/Overload_MongoDB_Driver_MongoCollection_CreateIndex.htm>`_
         method only creates an index if an index of the same
         specification does not already exist.
