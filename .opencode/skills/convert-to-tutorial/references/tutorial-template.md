# Tutorial Template

Load this file when applying the tutorial structure (workflow step 3 of the convert-to-tutorial skill). Fill each `<placeholder>` with the appropriate reformatted content from the original document, preserving the indentation and directive syntax exactly as shown.

```rst
.. _<determine anchor by driver and subject matter>:

============================================
Tutorial: <title dependent on subject matter>
============================================

.. meta::
   :description: <150 to 200 characters, determined by subject matter>

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

Overview
--------

<Brief introduction to the tutorial or concept in this guide, 2 or 3 sentences>

<Subsection>
~~~~~~~~

<Optional, if understanding other concepts is essential to reader comprehension. Can include multiple.>

Tutorial
--------

This tutorial shows how to perform the following actions:

- Verify the prerequisites
- <Step 2 title>
- <Etc>

.. procedure::

   .. step:: Verify the prerequisites

      <Step instructions>

   .. step:: <Step 2 title>

      <Step instructions>

Additional Resources
--------------------

<Links to further reading, relevant API documentation, and any corresponding GitHub repositories>
```
