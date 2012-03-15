.. _mongosniff:

.. default-domain:: mongodb

============================
:program:`mongosniff` Manual
============================

Synopsis
--------

:program:`mongosniff` provides a low-level operation tracing/sniffing view
into database activity in real time. Think of :program:`mongosniff` as a
MongoDB-specific analogue of ``tcpdump`` for TCP/IP network
traffic. Typically, :program:`mongosniff` is most frequently used in driver
development.

.. note::

   :program:`mongosniff` requires "libcap" and is only available for
   Unix-like systems.

   The Wireshark network sniffing tool is capable of inspecting and
   parsing the MongoDB wire protocol.

Options
-------

.. binary:: mongosniff

.. program:: mongosniff

.. option:: --help

   Returns a basic help and usage text.

.. option:: --forward <host>:<port>

   Declares a host to forward all parsed requests that the
   :program:`mongosniff` intercepts to another :program:`mongod`
   instance and issue those operations on that database instance.

   Specify the target host name and port in the "``<host>:<port>``"
   format.

.. option:: --source <NET [interface]>, <FILE [filename]>

   Specifies source material to inspect. Use "``--source NET
   [interface]``" to inspect traffic from a network interface
   (e.g. ``eth0`` or ``lo``.) Use "``--source FILE [filename]``" to
   read captured packets in :term:`pcap` format.

.. option::  --objcheck

   Modifies the behavior to *only* display invalid BSON objects and
   nothing else. Use this option for troubleshooting driver
   development.

.. option:: <port>

   Specifies alternate ports to sniff for traffic. By default,
   :program:`mongosniff` watches for MongoDB traffic on port 27017. Append
   multiple port numbers to the end of :program:`mongosniff` to monitor
   traffic on multiple ports.

Usage
-----

Use the following command to connect to a :program:`mongod` or
:program:`mongos` running on port 27017 *and* 27018 on the localhost
interface:

.. code-block:: sh

   mongosniff --source NET lo 27017 27018

Use the following command to only log invalid :term:`BSON` objects for
the :program:`mongod` or :program:`mongos` running on the localhost
interface and port 27018, for driver development and troubleshooting:

.. code-block:: sh

   mongosniff --objcheck --source NET lo 27018
