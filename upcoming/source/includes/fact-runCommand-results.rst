.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field
     - Description

   * - *<command result>*

     - Result fields specific to the ``command`` that ran.

   * - ``ok``

     - A number that indicates if the command succeeded (``1``)
       or failed (``0``).

   * - ``operationTime``

     - The logical time of the operation. MongoDB uses the logical time 
       to order operations. *Only for replica sets and sharded 
       clusters.*

       If the command does not generate an oplog entry, for example, a
       read operation, then the operation does not advance the logical
       clock. In this case, ``operationTime`` returns:

       - For read concern :readconcern:`"local"`,
         :readconcern:`"snapshot"`, and :readconcern:`"linearizable"`,
         the timestamp of the most recent entry in the oplog.

       - For read concern :readconcern:`"majority"`, the timestamp of
         the most recent :writeconcern:`majority-acknowledged
         <"majority">` entry in the oplog.

       For operations associated with :ref:`causally consistent sessions
       <causal-consistency>`, the MongoDB drivers use the logical time
       to automatically set the :ref:`afterClusterTime` period.

   * - ``$clusterTime``
   
     - A document that returns the signed cluster time. Cluster time is a
       logical time used for ordering of operations. *Only for replica
       sets and sharded clusters. For internal use only.*

       The document contains the following fields:

       - ``clusterTime``: timestamp of the highest known cluster time for the member.

       - ``signature``: a document that contains the hash of the cluster time and the id
         of the key used to sign the cluster time.
