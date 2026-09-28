.. _data-model-tree-structure:

=====================
Model Tree Structures
=====================

.. meta::
   :description: Explore different methods to model tree structures in MongoDB, including parent-child references and nested sets.

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

MongoDB allows various ways to use tree data structures to model large
hierarchical or nested data relationships.

.. include:: /images/data-model-tree.rst

:doc:`/tutorial/model-tree-structures-with-parent-references`
   Presents a data model that organizes documents in a tree-like
   structure by storing :ref:`references <data-modeling-referencing>`
   to "parent" nodes in "child" nodes.

:doc:`/tutorial/model-tree-structures-with-child-references`
   Presents a data model that organizes documents in a tree-like
   structure by storing :ref:`references <data-modeling-referencing>`
   to "child" nodes in "parent" nodes.

:doc:`/tutorial/model-tree-structures-with-ancestors-array`
   Presents a data model that organizes documents in a tree-like
   structure by storing :ref:`references <data-modeling-referencing>`
   to "parent" nodes and an array that stores all ancestors.

:doc:`/tutorial/model-tree-structures-with-materialized-paths`
   Presents a data model that organizes documents in a tree-like
   structure by storing full relationship paths between documents. In
   addition to the tree node, each document stores the ``_id`` of the
   nodes ancestors or path as a string.

:doc:`/tutorial/model-tree-structures-with-nested-sets`
   Presents a data model that organizes documents in a tree-like
   structure using the *Nested Sets* pattern. This optimizes
   discovering subtrees at the expense of tree mutability.


.. toctree::
   :titlesonly: 
   :hidden: 

   Parent References </tutorial/model-tree-structures-with-parent-references>
   Child References </tutorial/model-tree-structures-with-child-references>
   Array of Ancestors </tutorial/model-tree-structures-with-ancestors-array>
   Materialized Paths </tutorial/model-tree-structures-with-materialized-paths>
   Nested Sets </tutorial/model-tree-structures-with-nested-sets>
