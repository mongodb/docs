Firewall
````````

.. cond:: cloud

   If your MongoDB instances operate within a firewall, :doc:`configure
   your network infrastructure </reference/firewall-configuration>` to
   allow outbound connections from {+mdbagent+}s on port ``443``
   (|https|) to ``api-backup.mongodb.com``.

.. cond:: onprem

   If your MongoDB instances operate within a firewall, :doc:`configure
   your network infrastructure </reference/firewall-configuration>` to
   allow outbound connections from {+mdbagent+}s to |mms| on
   port ``8080`` if it uses |http| or ``8443`` if it uses |https|.
