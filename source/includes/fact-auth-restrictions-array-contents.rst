.. versionadded:: 3.6

The ``authenticationRestrictions`` document can contain the
following fields:

.. list-table::
   :header-rows: 1
   :widths: 20 30 50

   * - Field Name
     - Value
     - Description

   * - ``clientSource``
     - Array of IP addresses and/or
       :abbr:`CIDR (Classless Inter-Domain Routing)` ranges
     - If present, when authenticating a user, the server verifies
       that the client's IP address is either in the given list or
       belongs to a CIDR range in the list. If the client's IP address
       is not present, the server does not authenticate the user.

   * - ``serverAddress``
     - Array of IP addresses and/or
       :abbr:`CIDR (Classless Inter-Domain Routing)` ranges
     - A list of IP addresses or CIDR ranges to which the client can
       connect. If present, the server will verify that the client's
       connection was accepted via an IP address in the given list. If
       the connection was accepted via an unrecognized IP address, the
       server does not authenticate the user.

.. important::

   These are the only fields recognized by the server in the
   ``authenticationRestrictions`` document. When creating a user,
   if the server does not recognize a field contained within the
   ``authenticationRestrictions`` document, it throws an error.

For more information on authentication in MongoDB, see
:doc:`Authentication </core/authentication/>`.