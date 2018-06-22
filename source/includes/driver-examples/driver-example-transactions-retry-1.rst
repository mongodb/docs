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
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Transactions Retry Example 1
            :end-before: End Transactions Retry Example 1

     - id: java-sync
       content: |
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
