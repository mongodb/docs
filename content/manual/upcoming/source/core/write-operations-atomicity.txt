.. _transactions-write-atomicity:

==========================
Atomicity and Transactions
==========================

.. meta::
   :description: Understand atomicity in MongoDB write operations and how to manage concurrent updates using transactions and unique indexes.

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

.. facet::
   :name: genre
   :values: reference

In MongoDB, a write operation is :term:`atomic <atomic operation>` on
the level of a single document, even if the operation modifies multiple
values. When multiple update commands happen in parallel, each
individual command ensures that the query condition still matches.

To guarantee that concurrent update commands do not conflict with each
other, you can specify the expected current value of a field in the
update filter.

Example
~~~~~~~

Consider a collection with this document:

.. code-block:: javascript

   db.games.insertOne( { _id: 1, score: 80 } )

These update operations occur concurrently:

.. code-block:: javascript
   
   // Update A
   db.games.updateOne(
      { score: 80 },
      {
         $set: { score: 90 }
      }
   )
   
   // Update B
   db.games.updateOne(
      { score: 80 },
      {
         $set: { score: 100 }
      }
   )

One update operation sets the document's ``score`` field to either
``90`` or ``100``. After this update completes, the second update
operation no longer matches the query predicate ``{ score: 80 }``, and
is not performed.

.. warning::

   In the case of concurrent update operations, specifying a filter on a
   field that is not being updated can lead to unexpected results. For
   example, consider if these update operations occur concurrently:

   .. code-block:: javascript
      :copyable: false

      // Update A
      db.games.updateOne(
         { _id: 1 },
         {
            $set: { score: 90 }
         }
      )
      
      // Update B
      db.games.updateOne(
         { _id: 1 },
         {
            $set: { score: 100 }
         }
      )

   After one update operation completes, the remaining operation still
   matches the query predicate ``{ _id: 1 }``. As a result, both update
   operations occur and the stored ``score`` value reflects the second
   update operation. This is problematic because the client that issued the
   first update does not receive any indication that the update was
   overwritten and the ``score`` value is different than expected.

To prevent conflicting write operations when your update filter is on a
different field than the one being updated, use the :update:`$inc`
operator.

For example, consider if these update operations occur concurrently:

.. code-block:: javascript

   // Update A
   db.games.updateOne(
      { _id: 1 },
      {
         $inc: { score: 10 }
      }
   )
   
   // Update B
   db.games.updateOne(
      { _id: 1 },
      {
         $inc: { score: 20 }
      }
   )

After one update operation completes, the remaining operation still
matches the query predicate ``{ _id: 1 }``. However, because the
operations modify the current value of ``score``, they don't overwrite
each other. Both updates are reflected and the resulting ``score`` is
``110``.

.. tip:: Store Unique Values

   To ensure that a field only has unique values, you can create a
   :ref:`unique index <index-type-unique>`. Unique indexes prevent inserts
   and updates from creating duplicate data. You can create a unique index
   on multiple fields to ensure the combination of field values is unique.
   For examples, see :ref:`index-unique-create`.

Multi-Document Transactions
---------------------------

.. include:: /includes/extracts/concurrent-operations-multi-document-writes.rst

.. include:: /includes/extracts/transactions-usage.rst

Learn More
----------

:doc:`/core/read-isolation-consistency-recency`
