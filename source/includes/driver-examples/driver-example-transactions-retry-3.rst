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
                        // If transient error, retry the whole transaction
                        if ( error.hasOwnProperty("errorLabels") && error.errorLabels.includes("TransientTransactionError")  ) {
                            print("TransientTransactionError, retrying transaction ...");
                            continue;
                        } else {
                            throw error;
                        }
                    }
                }
            }

            // Retries commit if UnknownTransactionCommitResult encountered

            function commitWithRetry(session) {
                while (true) {
                    try {
                        session.commitTransaction(); // Uses write concern set at transaction start.
                        print("Transaction committed.");
                        break;
                    } catch (error) {
                        // Can retry commit
                        if (error.hasOwnProperty("errorLabels") && error.errorLabels.includes("UnknownTransactionCommitResult") ) {
                            print("UnknownTransactionCommitResult, retrying commit operation ...");
                            continue;
                        } else {
                            print("Error during commit ...");
                            throw error;
                        }
                   }
                }
            }

            // Updates two collections in a transactions

            function updateEmployeeInfo(session) {
                employeesCollection = session.getDatabase("hr").employees;
                eventsCollection = session.getDatabase("reporting").events;

                session.startTransaction( { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } } );

                try{
                    employeesCollection.updateOne( { employee: 3 }, { $set: { status: "Inactive" } } );
                    eventsCollection.insertOne( { employee: 3, status: { new: "Inactive", old: "Active" } } );
                } catch (error) {
                    print("Caught exception during transaction, aborting.");
                    session.abortTransaction();
                    throw error;
                }

                commitWithRetry(session);
            }

            // Start a session.
            session = db.getMongo("myRepl/mongodb0.example.net:27017,mongodb1.example.net:27017,mongodb2.example.net:27017").startSession( { mode: "primary" } );

            try{
               runTransactionWithRetry(updateEmployeeInfo, session);
            } catch (error) {
               // Do something with error
            } finally {
               session.endSession();
            }

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Transactions Retry Example 3
            :end-before: End Transactions Retry Example 3

