Accessible Addresses and Ports
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|mms| requires access on the following IP address ranges and ports.

Required Outbound Access
------------------------

The agents connect to |mms| on port ``443``. Whether you provision
your servers on a cloud service provider or on your own network,
configure your network infrastructure to allow outbound connections
on port ``443``.

If you wish to restrict outbound access on port ``443`` to specific
IP addresses, you must keep open the following addresses and domains.

IP Addresses for GET and POST
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You must keep open the following addresses on port ``443`` so that
the agents can ``GET`` AND ``POST`` to the ``api-agents.mongodb.com``
and ``api-backup.mongodb.com`` servers:

- ``54.173.82.137``

- ``54.175.147.155``

- ``52.21.89.200``

Domain for Download of MongoDB Binaries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Automation Agents require outbound access on port ``443`` to the
following domains, depending on your MongoDB edition, for downloading
MongoDB binaries:

- For the MongoDB community edition, the Automation Agents require
  outbound access on port ``443`` to download binaries from the
  ``fastdl.mongodb.org`` domain, provided by Amazon CloudFront. The
  IP ranges for CloudFront change frequently. See `the current list
  of IP ranges for CloudFront <http://docs.aws.amazon.com/AmazonCloud
  Front/latest/DeveloperGuide/LocationsOfEdgeServers.html>`_.

- If you use Automation with `MongoDB Enterprise
  <http://www.mongodb.com/products/mongodb-enterprise>`_, the
  Automation Agents require outbound access on port ``443`` to the
  ``downloads.mongodb.com`` domain to download the Enterprise
  binaries.

- If you use automation with a custom build of MongoDB, the custom
  build must be available at a URL accessible to the Automation
  Agent. It could, for example, be served by a web server running
  inside an isolated network environment. The custom build's ``Git
  Version`` field must be set to the output of the following command,
  issued on the target binary.

  .. code-block:: javascript

     mongod --version

Required Inbound Access
-----------------------

Backup SCP Restores
~~~~~~~~~~~~~~~~~~~

If you use SCP as the 
:ref:`delivery method <delivery-methods-file-formats>` when restoring a
snapshot, you must grant SSH access to the following ranges at minimum:

- ``4.71.186.128/25``

- ``4.35.16.128/25``

.. important::

   MongoDB reserves the right to change these IP addresses at any
   time without user notice.

Required Ports on Your Network
------------------------------

All MongoDB processes in a deployment must be accessible to all |mms|
agents managing processes in that deployment. Therefore, all MongoDB
ports must be open to every server that hosts an Automation,
Monitoring or Backup Agent. 

.. example::
   If you are running MongoDB processes on ``27000``, ``27017`` and
   ``27020``, then those three ports must be open from all servers
   that are hosting an Agent.