.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst
      
   .. step:: Open the Cluster Creation View.

      a. Click the :guilabel:`Add` arrow in the top-right of the page. 
      
      #. Select :guilabel:`New Replica Set` from the drop-down menu to 
         open the :guilabel:`Create New Replica Set` view.
      
   .. step:: Configure Cluster-Wide Settings.
      
      The :guilabel:`Replica Set Configuration` section contains the
      following cluster-wide configuration settings. Settings marked with an
      :guilabel:`*` asterisk in the  |mms| UI are **required**.
      
      .. list-table::
         :header-rows: 1
         :widths: 25 75
      
         * - Setting
           - Description
      
         * - :guilabel:`Replica Set Id`
           - .. include:: /includes/extracts/deploy-replica-set-id.rst
      
         * - :guilabel:`Replica Set Settings`
           - .. include:: /includes/extracts/deploy-replica-set-settings.rst
      
         * - :guilabel:`Process Name`
           - .. include:: /includes/extracts/deploy-process-name.rst
      
         * - :guilabel:`Version`
           - .. include:: /includes/extracts/deploy-version.rst
      
         * - :guilabel:`Data Directory`
           - .. include:: /includes/extracts/deploy-data-directory.rst
      
         * - :guilabel:`Log File`
           - .. include:: /includes/extracts/deploy-log-file.rst
      
   .. step:: Configure each Replica Set Member.
      
      |mms| lists each replica set member under the
      :guilabel:`MongoD Settings` heading of the
      :guilabel:`Member Configuration` section. Each replica set member
      has the following options:
      
      .. list-table::
         :header-rows: 1
         :widths: 25 75
      
         * - Setting
           - Description
      
         * - :guilabel:`Member`
           - .. include:: /includes/extracts/deploy-member-configuration-member.rst
      
         * - :guilabel:`Hostname`
           - .. include:: /includes/extracts/deploy-member-configuration-hostname.rst
      
         * - :guilabel:`Port`
           - .. include:: /includes/extracts/deploy-member-configuration-port.rst
      
         * - :guilabel:`Votes`
           - .. include:: /includes/extracts/deploy-member-configuration-votes.rst
      
         * - :guilabel:`Priority`
           - .. include:: /includes/extracts/deploy-member-configuration-priority.rst
      
         * - :guilabel:`Delay`
           - .. include:: /includes/extracts/deploy-member-configuration-delay.rst
      
         * - :guilabel:`Build Indexes`
           - .. include:: /includes/extracts/deploy-member-configuration-build-indexes.rst
      
         * - :guilabel:`Tags`
           - .. include:: /includes/extracts/deploy-member-configuration-tags.rst
      
         * - :guilabel:`Add a Mongod`
           - .. include:: /includes/extracts/deploy-member-configuration-add-mongod.rst
      
   .. step:: Configure your Replication Settings.
      
      The :guilabel:`Replication Settings` section contains the following
      configuration options for the replica set:
      
      .. list-table::
         :header-rows: 1
         :widths: 25 75
      
         * - Setting
           - Description
      
         * - :guilabel:`Protocol Version`
           - .. include:: /includes/extracts/deploy-member-replication-protocol-version.rst
      
         * - :guilabel:`Chaining Allowed`
           - .. include:: /includes/extracts/deploy-member-replication-chaining-allowed.rst
      
         * - :guilabel:`Write Concern Majority Journal Default`
           - .. include:: /includes/extracts/deploy-member-replication-write-concern-majority-journal-default.rst
      
         * - :guilabel:`Heartbeat Timeout (secs)`
           - .. include:: /includes/extracts/deploy-member-replication-heartbeat-timeouts.rst
      
         * - :guilabel:`Election Timeout (ms)`
           - .. include:: /includes/extracts/deploy-member-replication-election-timeout.rst
      
         * - :guilabel:`CatchUp Timeout (ms)`
           - .. include:: /includes/extracts/deploy-member-replication-catch-up-timeout.rst
      
         * - :guilabel:`CatchUp Takeover Delay (ms)`
           - .. include:: /includes/extracts/deploy-member-replication-catch-up-takeover-delay.rst
      
         * - :guilabel:`Last Error Defaults`
           - .. include:: /includes/extracts/deploy-member-replication-last-error-defaults.rst
      
         * - :guilabel:`Force Reconfigure`
           - .. include:: /includes/extracts/deploy-member-replication-force-reconfigure.rst
      
   .. step:: Set the default read and write concerns for your MongoDB replica set.
      
      In the :guilabel:`Default Read Concerns/Write Concerns` card, you
      configure the default level of acknowledgement requested from MongoDB
      for read and write operations for this cluster. Setting the default
      read and write concern can help with MongoDB 6.0 and later deployments
      using arbiters.
      
      From the :guilabel:`Default Read Concerns` section, you can set
      :manual:`consistency and isolation properties for the data
      read</reference/read-concern/>` from the cluster.
      
      Select the default read concern from the :guilabel:`Level` dropdown
      menu. You can choose from the following values:
      
      - :manual:`local </reference/read-concern-local>`, the MongoDB 5.0 and
        later default value,
      - :manual:`available </reference/read-concern-available>`, the
        MongoDB 4.4 default value, or
      - :manual:`majority </reference/read-concern-majority>`.
      
      From the :guilabel:`Default Write Concerns` section, you configure the
      :manual:`default level of acknowledgment requested from MongoDB for
      write operations </reference/write-concern/>` from the cluster. You
      can set three parameters:
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
         :stub-columns: 1
      
         * - Parameter
           - Value
      
         * - w Option
           - Desired number of |mongod| instances that must acknowledge a
             write operation. You can enter one of the
             :manual:`following values </reference/write-concern/#w-option>`:
      
             - ``majority``, the MongoDB 6.0 and later default value, or
             - Any positive integer.
      
         * - j Option
           - Flag that indicates whether the write acknowledgement must be
             written to the
             :manual:`on-disk journal </reference/write-concern/#j-option>`.
      
         * - w Timeout
           - :manual:`Desired time limit for the write concern
             </reference/write-concern/#wtimeout>` expressed in
             milliseconds. Set this value when you set **w** to a value
             greater than ``1`` including ``majority``.
      
   .. step:: Set any advanced configuration options for your MongoDB replica set.
      
      The :guilabel:`Advanced Configuration Options` section allows you to 
      set MongoDB :doc:`runtime options 
      </reference/deployment-advanced-options>` for each MongoDB process
      in your deployment.
      
      To add an option:
      
      a. Click :guilabel:`Add Advanced Options`.
      
      #. Click :guilabel:`Select a Startup Option` and select the
         :doc:`configuration option </reference/deployment-advanced-options>`.
      
      #. |mms| displays a context-sensitive input for configuring an
         acceptable value for the selected option.
      
      #. Click :guilabel:`Add` to add the selected option and its
         corresponding value to every process of the selected process type
         in the cluster.
      
      |mms| lists each process in the cluster grouped logically. Click
      the grey arrow to the left of the logical grouping to display
      its sub-groupings and processes. You can modify the advanced options
      for each process individually as necessary.
      
      For descriptions of the available :guilabel:`Advanced Configuration 
      Options`, see :doc:`/reference/deployment-advanced-options`.
      
   .. step:: Click :guilabel:`Create Replica Set`.

      |mms| automatically deploys the replica set as configured.
      You can monitor the progress of cluster deployment from the
      :guilabel:`Deployment` view.
      