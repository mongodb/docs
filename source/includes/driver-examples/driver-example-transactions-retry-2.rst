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
         .. class:: copyable-code
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
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/node-promises-examples.js
            :language: javascript
            :start-after: Start Transactions Retry Example 2
            :end-before: End Transactions Retry Example 2
