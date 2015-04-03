You must have an existing set of servers to which to deploy, and |mms| must
have access to the servers.

The servers can exist on your own system or on Amazon Web Services (AWS).
To give |mms| access to servers on your system, install the Automation Agent
to each server.

.. only:: cloud

   You can use |mms| to provision new servers on AWS. 
   See: :doc:`/tutorial/provision-aws-servers` for full instructions.

.. important::

   If you provision your own servers and if you use :term:`MongoDB
   Enterprise`, you must install the :ref:`prerequisite packages
   <mongodb-enterprise-dependencies>` on the servers before deploying
   MongoDB Enterprise on the servers.
