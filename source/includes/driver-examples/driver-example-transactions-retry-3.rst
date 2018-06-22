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
            session = db.getMongo().startSession( { mode: "primary" } );

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

     - id: java-sync
       content: |

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
                MongoCollection<Document> eventsCollection = client.getDatabase("hr").getCollection("events");

                try (ClientSession clientSession = client.startSession()) {
                    clientSession.startTransaction();

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

