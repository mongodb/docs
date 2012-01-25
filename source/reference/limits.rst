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

.. _limit-maximum-bson-document-size:

.. describe:: BSON Object Size

   The maximum BSON size is 16 MB.

.. _limit-maximum-index-size:

.. describe:: Index Size

   Index names, including their namespace/database, can be *no larger*
   than 128 characters.
