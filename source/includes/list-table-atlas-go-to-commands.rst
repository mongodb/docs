.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Command
     - Action 

   * - ``access``
     - Go to the :ref:`access manager for the current project <manage-project-access>` 
       or the :doc:`access manager for the current organization </access/manage-org-users/>`
       depending on your location.
       
   * - ``activity``
     - Go to the :doc:`activity feed </tutorial/activity-feed/>` for
       the current project or organization depending on your
       location.

   * - ``advisor``
     - Go to the :ref:`Performance Advisor <performance-advisor>` tab
       for the current cluster.

       The ``advisor`` command is unavailable for sharded {+clusters+}.

   * - ``alerts``
     - Go to the :ref:`alerts <configure-alerts>` for the current
       project or organization depending on your location.

   * - ``backup``
     - Go to the :ref:`Backup <backup-cloud-provider>` tab for the current cluster.
  
   * - ``billing``
     - Go to the :ref:`Billing <atlas-billing>` page for the current
       organization.

   * - ``charts``
     - Go to the top-level :charts:`Charts </>` page for the current
       project.

   * - ``charts {projectName}``
     - Go to the top-level :charts:`Charts </>` page for the specified project.

   * - ``{clusterName}``
     - Go to the specified cluster within the current project.

   * - ``cluster {clusterName}``
     - Go to the specified cluster within the current project. Using ``cluster``
       before the ``{clusterName}`` allows you to autocomplete the cluster name
       using :guilabel:`Tab`.

   * - ``cluster {clusterName} advisor``
     - Go to the :ref:`Performance Advisor <performance-advisor>` tab
       for the specified cluster within the current project.

       You can also use the ``advisor`` command without specifying a cluster to go to the :ref:`Performance Advisor <performance-advisor>` tab for the current cluster.

       The ``cluster {clusterName} advisor`` and ``advisor`` commands are unavailable for sharded {+clusters+}.       

   * - ``cluster {clusterName} backup``
     - Go to the :ref:`Backup <backup-cloud-provider>` tab for the specified
       cluster within the current project.

       You can also use the ``backup`` command without specifying a cluster to
       go to the :ref:`Backup <backup-cloud-provider>` tab for the current cluster.

   * - ``cluster {clusterName} collections``
     - Go to the :ref:`Collections <atlas-ui-view-collections>` tab for
       the specified cluster within the current project.

       You can also use the ``collections``` command without specifying a
       cluster to go to the :ref:`Collections <atlas-ui-view-collections>` tab for the
       current cluster.

   * - ``cluster {clusterName} connect``
     - Go to the :ref:`connection modal <atlas-connect-to-deployment>` for the
       specified cluster.

   * - ``cluster {clusterName} metrics``
     - Go to the :ref:`Metrics <monitor-cluster-metrics>` tab for the specified
       cluster within the current project.

       You can also use the ``metrics`` command without specifying a cluster to
       go to the :ref:`Metrics <monitor-cluster-metrics>` tab for the current 
       cluster.

   * - ``cluster {clusterName} profiler``
     - Go to the :ref:`Query Profiler <query-profiler>` for the specified cluster
       within the current project.

       You can also use the ``profiler`` command without specifying a cluster to
       go to the :ref:`Query Profiler <query-profiler>` for the current cluster.

       The ``cluster {clusterName} profiler`` and ``profiler`` commands are unavailable for sharded {+clusters+}.

   * - ``cluster {clusterName} rtp``
     - Go to the :ref:`Real Time <real-time-metrics-status-tab>` tab
       for the specified cluster within the current project.

       You can also use the ``rtp`` command without specifying a cluster to
       go to the :ref:`Real Time <real-time-metrics-status-tab>` tab for the
       current cluster.

       The ``cluster {clusterName} rtp`` and ``rtp`` commands are
       unavailable for sharded {+clusters+} and 
       {+Serverless-instances+}.

   * - ``cluster {clusterName} search``
     - Go to the {+fts+} page for the specified cluster.

       You can also use the ``search`` command without specifying a cluster to
       go to the {+fts+} page for the
       current cluster.

       The ``cluster {clusterName} search`` and ``search`` commands are
       unavailable for {+Serverless-instances+}.

   * - ``collections``
     - Go to the :ref:`Collections <atlas-ui-view-collections>` tab for the 
       current cluster.

   * - ``connect``
     - Go to the :ref:`connection modal <atlas-connect-to-deployment>` for the
       current cluster.
 
   * - ``help``
     - Go to this {+atlas-go-to+} page in the documentation for help.

   * - ``metrics``
     - Go to the :ref:`Metrics <monitor-cluster-metrics>` tab for the 
       current cluster.

   * - ``org``
     - Go to the projects list for the current organization.
     
   * - ``org settings``
     - Go to the :ref:`Organization Settings
       <organization-settings>` for the current organization.

   * - ``org access``
     - Go to the :doc:`access manager </access/manage-org-users/>` for the
       current organization.

   * - ``org activity``
     - Go to the :doc:`activity feed </tutorial/activity-feed/>` for the current
       organization.

   * - ``org alerts``
     - Go to the :ref:`alerts <configure-alerts>` for the current organization.

   * - ``orgs``
     - Go to the list of your organizations. 

   * - ``orgs {orgName}``
     - Go to the projects list for the specified organization.

   * - ``orgs {orgName} access``
     - the :doc:`access manager </access/manage-org-users/>`
       for the specified organization.

   * - ``orgs {orgName} activity``
     - Go to the :doc:`activity feed </tutorial/activity-feed/>` for
       the specified organization.

   * - ``orgs {orgName} alerts``
     - Go to the :ref:`alerts <configure-alerts>` for the specified
       organization.

   * - ``orgs {orgName} settings``
     - Go to the :ref:`Organization Settings
       <organization-settings>` for the specified organization.

   * - ``orgs {orgName} support``
     - Go to the |mdb-support| page for the specified organization.

   * - ``{projectName}``
     - Go to the {+database-deployments+} list for the specified
       project within the current organization.

   * - ``preferences``
     - Go to the :guilabel:`User Preferences` page where you can
       :ref:`enable or disable {+atlas-go-to+} <enable-atlas-go-to>`.
  
   * - ``profiler``
     - Go to the :ref:`Query Profiler <query-profiler>` for the current
       cluster.

       The ``profiler`` command is unavailable for sharded {+clusters+}.

   * - ``project``
     - Go to the {+database-deployments+} list for the current project.

   * - ``project {projectName}``
     - Go to the {+database-deployments+} list for the specified
       project within the current organization. Using ``project``
       before the ``{projectName}`` allows you to autocomplete the project name
       using :guilabel:`Tab`.

   * - ``rtp``
     - Go to the :ref:`Real Time <real-time-metrics-status-tab>` tab
       for the current cluster.

   * - ``search``
     - Go to the {+fts+} page for the current cluster.

       The ``search`` command is unavailable for 
       {+Serverless-instances+}.

   * - ``settings``
     - Go to the :ref:`Project Settings <project-settings>` for
       the current project or the :ref:`Organization Settings
       <organization-settings>` for the current organization
       depending on your location.

   * - ``support``
     - Go to the |mdb-support| page for
       the current project or organization depending on your
       location.
