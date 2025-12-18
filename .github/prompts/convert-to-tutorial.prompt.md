First, check all the code samples in this document to determine whether they will compile and run. If they will not, list the ones that will not in the changelog.

Then, reformat the tone of this document to be more straightforward, informational, and concise. It should also aim to adhere to the templated structure included in this prompt. Remove any purple prose or emojis and use words at a reading level of 8th grade or lower. 

Important:

DO keep all indentation exactly as you see below
DO ensure that the length of all underlines matches the heading lengths, including the title of the document
DO properly introduce code examples. For example, "You can perform <X action> by adding the following code to your program:" or "The following code shows how to <do Y>"
DO properly introduce lists with a full sentence that describes the list items. For example, "This code file defines the following methods:"
DO NOT modify any of the .rST directives that contain code present in this tutorial
DO NOT hallucinate or add new information
DO NOT remove any information from the document without making a changelog entry.
DO aim to limit each step to be less than 50 lines of code or text. If a step is longer than that, break it into multiple steps with clear titles.

Once complete, list every change (deletion and addition) and its new line number in a bulleted list. Ask the user whether they would like to save this complete changelog into an output file. The output file will be made in a folder called ai-changelogs in the top-level directory that docs-mongodb-internal is within. If the ai-changelogs folder does not exist, you will create it. 

When reformatting, use the following template as a guideline. Placeholders are indicated by surrounding "<" and ">" symbols, fill those in with the appropriate reformatted content from the original document.

### Start of template ###
.. _<determine anchor by driver and subject matter>:

============================================
Tutorial: <title dependent on subject matter> 
============================================

.. meta::
   :description: <determine by subject matter>

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
   : style: connected

   .. step:: Verify the prerequisites

      <Step instructions>

   .. step:: <Step 2 title>

      <Step instructions>

Additional Resources
--------------------
<Links to further reading, relevant API documentation, and any corresponding Github repositories>

### End of template ###
