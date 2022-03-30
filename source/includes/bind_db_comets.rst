.. tabs-drivers::

   tabs:

     - id: csharp
       content: |

         .. code-block:: csharp

            // database and collection code goes here
            var db = client.GetDatabase("sample_guides");
            var coll = db.GetCollection<BsonDocument>("comets");

     - id: go
       content: |

         .. code-block:: go

            // database and colletion code goes here
            db := client.Database("sample_guides")
            coll := db.Collection("comets")

     - id: java-sync
       content: |

         .. code-block:: java

            // database and collection code goes here
            MongoDatabase db = mongoClient.getDatabase("sample_guides");
            MongoCollection<Document> coll = db.getCollection("comets");

     - id: nodejs
       content: |

         .. code-block:: javascript

            // database and collection code goes here
            const db = client.db("sample_guides");
            const coll = db.collection("comets");

     - id: python
       content: |

         .. code-block:: python

             # database and collection code goes here
             db = client.sample_guides
             coll = db.comets
