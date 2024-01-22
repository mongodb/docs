.. include:: /includes/live-migration-from-com-common-prereqs.rst

- Configure at least one |mongos| for monitoring in |onprem| or |mms|.
  To learn more, see :opsmgr:`Add Existing MongoDB Processes to Ops Manager </tutorial/add-existing-mongodb-processes/>`
  or :cloudmgr:`Add Existing MongoDB Processes to Cloud Manager </tutorial/add-existing-mongodb-processes/>`.

- If you migrate a sharded source {+cluster+} with a
  :manual:`sharded load balancer </core/sharding-balancer-administration#std-label-sharding-balancing>`,
  perform one of the following tasks based on how you manage or monitor
  your source {+cluster+}:

  - If you manage the source {+cluster+} in |onprem|,
    :opsmgr:`disable sharded collection management
    </tutorial/unmanage-deployment/>` in |onprem|.

  - If you manage the source {+cluster+} in |mms|, :cloudmgr:`disable
    sharded collection management
    </tutorial/unmanage-deployment/>`
    in |mms|.

  - If you use |mms| to only monitor (but not manage) the source
    {+cluster+}, run :method:`sh.stopBalancer() <sh.stopBalancer>` on
    each |mongos| in a sharded {+cluster+}.

  If you don't disable (or stop, in case of a {+cluster+} monitored in
  |mms|) the load balancer, the live migration process might fail.
