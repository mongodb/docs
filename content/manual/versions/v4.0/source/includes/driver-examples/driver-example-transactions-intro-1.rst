.. tabs-drivers::

   tabs:

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Transactions Intro Example 1
            :end-before: End Transactions Intro Example 1


     - id: java-sync
       content: |

          .. code-block:: java

             try (ClientSession clientSession = client.startSession()) {
                 clientSession.startTransaction();

                 employeesCollection.updateOne(clientSession,
                         Filters.eq("employee", 3),
                         Updates.set("status", "Inactive"));
                 eventsCollection.insertOne(clientSession,
                         new Document("employee", 3).append("status", new Document("new", "Inactive").append("old", "Active")));

                 commitWithRetry(clientSession);
             }

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/node_transactions.js
            :language: javascript
            :start-after: Start Transactions Intro Example 1
            :end-before: End Transactions Intro Example 1

     - id: cpp
       content: |

         .. literalinclude:: /driver-examples/cpp-transactions.cpp
            :language: cpp
            :dedent: 8
            :start-after:  Start Transactions Intro Example 1
            :end-before: End Transactions Intro Example 1
