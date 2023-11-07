*Available in MongoDB Enterprise only*

A :binary:`~bin.mongod` or :binary:`~bin.mongos` running with 
:parameter:`redactClientLogData` redacts any message accompanying a given log
event before logging, leaving only metadata, source files, or line numbers 
related to the event. :parameter:`redactClientLogData` prevents 
potentially sensitive information from entering the system log at the cost of 
diagnostic detail.

For example, the following operation inserts a document into a
:binary:`~bin.mongod` running without log redaction. The :binary:`~bin.mongod`
has the :ref:`log verbosity level <log-messages-configure-verbosity>` set to 
``1``:

.. code-block:: javascript

   db.clients.insertOne( { "name" : "Joe", "PII" : "Sensitive Information" } )

This operation produces the following log event:

.. code-block:: text

   2017-06-09T13:35:23.446-04:00 I COMMAND  [conn1] command internal.clients
      appName: "MongoDB Shell"
      command: insert {
         insert: "clients",
         documents: [ {
               _id: ObjectId('593adc5b99001b7d119d0c97'),
               name: "Joe",
               PII: " Sensitive Information"
            } ],
         ordered: true
      }
      ...

When :binary:`~bin.mongod` runs with :parameter:`redactClientLogData` and
performs the same insert operation, it produces the following log event:

.. code-block:: text

   2017-06-09T13:45:18.599-04:00 I COMMAND  [conn1] command internal.clients
      appName: "MongoDB Shell"
      command: insert {
         insert: "###", documents: [ {
            _id: "###", name: "###", PII: "###"
         } ],
         ordered: "###"
      }

Use :parameter:`redactClientLogData` in conjunction with 
:ref:`security-encryption-at-rest` and :ref:`transport-encryption` to assist 
compliance with regulatory requirements.
