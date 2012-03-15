=============================
MongoDB Limits and Thresholds
=============================

.. default-domain:: mongodb

Synopsis
--------

This document provides a collection of hard and soft limitations of
the MongoDB system.

Limits
------

.. _limit-bson-document-size:

.. describe:: BSON Object Size

   The maximum BSON size is 16 megabytes.

.. _limit-index-size:

.. describe:: Index Size

   Index names, including their namespace/database, can be *no larger*
   than 128 characters.

.. _limit-number-of-indexes-per-collection:

.. describe:: Number of Indexes per Collection

   A single collection can have *no more* than 64 indexes.

.. _limit-namespace-length:

.. describe:: Namespace Length

   Each namespace, including database and collection name, must be
   shorter than 628 bytes.

.. _limit-index-name-length:

.. describe:: Index Name Length

   The names of indexes, including their namespace (i.e database and
   collection name) cannot be longer than 128 characters.

.. _limit-number-of-namespaces:

.. describe:: Number of Namespaces

   The limitation on the number of namespaces is a function of the
   size of the namespace file.

   By default namespace files are 16 megabytes; however, with the
   :setting:`nssize` setting, ns files can be no larger than 2
   gigabytes.

   A 16 megabyte namespace file can support 24,000 namespaces.

.. _limit-size-of-namespace-file:

.. describe:: Size of Namespace File

   Namespace files can be no larger than 2 gigabytes.

   By default namespace files are 16 megabytes. You can configure the
   size using the :setting:`nssize`.

.. _limit-sort:

.. describe:: Sorted Documents

   MongoDB will only return sorted results on fields without an index
   *if* the sort operation uses less than 32 megabytes of memory.
