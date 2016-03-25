Server Networking Access
~~~~~~~~~~~~~~~~~~~~~~~~

The servers that host the MongoDB deployments must:

* Have full networking access to each other through their fully
  qualified domain names (FQDNs). Each server must be able to reach every other server through the FQDN.

  To find the FQDN for each server:

  * On Linux / Mac OS X servers, run ``hostname -f`` in the shell.
  
  * On Windows servers, run ``net config workstation | findstr /C:"Full
    Computer name"`` in PowerShell.

* Resolve each FQDN to a unique IP address.
  
  Run the following domain internet groper (``dig``) shell command to find the server's IP address.

  .. code-block:: sh

     dig +short myip.opendns.com @resolver1.opendns.com
  
  .. note::

     ``dig`` is available for Microsoft Windows. Download and install
     the BIND tools from http://www.isc.org/downloads/

You must ensure that your network configuration (all interfaces and firewalls) allows each Automation Agent to connect to every MongoDB deployment listed on the :guilabel:`Deployment` page. 
