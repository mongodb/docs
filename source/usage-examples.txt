==============
Usage Examples
==============

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

.. toctree::

   /usage-examples/find-operations
   /usage-examples/insert-operations
   /usage-examples/update-operations
   /usage-examples/delete-operations
   /usage-examples/bulkWrite
   /usage-examples/watch
   /usage-examples/count
   /usage-examples/distinct
   /usage-examples/command


Overview
--------

Usage examples provide convenient starting points for popular MongoDB
operations. Each example provides the following information:

- An explanation of the operation in the example showing the
  purpose and a sample use case for the method

- An explanation of how to use the operation, including parameters,
  return values, and common exceptions you might encounter

- A full Java class that you can copy and paste to run the example
  in your own environment

How to Use the Usage Examples
-----------------------------

These examples use the :atlas:`sample datasets </sample-data?jmp=docs_driver_java>`
provided by Atlas. You can load them into your database on the free tier of
MongoDB Atlas by following the
:atlas:`Get Started with Atlas Guide </getting-started/#atlas-getting-started?jmp=docs_driver_java>`
or you can
:guides:`import the sample dataset into a local MongoDB instance
</server/import/>`.

Once you have imported the dataset, you can copy and paste a usage
example into your development environment of choice. You can follow the
:doc:`quick start guide </quick-start>` to learn more about getting
started with the MongoDB Java driver. Once you've copied a usage example,
you'll need to edit the connection URI to get the example connected to
your MongoDB instance:

.. code-block:: java

   // Replace the following with your MongoDB deployment's connection string.
   String uri = "<connection string uri>";

You can use the :guides:`Atlas Connectivity Guide </cloud/connectionstring/>`
to learn how to allow connections to your instance of Atlas and to find the
:manual:`connection string </reference/connection-string/>` you use to replace the
``uri`` variable in usage examples. If your instance uses
:manual:`SCRAM authentication </core/security-scram/>`, you can replace
``<user>`` with your username, ``<password>`` with your password, and
``<cluster-url>`` with the IP address or URL of your instance.

For more information about connecting to your MongoDB instance, see our
:doc:`Connection Guide </fundamentals/connection/>`.
