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

.. code-block:: javascript
   :copyable: false

   {
      "t": { "$date": "2024-07-19T15:36:55.024-07:00" },
      "s": "I",
      "c": "COMMAND",
      ...
      "attr": {
         "type": "command",
         ...
         "appName": "mongosh 2.2.10",
         "command": {
            "insert": "clients",
            "documents": [
               {
                  "name": "Joe",
                  "PII": "Sensitive Information",
                  "_id": { "$oid": "669aea8792c7fd822d3e1d8c" }
               }
            ],
            "ordered": true,
            ...
         }
         ...
      }
   }


When :binary:`~bin.mongod` runs with :parameter:`redactClientLogData` and
performs the same insert operation, it produces the following log event:

.. code-block:: javascript
   :copyable: false

   {
      "t": { "$date": "2024-07-19T15:36:55.024-07:00" },
      "s": "I",
      "c": "COMMAND",
      ...
      "attr": {
         "type": "command",
         ...
         "appName": "mongosh 2.2.10",
         "command": {
            "insert": "###",
            "documents": [
               {
                  "name": "###",
                  "PII": "###",
                  "_id": "###"
               }
            ],
            "ordered": "###",
            ...
         }
         ...
      }
   }

Use :parameter:`redactClientLogData` in conjunction with 
:ref:`security-encryption-at-rest` and :ref:`transport-encryption` to assist 
compliance with regulatory requirements.
