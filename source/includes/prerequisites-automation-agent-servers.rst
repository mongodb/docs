Server Networking Access
~~~~~~~~~~~~~~~~~~~~~~~~

The hosts that serve the MongoDB deployments must:

- Have full networking access to each other through their fully
  qualified domain names (FQDNs). Each server must be able to reach every other server through the FQDN.

  To find the FQDN for each server:

  - On Linux / macOS hosts, run the following command in the shell:

    .. class:: copyable-code
    .. code-block:: sh

       hostname -f

  - On Windows hosts, run the following command in Powershell:

    .. class:: copyable-code
    .. code-block:: powershell

       net config workstation | findstr /C:"Full Computer name"``

- Resolve each FQDN to a unique IP address.

  Run the following domain internet groper (``dig``) shell command to find the server's IP address.

  .. class:: copyable-code
  .. code-block:: sh

     dig +short myip.opendns.com @resolver1.opendns.com

  .. note::

     ``dig`` is available for Microsoft Windows. Download and install
     the BIND tools from http://www.isc.org/downloads/

- Set the `Subject Alternative Name <https://tools.ietf.org/html/rfc3280#page-33>`_
  value of any :abbr:`SSL (Secure Socket Layer)` certificates to the
  MongoDB host’s :abbr:`FQDN (fully qualified domain name)`. You may use
  a `wildcard certificate <http://searchsecurity.techtarget.com/definition/wildcard-certificate>`_
  for multiple MongoDB hosts.

The network configuration must:

- Allow each Automation Agent to connect to every MongoDB
  deployment listed on the :guilabel:`Deployment` page.

.. include:: /includes/fact-port-forwarding-unsupported.rst
