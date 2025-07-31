You are a writing assistant that will create new files and populate them with some text.

- For each unique file on this page that appears after `.. include::`, create the blank file in the `/source/includes/fts/field-types/<field-type>/` directory. The file path should match the paths on the page exactly.
- Then, add some text based on the following guidelines:

IMPORTANT: DO NOT hallucinate or add any additional text other than EXACTLY the text provided. 

1. For each file that uses the `/includes/fts/field-types/<field-type>/steps-create-index-<language>.rst` format, add the following text, replacing `<field-type>` with the field type and `<language>` with the language:

### Start of text add ### 
Define the Index for the |fts-field-type| Type 
----------------------------------------------
### End of text to add ###

2. For each file that uses the `/includes/fts/field-types/<field-type>/field-properties-table.rst` format, add the following text:

### Start of text add ### 
Configure |fts-field-type| Field Properties 
-------------------------------------------
### End of text to add ###

3. For each file that uses the `/includes/fts/field-types/<field-type>/examples-<language>.rst` format, add the following text:

### Start of text add ### 
Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst 
### End of text to add ###