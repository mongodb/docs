.. _schema-validation-overview:
.. _schema-validation-document:

=================
Schema Validation
=================

.. default-domain:: mongodb

.. facet::
   :name: genre
   :values: reference

.. meta:: 
   :description: Use schema validation to ensure there are no unintended schema changes or improper data types.

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

.. dismissible-skills-card::
   :skill: Relational to Document Model
   :url: https://learn.mongodb.com/skills?openTab=data%20modeling

Schema validation lets you create validation rules for your fields, such
as allowed data types and value ranges.

MongoDB uses a flexible schema model, which means that documents in a
collection do not need to have the same fields or data types by default.
Once you've established an application schema, you can use schema
validation to ensure there are no unintended schema changes or improper
data types.

.. |page-topic| replace:: :atlas:`implement schema validation in the UI </performance-advisor/schema-suggestions/>`

.. cta-banner::
   :url: https://www.mongodb.com/docs/atlas/performance-advisor/schema-suggestions/

   .. include:: /includes/fact-atlas-compatible.rst

When to Use Schema Validation
-----------------------------

.. include:: /includes/data-modeling/schema-validation-use-case.rst

When MongoDB Checks Validation
------------------------------

After you add schema validation rules to a collection:

- All document inserts must match the rules.
- The schema validation level defines how the rules are applied to
  existing documents and document updates. To learn more, see
  :ref:`schema-specify-validation-level`.

To find documents in a collection that don't match the schema validation
rules, see :ref:`use-json-schema-query-conditions-find-documents`.

What Happens When a Document Fails Validation
---------------------------------------------

By default, when an insert or update operation would result in an
invalid document, MongoDB rejects the operation and does not write the
document to the collection.

Alternatively, you can configure MongoDB to allow invalid documents and
log warnings when schema violations occur.

To learn more, see :ref:`schema-validation-handle-invalid-docs`.

Get Started
-----------

For common tasks involving schema validation, see the following pages:

- :ref:`schema-validation-json`
- :ref:`schema-validation-polymorphic-collections`
- :ref:`schema-validation-query-expression`
- :ref:`schema-allowed-field-values`
- :ref:`schema-view-validation-rules`
- :ref:`schema-update-validation`
- :ref:`use-json-schema-query-conditions`
- :ref:`schema-bypass-document-validation`

Learn More
----------

To learn about MongoDB's flexible schema model, see
:ref:`manual-data-modeling-intro`.

.. toctree::
   :titlesonly:

   Specify JSON Validation </core/schema-validation/specify-json-schema>
   Specify Validation for Polymorphic Collections </core/schema-validation/specify-validation-polymorphic-collections>
   Specify Query Operators </core/schema-validation/specify-query-expression-rules>
   Specify Validation Level </core/schema-validation/specify-validation-level>
   Handle Invalid Documents </core/schema-validation/handle-invalid-documents>
   Bypass </core/schema-validation/bypass-document-validation>
   View Existing Rules </core/schema-validation/view-existing-validation-rules>
   Modify Rules </core/schema-validation/update-schema-validation>
   Query and Modify </core/schema-validation/use-json-schema-query-conditions>
