.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Select the cluster.

      a. Click the ellipsis icon (``...``) next to the cluster that 
         contains the ``mongod`` instance whose logs you want to 
         download.
         
      #. Select :guilabel:`Download Logs`.
      
   .. step:: Edit the fields.
    
      In the :guilabel:`Download Logs` dialog box, edit the following 
      fields:
      
      .. list-table::
         :header-rows: 1
         :widths: 30 60
         :stub-columns: 1
         
         * - Field
           - Content
      
         * - Select process
           - Select the process for which you want logs. 
             For clusters where the only log type available is ``mongod``, 
             |service| does not display this field. 
             
             Valid options are:
      
             .. list-table::
                :header-rows: 1
                :widths: 30 40
      
                * - Option
                  - Description
                  
                * - ``mongod``
                  - Database :manual:`server </reference/program/mongod/>` logs.
      
                * - ``mongod-audit-log``
                  - :ref:`Database auditing <set-up-database-auditing>` logs.
                    Note: this option only appears if you have database auditing
                    enabled for your cluster.
      
                * - ``mongos``
                  - :manual:`mongos </reference/program/mongos/>` logs. Note:
                    this option only appears if your cluster is :manual:`sharded
                    </sharding/>`.
      
                * - ``mongos-audit-log``
                  - :manual:`mongos </reference/program/mongos/>` auditing
                    logs. Note: this option only appears if your sharded cluster
                    has auditing enabled.
      
                * - ``mongosqld``
                  - :ref:`BI Connector <bi-connection>` logs. Note: this option
                    only appears if you have BI Connector enabled for your
                    cluster.
      
         * - Select server
           - Select the server in the cluster whose logs you want to retrieve.
      
         * - Time Period
           
           - Select the time frame of log activity to return. If you select
             :guilabel:`Custom Time`, specify the inclusive start and end 
             time of log activity to return. The start time must be less 
             than 30 days ago.
      
             :gold:`IMPORTANT:` To ensure that your log data returns within the desired time 
             frame, set the time zone in your |service| :ref:`project settings <project-settings>`.
      
   .. step:: Click :guilabel:`Download Logs`.
