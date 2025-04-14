The ``authenticationRestrictions`` document can contain *only* the
following fields. The server throws an error if the 
``authenticationRestrictions`` document contains an unrecognized field:

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

   If a user inherits multiple roles with incompatible authentication
   restrictions, that user becomes unusable.

   For example, if a user inherits one role in which the
   ``clientSource`` field is ``["198.51.100.0"]`` and another role in
   which the ``clientSource`` field is ``["203.0.113.0"]`` the server is
   unable to authenticate the user.

For more information on authentication in MongoDB, see
:ref:`authentication`.