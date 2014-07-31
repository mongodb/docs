Connectivity
++++++++++++

You must configure the networking rules of your deployment so that:

- the Monitoring Agent can connect to all :program:`mongod` and
  :program:`mongos` instances that you want to monitor.

.. only:: saas

   - the Monitoring Agent can connect to ``mms.mongodb.com`` on port 443
     (i.e. ``https``.)

.. only:: hosted

   - the Monitoring Agent can connect to |monitoring| server on port 443
     (i.e. ``https``.)

The |monitoring| server does not make *any* outbound connections to the agents
or to MongoDB instances. If :ref:`Exposed DB Host Check is enabled,
<exposed-hosts-alert>` the |monitoring| server will attempt to connect to
your servers occasionally as part of a vulnerability check.

Ensure all :program:`mongod` and :program:`mongos` instances are not
accessible to hosts outside your deployment.
