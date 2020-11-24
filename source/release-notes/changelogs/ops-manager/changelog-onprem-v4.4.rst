.. _opsmgr-server-4.4.5:

|onprem| Server 4.4.5
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-11-05*

- Updates the |jdk| to ``jdk-jdk-11.0.9.11.1``.

- Supports viewing MongoDB Profiler entries with overlapping timestamps
  separately in the Visual Query Profiler.

- Updates the MongoDB Agent to :ref:`10.14.16.6437
  <mongodb-10.14.16.6437>`.

- Requires :db-tools:`MongoDB Database Tools 100.2.0 </>`.

.. _opsmgr-server-4.4.4:

|onprem| Server 4.4.4
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-10-07*

- Adds |jvm| Arguments in the |mms| diagnostic archive.

- Adds a new configuration parameter :setting:`Non Proxy Hosts`
  which allows the |mms| Application Server to bypass the
  outgoing proxy you configured when accessing specific hosts.

- Fixes a bug that prevents users from changing their password.

- Updates the MongoDB Agent to
  :ref:`10.14.15.6432 <mongodb-10.14.15.6432>`.

- Requires :db-tools:`MongoDB Database Tools 100.1.0 </>`.

.. _opsmgr-server-4.4.3:

|onprem| Server 4.4.3
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-09-23*

- Fixes a high severity vulnerability in Ops Manager. ``CVE-2020-7927``
  is allocated for this issue.

- Fixes an issue that can prevent alert processing for monitored
  clusters with partial status information.

- Removes ``muninEnabled`` and ``muninPort`` fields from the
  :ref:`Hosts <hosts-public-api>` |api|.

- Updates the MongoDB Agent to
  :ref:`10.14.14.6427 <mongodb-10.14.14.6427>`.

- Requires :db-tools:`MongoDB Database Tools 100.1.0 </>`.

.. _opsmgr-server-4.4.2:

|onprem| Server 4.4.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-09-03*

- Fixes unexpected errors that occur when:

  - Editing a blockstore with one or more dots (``.``) in its name.
  - Trying to update
    :ref:`Global API Keys <admin-console-general-api-keys>` via the
    |api| with an invalid request.
  - Trying to update a global whitelist IP.

- Includes :bic:`MongoDB Business Intelligence Connector v2.14.0 </>`.

- Supports file system snapshot stores with MongoDB databases running
  |fcv-link| 4.2 or later.

- Updates the MongoDB Agent to
  :ref:`10.14.13.6423 <mongodb-10.14.13.6423>`.

- Requires :db-tools:`MongoDB Database Tools 100.1.0 </>`.

.. _opsmgr-server-4.4.1:

|onprem| Server 4.4.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-08-05*

- Allows replica sets to be force reconfigured using console.

- Fixes an issue with Organization-level |api| key returning
  `HTTP error 500 <https://httpstatuses.com/500>`__ when no roles are
  defined.

- Improves |onprem| packaging.

- Updates MongoDB Agent to :ref:`10.14.12.6411 <mongodb-10.14.12.6411>`.

- Requires :db-tools:`MongoDB Database Tools 100.0.2 </>`.

.. _opsmgr-server-4.4.0:

|onprem| Server 4.4.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-07-08*

- Supports management, monitoring and backup of MongoDB 4.4
  deployments.

- Can be deployed to Kubernetes using the
  :k8s:`MongoDB Enterprise Kubernetes Operator </>`.

- Improves summary and detailed views of MongoDB deployments.

- Improves the operational performance of managing large sharded
  clusters.

  .. example::

     Applies requested configuration changes across the cluster faster.

- Improves rendering performance of the Metrics page.

- Supports direct monitoring of the |onprem| application database.

- Supports fetching MongoDB binaries from a custom |http| server.

- Sets the Profiler to use MongoDB slow query logs as the default data
  source.

  If you had not enabled the :doc:`Profiler </tutorial/profile-database>`:
    You now see the :doc:`Profiler </tutorial/profile-database>`. |mms|
    sources the data points from your
    :ref:`slow query logs <pa-slow-queries>`. These
    :ref:`data points <configuration-profiling-slowOpThresholdMs>` have
    been logged since |onprem| 4.2 through the
    :ref:`Performance Advisor <pa-slow-queries>`.

  If you had enabled the :doc:`Profiler </tutorial/profile-database>`:
    You continue to see the Profiler. |mms| sources the data points
    from your :ref:`slow query logs <pa-slow-queries>`  rather than
    through the
    :doc:`MongoDB Profiler entries </tutorial/profile-database>`.
    (These entries continue to be ingested.) The MongoDB profiler
    entries contain more detailed information than the slow query
    logs. To revert to using the profiler entries, toggle the
    Project's feature flag :guilabel:`Profiler Nds` to ``OFF``.

- Introduces Schema Advisor for automatic identification of schema
  optimization opportunities.

- Supports |aws| |iam| roles in |s3| Snapshot Store configurations.

- Upgrades OpenJDK to 11.0.8+10.

- Requires :db-tools:`MongoDB Database Tools 100.0.2 </>`.

.. admonition:: Ops Manager Support Ends after 4.4 Series
   :class: note

   .. include:: /includes/facts/opsmgr-windows-stops-4.4.rst
