.. _manual-data-modeling-intro:
.. _data-modeling-concepts:

========================
Data Modeling in MongoDB 
========================

.. meta::
   :description: Explore data modeling in MongoDB, focusing on flexible schema design, use cases, and advantages over relational database schemas.

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

.. dismissible-skills-card::
   :skill: Relational to Document Model
   :url: https://learn.mongodb.com/skills?openTab=data%20modeling

Data modeling refers to the organization of data within a database and
the links between related entities. 

MongoDB has a **flexible data model** that allows you to store polymorphic data, 
meaning:

- :term:`Documents <document>` within a single :term:`collection
  <collection>` are not required to have the same set of fields.
  
- A field's data type can differ between documents within a collection. 

A core principle of data modeling in MongoDB is that data that's 
accessed together should be stored together. To do this, you can embed related 
data within object and array fields. Embedding can provide your application with 
better read performance and ensure data consistency. However, you should 
structure your data model based on your application's data access patterns to 
optimize performance. 

To learn more, see :ref:`data-modeling-best-practices`.

Use Cases 
---------

Consider the following examples that take advantage of the document model's 
flexibility:

- Your company tracks which department each employee works in. You can
  embed department information in the ``employee`` collection to return relevant 
  information in a single query.

- Your e-commerce application shows the five most recent reviews on a product 
  page. You can store all reviews, including older ones, in a separate 
  collection because they are not accessed as frequently.

- Your clothing store needs to create a single-page application for a
  product catalog. Different products have different attributes and, as a 
  result, might have different document fields and field types. Despite these 
  differences, you can store all of the products in the same collection.

Get Started
-----------

To ensure that your data model has a logical structure and achieves
optimal performance, plan your schema prior to using your database at a
production scale. To determine your data model, use the following
:ref:`schema design process <data-modeling-schema-design>`:

#. :ref:`Identify your application's workload
   <data-modeling-identify-workload>`.

#. :ref:`Map relationships between objects in your collections
   <data-modeling-map-relationships>`.

#. :ref:`Apply design patterns <data-modeling-apply-patterns>`.

Details 
-------

Developing with a Flexible Data Model 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MongoDB's flexible schema lets you adapt your data model without requiring 
significant changes to the underlying database. This way, you can iteratively 
improve your data model as you develop your application. 

By developing with MongoDB's flexible schema, you can:

- Map your data model directly to objects that exist in code. 
- Add schema validation only to the sections and aspects of the documents that 
  need stricter control.

For an example of how you can iteratively modify your data model, see 
:ref:`data-modeling-schema-iteration-example`.

Document Relationships 
~~~~~~~~~~~~~~~~~~~~~~

The value of a document field can include any of the BSON :ref:`data types 
<bson-types>`, including other documents, arrays, and arrays of documents. These 
objects can be used to represent different types of relationships in 
your data model, including: 

- **One-to-one relationships**: Each document is associated with exactly one 
  other document. For example, a patient has exactly one medical record.

- **One-to-many relationships**: Each document is associated with multiple other
  documents. For example, a web application user can have many posts or 
  comments.

- **Many-to-many relationships**: Each document can be associated with multiple
  other documents, and vice versa. For example, a student can be enrolled in 
  multiple courses, and each course can have multiple students.

In MongoDB, you can model relationships by either :ref:`embedding
<data-modeling-embedding>` or :ref:`referencing <data-modeling-referencing>` 
your data. By choosing the best data-linking method, you can 
optimize your data model for your application's specific access patterns.

To learn more about modeling relationships in MongoDB, see:

- :ref:`data-modeling-relationships`.
- :ref:`data-modeling-decisions`.

Schema Design: Differences Between Relational and Document Databases
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you design a schema for a document database like MongoDB, consider the 
following important differences from relational databases:

.. list-table::
   :header-rows: 1
   :widths: 10 10

   * - Relational Database Behavior

     - Document Database Behavior

   * - You must determine a table's schema before you insert data. While you 
       can change your data model in a relational database, a fixed schema 
       requires more planning upfront, including consideration of how changes 
       affect dependent references.

     - You can easily change your data model over time as the needs of your 
       application evolve. 

   * - You often need to join data from several different tables to
       return the data needed by your application.
       
     - The flexible data model lets you store data according to your 
       application's data access patterns. For example, :ref:`embedding data 
       <data-modeling-embedding>` allows you to avoid complex joins across
       multiple collections, while improving performance and reducing your
       deployment's workload.

Learn More
----------

- :ref:`data-modeling-best-practices`
- :ref:`compass-data-modeling`

.. toctree::
   :titlesonly: 
   :hidden: 

   Best Practices </data-modeling/best-practices> 
   /data-modeling/schema-design-process
   /data-modeling/design-patterns
   /data-modeling/design-antipatterns
   Model Relationships </applications/data-models-relationships>
   Model Tree Structures </applications/data-models-tree-structures>
   Example Application Models </applications/data-models-applications>
