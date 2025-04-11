.. facet::
   :name: genre
   :values: reference

.. meta::
   :keywords: queryable encryption, encryption
   :description: Explore how to encrypt sensitive data fields client-side, store them encrypted server-side, and run queries without server knowledge using Queryable Encryption.

.. _qe-manual-feature-qe:

====================
{+qe+}
====================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

Introduction
------------

{+qe+} gives you the ability to perform the following tasks: 

- Encrypt sensitive data fields from the client-side.
- Store sensitive data fields as fully randomized encrypted data on the database 
  server-side. 
- Run expressive queries on the encrypted data.

These tasks are all completed without the server having knowledge of the data 
it's processing.

Sensitive data is encrypted throughout its lifecycle - in-transit, at-rest, in-use, 
in logs, and backups - and only ever decrypted on the client-side, since only you 
have access to the encryption keys.

{+qe+} introduces an industry-first fast, searchable encryption 
scheme developed by the pioneers in encrypted search. The feature supports equality 
and range searches, with additional query types such as prefix, suffix, and substring 
planned for future releases.

.. _manual-qe-mechanisms:

You can set up {+qe+} using the following mechanisms:

- Automatic Encryption: Enables you to perform encrypted read and
  write operations without having to add explicit calls to encrypt and decrypt 
  fields.
- {+manual-enc-title+}: Enables you to perform encrypted read and write
  operations through your MongoDB driver's encryption library. You must
  specify the logic for encryption with this library throughout your
  application.

Considerations
--------------

When implementing an application that uses {+qe+}, consider the points listed
in :ref:`Security Considerations <qe-csfle-security-considerations>`.

For other limitations, see :ref:`{+qe+} limitations
<qe-reference-encryption-limits>`.

Compatibility
~~~~~~~~~~~~~

To learn which MongoDB server products and drivers support {+qe+}, see
:ref:`qe-compatibility-reference`.

MongoDB Support Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/queryable-encryption/qe-supportability.rst

For details, see :ref:`qe-redaction`.

Features
--------

To learn about the security benefits of {+qe+} for your
applications, see the :ref:`<qe-features>` page.

Installation
------------

To learn what you must install to use {+qe+}, see
the :ref:`<qe-install>` and :ref:`<qe-csfle-install-library>` pages.

Quick Start
-----------

To start using {+qe+}, see the :ref:`<qe-quick-start>`.

Fundamentals
------------

To learn about encryption key management, see :ref:`qe-reference-keys-key-vaults`.

To learn how {+qe+} works, see the :ref:`<qe-fundamentals>` section,
which contains the following pages:

- :ref:`qe-fundamentals-encrypt-query`
- :ref:`qe-create-encryption-schema`
- :ref:`qe-fundamentals-collection-management`
- :ref:`qe-fundamentals-manual-encryption`
- :ref:`qe-fundamentals-manage-keys`

Tutorials
---------

To learn how to perform specific tasks with {+qe+}, see the
:ref:`<qe-tutorials>` section.

Reference
---------

To view information to help you develop your {+qe+} enabled applications,
see the :ref:`qe-reference` section.

The reference section contains the following pages:

- :ref:`qe-reference-automatic-encryption-supported-operations`
- :ref:`qe-reference-mongo-client`

.. toctree::
   :titlesonly:

   Features </core/queryable-encryption/features>
   Quick Start </core/queryable-encryption/quick-start>
   Fundamentals </core/queryable-encryption/fundamentals>
   Tutorials </core/queryable-encryption/tutorials>
   Reference </core/queryable-encryption/reference>