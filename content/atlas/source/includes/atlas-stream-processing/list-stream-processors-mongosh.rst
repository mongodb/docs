To list all available stream processors on the current {+spw+}
with {+mongosh+}, use the :method:`sp.listStreamProcessors()`
method. This returns a list of documents containing the name,
start time, current state, and pipeline associated with each
stream processor. It has the following syntax:

.. code-block:: sh

   sp.listStreamProcessors(<filter>)

``<filter>`` is a document specifying which field(s) to filter the list 
by.

.. example::

  The following example shows a return value for an unfiltered 
  request:

  .. io-code-block::
      :copyable: true

      .. input:: 
        :language: sh

        sp.listStreamProcessors()

      .. output:: 
        :language: json
        :visible: false
        :linenos:

        {
          id: '0135',
          name: "proc01",
          last_modified: ISODate("2023-03-20T20:15:54.601Z"),
          state: "RUNNING",
          error_msg: '',
          pipeline: [
            {
              $source: {
                connectionName: "myKafka", 
                topic: "stuff"
              }
            },
            {
              $match: { 
                temperature: 46 
              }
            },
            {
              $emit: {
                connectionName: "mySink",
                topic: "output",
              }  
            }
          ],
          lastStateChange: ISODate("2023-03-20T20:15:59.442Z")
        },
        {   
          id: '0218',
          name: "proc02",
          last_modified: ISODate("2023-03-21T20:17:33.601Z"),
          state: "STOPPED",
          error_msg: '',
          pipeline: [
            {
              $source: {
                connectionName: "myKafka", 
                topic: "things"
              }
            },
            {
              $match: { 
                temperature: 41 
              }
            },
            {
              $emit: {
                connectionName: "mySink",
                topic: "results",
              }  
            }
          ],
          lastStateChange: ISODate("2023-03-21T20:18:26.139Z")
        }

  If you run the command again on the same {+spw+}, filtering for a 
  ``"state"`` of ``"running"``, you see the following output:

  .. io-code-block::
      :copyable: true

      .. input:: 
        :language: sh

        sp.listStreamProcessors({"state": "running"})

      .. output:: 
        :language: json
        :visible: false
        :linenos:

        {
          id: '0135',
          name: "proc01",
          last_modified: ISODate("2023-03-20T20:15:54.601Z"),
          state: "RUNNING",
          error_msg: '',
          pipeline: [
            {
              $source: {
                connectionName: "myKafka", 
                topic: "stuff"
              }
            },
            {
              $match: { 
                temperature: 46 
              }
            },
            {
              $emit: {
                connectionName: "mySink",
                topic: "output",
              }  
            }
          ],
          lastStateChange: ISODate("2023-03-20T20:15:59.442Z")
        }
