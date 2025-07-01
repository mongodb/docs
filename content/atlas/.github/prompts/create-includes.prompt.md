I will specify some highlighted text, you will copy that text into a separate `.rst` file and save it in relevant directory, and then you will replace the original text with the include component that specifies the path to the file.

Important:
- ONLY use the highlighted text. DO NOT change anything else on the page.

Steps to take:

1. If I didn't specify what the new include file should be named, generate a succinct file name.
   
   - Procedural content should start with "steps-". For example: "steps-create-an-index.rst".
  
2. The new file should be located somewhere in the `source/includes` directory. If there are sub-folders within this directory that are relevant, save it there. If not, just save it in the `source/includes` directory.

For example:
- Atlas Search related content should be saved in `source/includes/fts/` and its sub-folders.
- Vector Search content should be saved in `source/includes/avs/` and its sub-folders.

3. Replace the original higlighted text with the include component. Make sure the indentation lines up.

It uses the following syntax:

.. include:: /includes/<path-to-file>.rst
