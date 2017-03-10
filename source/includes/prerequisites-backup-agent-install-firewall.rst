Firewall
++++++++

.. only:: cloud

   If your MongoDB instances operate within a firewall, :doc:`configure
   your network infrastructure </reference/firewall-configuration>` to
   allow outbound connections from the :term:`Backup Agent` on port
   ``443`` (:abbr:`HTTPS (Secure HyperText Transport Protocol)`) to
   ``api- backup.mongodb.com``.

.. only:: onprem

   If your MongoDB instances operate within a firewall, :doc:`configure
   your network infrastructure </reference/firewall-configuration>` to
   allow outbound connections from the :term:`Backup Agent` to |mms| on
   port ``8080`` if it is using :abbr:`HTTP (HyperText Transport
   Protocol)` or ``8443`` if :doc:`it is using HTTPS 
   </tutorial/configure-backup-agent-for-ssl>`.
