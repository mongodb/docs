Server Networking Access
~~~~~~~~~~~~~~~~~~~~~~~~

The hosts that serve the MongoDB deployments must:

- Have full networking access to each other through their fully
  qualified domain names (FQDNs). Each host must be able to reach every
  other host through the |fqdn|. To find the |fqdn| for each host, run
  the following command in Powershell:

  .. code-block:: powershell

     net config workstation | findstr /C:"Full Computer name"

- Resolve each |fqdn| to a unique IP address.

  #. Download and install the
     `Windows BIND <http://www.isc.org/downloads/>`__ tools.

  #. Run the following command to resolve the |fqdn|:

     .. code-block:: powershell

        dig +short myip.opendns.com @resolver1.opendns.com

- Set the Common Name or :rfc:`Subject Alternative Name <3280>` value
  of any |ssl| certificates to the MongoDB host's |fqdn|.

The network configuration must allow each Automation Agent to
make a direct connection to every MongoDB deployment listed on the
:guilabel:`Deployment` page. |mms| does not support port forwarding.
