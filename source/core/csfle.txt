.. _manual-csfle-feature:

==================================
{+csfle+}
==================================

.. meta::
   :description: Enable Client-Side Field Level Encryption to secure data before sending it to MongoDB, using automatic or explicit encryption methods.

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

Introduction
------------

{+csfle+} ({+csfle-abbrev+}) is a feature that enables you to encrypt data in your
application before you send it over the network to MongoDB. With {+csfle-abbrev+}
enabled, no MongoDB product has access to your data in an unencrypted form.

You can set up {+csfle-abbrev+} using the following mechanisms:

- Automatic Encryption: Enables you to perform encrypted read and
  write operations without having to add explicit calls to encrypt and decrypt 
  fields.
- {+manual-enc-title+}: Enables you to perform encrypted read and write
  operations through your MongoDB driver's encryption library. You must
  specify the logic for encryption with this library throughout your
  application.

Considerations
--------------

When implementing an application that uses {+csfle+}, consider the points listed in :ref:`Security Considerations <qe-csfle-security-considerations>`.

For limitations, see :ref:`{+csfle-abbrev+} limitations
<csfle-reference-encryption-limits>`.

Compatibility
~~~~~~~~~~~~~

To learn which MongoDB server products and drivers support {+csfle-abbrev+}, see :ref:`csfle-compatibility-reference`.

Features
--------

To learn about the security benefits of {+csfle-abbrev+} for your
applications, see the :ref:`<csfle-features>` page.

Installation
------------

To learn what you must install to use {+csfle-abbrev+}, see
the :ref:`<csfle-install>` page.

Quick Start
-----------

To start using {+csfle-abbrev+}, see the :ref:`<csfle-quick-start>`.

.. include:: /includes/fact-csfle-placeholder.rst

Fundamentals
------------

To learn how {+csfle-abbrev+} works and how to set it up, see the
:ref:`<csfle-fundamentals>` section.

The fundamentals section contains the following pages:

- :ref:`csfle-fundamentals-automatic-encryption`
- :ref:`csfle-fundamentals-manual-encryption`
- :ref:`csfle-fundamentals-create-schema`
- :ref:`csfle-fundamentals-manage-keys`
- :ref:`csfle-reference-encryption-algorithms`

Tutorials
---------

To learn how to perform specific tasks with {+csfle-abbrev+}, see the
:ref:`<csfle-tutorials>` section.

Reference
---------

To learn about encryption key management, read :ref:`qe-reference-keys-key-vaults`.

For more information about developing your {+csfle-abbrev+}-enabled applications,
see the :ref:`csfle-reference` section, which contains the following pages:

- :ref:`csfle-reference-encryption-schemas`
- :ref:`csfle-reference-server-side-schema`
- :ref:`csfle-reference-automatic-encryption-supported-operations`
- :ref:`csfle-reference-mongo-client`
- :ref:`csfle-reference-encryption-components`
- :ref:`csfle-reference-decryption`
- :ref:`csfle-reference-cryptographic-primitives`
- :ref:`csfle-reference-mongocryptd`
- :ref:`csfle-reference-libmongocrypt`

.. toctree::
   :titlesonly:

   Features </core/csfle/features>
   Installation </core/csfle/install>
   Quick Start </core/csfle/quick-start>
   Fundamentals </core/csfle/fundamentals>
   Tutorials </core/csfle/tutorials>
   Reference </core/csfle/reference>
