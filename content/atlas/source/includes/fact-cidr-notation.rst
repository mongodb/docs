.. _cidr-notation:

CIDR Notation
-------------

|cidr| notation writes a range of IP addresses as a base address
followed by a slash and a number, such as ``192.168.1.0/24``. The
number specifies how many bits of the address are fixed as the
network part, which determines how many addresses the range
covers:

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - Notation
     - Addresses Covered
     - Example Use

   * - ``/32``
     - 1 address
     - A single IP address, such as one client machine.

   * - ``/24``
     - 256 addresses
     - A small office or home network.

   * - ``/16``
     - 65,536 addresses
     - A large network block.
