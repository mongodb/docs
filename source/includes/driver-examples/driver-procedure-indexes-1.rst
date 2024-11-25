.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         To create an index in :binary:`mongosh`, use
         :method:`db.collection.createIndex()`.

         .. code-block:: javascript

            db.collection.createIndex( <key and index type specification>, <options> )

     - id: python
       content: |

         To create an index using the
         `Python driver <https://www.mongodb.com/docs/languages/python/pymongo-driver/current/>`_,
         use the `pymongo.collection.Collection.create_index
         <https://www.mongodb.com/docs/languages/python/pymongo-driver/current/work-with-indexes/#create-an-index>`_
         method:

         .. code-block:: python

            db.collection.create_index([(<key and index type specification>)], <options> )

     - id: motor
       content: |

         To create an index using the
         `Motor driver <https://motor.readthedocs.io/en/stable/>`_,
         use
         :py:meth:`motor.motor_asyncio.AsyncIOMotorCollection.create_index`.

         .. code-block:: python

            await db.collection.create_index([(<key and index type specification>)], <options> )

     - id: java-sync
       content: |

         To create an index using the
         `Java driver <https://mongodb.github.io/mongo-java-driver/>`_,
         use
         `com.mongodb.client.MongoCollection.createIndex <http://mongodb.github.io/mongo-java-driver/3.4/javadoc/?com/mongodb/client/MongoCollection.html#createIndex-org.bson.conversions.Bson->`_.

         .. code-block:: java

            collection.createIndex( <key and index type specification>, <options> )å

     - id: java-async
       content: |

         To create an index using the
         `Async Java driver <http://mongodb.github.io/mongo-java-driver/3.0/driver-async/>`_,
         use
         `com.mongodb.async.client.MongoCollection.createIndex <http://mongodb.github.io/mongo-java-driver/3.4/javadoc/?com/mongodb/async/client/MongoCollection.html#createIndex-org.bson.conversions.Bson-com.mongodb.async.SingleResultCallback->`_.

         .. code-block:: java

            collection.createIndex( <key and index type specification>, <options>, <callbackFunction>)

     - id: nodejs
       content: |

         To create an index using the
         `Node.JS driver <https://www.mongodb.com/docs/drivers/node/current/>`_,
         use ``createIndex()``.

         .. code-block:: javascript

            collection.createIndex( { <key and index type specification> }, function(err, result) {
               console.log(result);
               callback(result);
            } )

     - id: php
       content: |

         To create an index using the
         `PHP driver <https://www.mongodb.com/docs/php-library/current/>`_, use
         :phpmethod:`MongoDB\\Collection::createIndex() <phpmethod.MongoDB\\Collection::createIndex()>`.

         .. code-block:: php

            $collection->createIndex(<key and index type specification>, <options>);

     - id: perl
       content: |

         To create an index using the
         `Perl driver <http://search.cpan.org/dist/MongoDB/lib/MongoDB.pm>`_,
         use
         `create_one() <https://metacpan.org/pod/MongoDB::Examples#CREATE-INDEX-myindexname-ON-users(name)>`_.

         .. code-block:: perl

            my $indexes = $db->get_collection( <collection> )->indexes;
            $indexes->create_one( [ <key and index type specification> ] );

     - id: ruby
       content: |

         To create an index using the
         `Ruby driver <https://www.mongodb.com/docs/ruby-driver/current/>`_, use
         `Mongo::Index::View#create_one <http://www.rubydoc.info/github/mongodb/mongo-ruby-driver/Mongo%2FIndex%2FView%3Acreate_one>`_.

         .. code-block:: ruby

            client[:collection].indexes.create_one({ <key and index type specification> }, {options})

     - id: scala
       content: |

         To create an index using the
         `Scala driver <http://mongodb.github.io/mongo-scala-driver/>`_,
         use
         `org.mongodb.scala.model.Indexes <https://mongodb.github.io/mongo-scala-driver/1.0/scaladoc/index.html#org.mongodb.scala.model.Indexes$>`_.

         .. code-block:: scala

            collection.createIndex(<key and index type specification>)

     - id: csharp
       content: |

         To create an index using the
         `.NET driver <http://mongodb.github.io/mongo-csharp-driver/>`_,
         use
         `MongoCollection.CreateIndex <http://api.mongodb.com/csharp/current/html/Overload_MongoDB_Driver_MongoCollection_CreateIndex.htm>`_.

         .. code-block:: csharp

            collection.CreateIndex( IndexKeys<collection>.<key and index type specification>, <options> );
