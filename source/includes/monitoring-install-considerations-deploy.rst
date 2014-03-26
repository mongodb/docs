You must configure the networking rules of your deployment so that:

- the Monitoring Agent can connect to all :program:`mongod` and
  :program:`mongos` instances that you want to monitor.

.. only:: saas

   - the Monitoring agent can connect to ``mms.mongodb.com`` on port 443
     (i.e. ``https``.)

.. only:: hosted

   - the Monitoring agent can connect to |monitoring| server on port 443
     (i.e. ``https``.)

The |monitoring| server does not make *any* outbound connections to the agents
or to MongoDB instances. Any alerts set to check if your host is exposed to the
public internet will attempt to connect to your servers occasionally as part of
a vulnerability check. See :doc:`/management/activity` to disable or create
these alerts.

Ensure all :program:`mongod` and :program:`mongos` are not accessible to hosts
outside your deployment.
