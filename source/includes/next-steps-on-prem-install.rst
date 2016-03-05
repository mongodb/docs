Once you have installed the |onprem| web application to the |onprem| server, you
must next do the following:

1. Install |mms| agents on the servers that run your MongoDB deployments. You
   can install agents on servers running existing MongoDB deployments or on
   servers on which you will create new MongoDB deployments. Servers that run
   your MongoDB deployments must meet the requirements in the :manual:`MongoDB
   Production Notes </administration/production-notes>` in the MongoDB Manual.

   To install agents, see :doc:`/tutorial/nav/add-servers`.

   .. seealso:: :doc:`/tutorial/nav/install-automation-agent`,
                :doc:`/tutorial/nav/install-monitoring-agent`,
                :doc:`/tutorial/nav/install-backup-agent`

2. After you install agents, deploy MongoDB to your servers to test connections.
   If you use |mms| Automation, you can deploy MongoDB through the |onprem|
   interface. For example, see :doc:`/tutorial/deploy-replica-set`.
