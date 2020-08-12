.. tabs-drivers::

   tabs:

     - id: shell
       content: |
         .. code-block:: javascript

            // Retries commit if UnknownTransactionCommitResult encountered

            function commitWithRetry(session) {
                while (true) {
                    try {
                        session.commitTransaction(); // Uses write concern set at transaction start.
                        print("Transaction committed.");
                        break;
                    } catch (error) {
                        // Can retry commit
                        if (error.hasOwnProperty("errorLabels") && error.errorLabels.includes( "UnknownTransactionCommitResult") ) {
                            print("UnknownTransactionCommitResult, retrying commit operation ...");
                            continue;
                        } else {
                            print("Error during commit ...");
                            throw error;
                        }
                   }
                }
            }

     - id: python
       content: |
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Transactions Retry Example 2
            :end-before: End Transactions Retry Example 2

     - id: java-sync
       content: |
         .. code-block:: java

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

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_transactions.js
            :language: javascript
            :dedent: 6
            :start-after: Start Transactions Retry Example 2
            :end-before: End Transactions Retry Example 2

     - id: perl
       content: |
         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

                  .. literalinclude:: /driver-examples/perl-transactions-examples.t
            :language: perl
            :start-after: Start Transactions Retry Example 2
            :end-before: End Transactions Retry Example 2

     - id: scala
       content: |
         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

         .. literalinclude:: /driver-examples/DocumentationTransactionsExampleSpec.scala
            :language: scala
            :lines: 66-77

     - id: ruby
       content: |
         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

         .. literalinclude:: /driver-examples/transactions_examples_spec.rb
            :language: ruby
            :dedent: 6
            :start-after: Start Transactions Retry Example 2
            :end-before: End Transactions Retry Example 2

     - id: php
       content: |

         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 4
            :start-after: Start Transactions Retry Example 2
            :end-before: End Transactions Retry Example 2

     - id: csharp
       content: |

         .. literalinclude:: /driver-examples/TransactionsRetryExample2.cs
            :language: c#
            :dedent: 8
            :start-after: Start Transactions Retry Example 2
            :end-before: End Transactions Retry Example 2


     - id: c
       content: |

         .. literalinclude:: /driver-examples/test-mongoc-sample-commands.c 
            :language: c
            :start-after: commit transactions with retry logic
            :end-before: updates two collections in a transaction 

     - id: cpp
       content: |

         .. literalinclude:: /driver-examples/cpp-transactions.cpp
            :language: cpp
            :dedent: 8
            :start-after: Start Transactions Retry Example 2
            :end-before: End Transactions Retry Example 2

     - id: go
       content: |

         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :start-after: Start Transactions Retry Example 2
            :end-before: End Transactions Retry Example 2
