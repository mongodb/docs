Server Networking Access
~~~~~~~~~~~~~~~~~~~~~~~~

The hosts that serve the MongoDB deployments must:

- Have full networking access to each other through their fully
  qualified domain names (FQDNs). Each host must be able to reach
  every other host through the :abbr:`FQDN (fully qualified domain name)`.

  To find the :abbr:`FQDN (fully qualified domain name)` for each host:

  - On Linux / macOS hosts, run the following command in the Terminal:

    .. class:: copyable-code
    .. code-block:: sh

       hostname -f

  - On Windows hosts, run the following command in Powershell:

    .. class:: copyable-code
    .. code-block:: powershell

       net config workstation | findstr /C:"Full Computer name"

- Resolve each FQDN to a unique IP address.

  Run the following domain internet groper (``dig``) shell command to
  find the host's IP address.

  .. class:: copyable-code
  .. code-block:: sh

     dig +short myip.opendns.com @resolver1.opendns.com

  .. note::

     ``dig`` is available for Microsoft Windows. Download and install
     the BIND tools from http://www.isc.org/downloads/

- Set the Common Name or `Subject Alternative Name <https://tools.ietf.org/html/rfc3280#page-33>`_
  value of any :abbr:`SSL (Secure Socket Layer)` certificates to the
  MongoDB host’s :abbr:`FQDN (fully qualified domain name)`.

The network configuration must allow each :term:`Automation Agent` to
make a direct connection to every MongoDB deployment listed on the
:guilabel:`Deployment` page. |mms| does not support port forwarding.
