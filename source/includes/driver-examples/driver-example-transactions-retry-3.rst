.. tabs-drivers::

   tabs:

     - id: python
       content: |
         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

                  .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Transactions Retry Example 3
            :end-before: End Transactions Retry Example 3

     - id: java-sync
       content: |

         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

         .. code-block:: java

            void runTransactionWithRetry(Runnable transactional) {
                while (true) {
                    try {
                        transactional.run();
                        break;
                    } catch (MongoException e) {
                        System.out.println("Transaction aborted. Caught exception during transaction.");

                        if (e.hasErrorLabel(MongoException.TRANSIENT_TRANSACTION_ERROR_LABEL)) {
                            System.out.println("TransientTransactionError, aborting transaction and retrying ...");
                            continue;
                        } else {
                            throw e;
                        }
                    }
                }
            }

            void commitWithRetry(ClientSession clientSession) {
                while (true) {
                    try {
                        clientSession.commitTransaction();
                        System.out.println("Transaction committed");
                        break;
                    } catch (MongoException e) {
                        // can retry commit
                        if (e.hasErrorLabel(MongoException.UNKNOWN_TRANSACTION_COMMIT_RESULT_LABEL)) {
                            System.out.println("UnknownTransactionCommitResult, retrying commit operation ...");
                            continue;
                        } else {
                            System.out.println("Exception during commit ...");
                            throw e;
                        }
                    }
                }
            }
            
            void updateEmployeeInfo() {

                MongoCollection<Document> employeesCollection = client.getDatabase("hr").getCollection("employees");
                MongoCollection<Document> eventsCollection = client.getDatabase("reporting").getCollection("events");

                TransactionOptions txnOptions = TransactionOptions.builder()
                        .readPreference(ReadPreference.primary())
                        .readConcern(ReadConcern.MAJORITY)
                        .writeConcern(WriteConcern.MAJORITY)
                        .build();

                try (ClientSession clientSession = client.startSession()) {
                    clientSession.startTransaction(txnOptions);

                    employeesCollection.updateOne(clientSession,
                            Filters.eq("employee", 3),
                            Updates.set("status", "Inactive"));
                    eventsCollection.insertOne(clientSession,
                            new Document("employee", 3).append("status", new Document("new", "Inactive").append("old", "Active")));

                    commitWithRetry(clientSession);
                }
            }
            
            
            void updateEmployeeInfoWithRetry() {
                runTransactionWithRetry(this::updateEmployeeInfo);
            }


     - id: nodejs
       content: |
         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

         .. literalinclude:: /driver-examples/node_transactions.js
            :language: javascript
            :dedent: 6
            :start-after: Start Transactions Retry Example 3
            :end-before: End Transactions Retry Example 3

     - id: perl
       content: |
         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

         .. literalinclude:: /driver-examples/perl-transactions-examples.t
            :language: perl
            :start-after: Start Transactions Retry Example 3
            :end-before: End Transactions Retry Example 3

     - id: scala
       content: |
         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

         .. literalinclude:: /driver-examples/DocumentationTransactionsExampleSpec.scala
            :language: scala
            :lines: 50-

     - id: ruby
       content: |
         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

         .. literalinclude:: /driver-examples/transactions_examples_spec.rb
            :language: ruby
            :dedent: 6
            :start-after: Start Transactions Retry Example 3
            :end-before: End Transactions Retry Example 3

     - id: php
       content: |
         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 4
            :start-after: Start Transactions Retry Example 3
            :end-before: End Transactions Retry Example 3

     - id: csharp
       content: |

         .. literalinclude:: /driver-examples/TransactionsRetryExample3.cs
            :language: c#
            :dedent: 8
            :start-after: Start Transactions Retry Example 3
            :end-before: End Transactions Retry Example 3

     - id: c
       content: |

         .. literalinclude:: /driver-examples/test-mongoc-sample-commands.c 
            :language: c
            :start-after: Start Transactions Retry Example 3
            :end-before: End Transactions Retry Example 3

     - id: cpp
       content: |

         .. literalinclude:: /driver-examples/cpp-transactions.cpp
            :language: cpp
            :dedent: 8
            :start-after: Start Transactions Retry Example 3
            :end-before: End Transactions Retry Example 3

     - id: go
       content: |

         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :start-after: Start Transactions Retry Example 3
            :end-before: End Transactions Retry Example 3

     - id: motor
       content: |

          .. note::
          
             For Motor, see the :ref:`txn-callback-api` instead.

