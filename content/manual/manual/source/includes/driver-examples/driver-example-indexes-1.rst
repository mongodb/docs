.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         
         This example creates a single key ascending index on the
         ``name`` field:

         .. code-block:: javascript

            db.collection.createIndex( { name: 1 } )

     - id: python
       content: |

         This example creates a single key ascending index on the
         ``name`` field:

         .. code-block:: python

            collection.create_index([("name", pymongo.ASCENDING)])

     - id: motor
       content: |

         This example creates a single key ascending index on the
         ``name`` field:

         .. code-block:: python

            await collection.create_index([("name", pymongo.ASCENDING)])

     - id: java-sync
       content: |

         This example creates a single key ascending index on the
         ``name`` field:

         .. code-block:: java

            collection.createIndex(Indexes.ascending("name"));

     - id: java-async
       content: |

         This example creates a single key ascending index on the
         ``name`` field:

         .. code-block:: java

            collection.createIndex(Indexes.ascending("name"), someCallbackFunction());

     - id: kotlin-coroutine
       content: |

         This example creates a single key ascending index on the
         ``name`` field:

         .. literalinclude:: /driver-examples/kotlin_examples.kt
            :language: kotlin
            :dedent:
            :start-after: Start Index Example 1
            :end-before: End Index Example 1

     - id: nodejs
       content: |

         This example creates a single key ascending index on the
         ``name`` field:

         .. code-block:: javascript

             collection.createIndex( { name : 1 }, function(err, result) {
               console.log(result);
               callback(result);
            } )

     - id: php
       content: |

         This example creates a single key ascending index on the
         ``name`` field:

         .. code-block:: php

            $collection->createIndex(['name' => 1]);

     - id: perl
       content: |

         This example creates a single key ascending index on the
         ``name`` field:

         .. code-block:: perl

            my $indexes = $db->get_collection( <collection> )->indexes;
            $indexes->create_one( [ name => 1 ] );

     - id: ruby
       content: |

         This example creates a single key ascending index on the
         ``name`` field:

         .. code-block:: ruby

            client[:collection].indexes.create_one({ name: 1 })

     - id: scala
       content: |

         This example creates a single key ascending index on the
         ``name`` field:

         .. code-block:: scala

            collection.createIndex(ascending("name"))

     - id: csharp
       content: |

         This example creates a single key ascending index on the
         ``name`` field:

         .. code-block:: csharp

            collection.CreateIndex( IndexKeys<collection>.Ascending("name") );
