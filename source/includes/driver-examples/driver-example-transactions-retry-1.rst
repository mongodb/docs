.. tabs-drivers::

   tabs:

     - id: shell
       content: |
         .. code-block:: javascript

            // Runs the txnFunc and retries if TransientTransactionError encountered

            function runTransactionWithRetry(txnFunc, session) {
                while (true) {
                    try {
                        txnFunc(session);  // performs transaction
                        break;
                    } catch (error) {
                        print("Transaction aborted. Caught exception during transaction.");

                        // If transient error, retry the whole transaction
                        if ( error.hasOwnProperty("errorLabels") && error.errorLabels.includes( "TransientTransactionError")  ) {
                            print("TransientTransactionError, retrying transaction ...");
                            continue;
                        } else {
                            throw error;
                        }
                    }
                }
            }
         
     - id: python
       content: |

         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Transactions Retry Example 1
            :end-before: End Transactions Retry Example 1

     - id: java-sync
       content: |
         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

         .. code-block:: javascript

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

     - id: nodejs
       content: |

         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.

         .. literalinclude:: /driver-examples/node-promises-examples.js
            :dedent: 2
            :language: javascript
            :start-after: Start Transactions Retry Example 1
            :end-before: End Transactions Retry Example 1

     - id: perl
       content: |
         .. important::

            To associate read and write operations with a transaction, you **must**
            pass the session to each operation in the transaction.
         .. literalinclude:: /driver-examples/perl-transactions-examples.t
            :language: perl
            :start-after: Start Transactions Retry Example 1
            :end-before: End Transactions Retry Example 1