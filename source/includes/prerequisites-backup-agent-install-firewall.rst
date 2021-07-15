Firewall
++++++++

.. only:: cloud

   If your MongoDB instances operate within a firewall, :doc:`configure
   your network infrastructure </reference/firewall-configuration>` to
   allow outbound connections from the Backup Agent on port
   ``443`` (:abbr:`HTTPS (Hypertext Transfer Protocol Secure)`) to
   ``api- backup.mongodb.com``.

.. only:: onprem

   If your MongoDB instances operate within a firewall, :doc:`configure
   your network infrastructure </reference/firewall-configuration>` to
   allow outbound connections from the Backup Agent to |mms| on
   port ``8080`` if it is using :abbr:`HTTP (Hypertext Transfer Protocol)` 
   or ``8443`` if :doc:`it is using HTTPS 
   </tutorial/configure-backup-agent-for-ssl>`.
