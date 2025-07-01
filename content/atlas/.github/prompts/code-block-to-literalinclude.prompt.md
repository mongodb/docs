For any code that uses the `code-block` component, replace it with an equivalent `literalinclude` component.

Steps to take:

1. Identify the code-block, use the contents from the code to generate a relevant file name, then create a new literalinclude file in the most relevant directory. 

Important:
- If you cannot identify a relevant directory, save it in `/source/untested-examples/`.
- In the new literalinclude file, do a direct copy paste, and keep the same spacing/indentation. DO NOT change anything.

For example, given the following code-block:

.. code-block:: python
   :copyable:
   :linenos:

   <some code about atlas search autocomplete query> 

For this example, a relevant file name might be `autocomplete-query.py` and you would save it in `/source/includes/fts/autocomplete`.
This file contains the code in the original code-block (`<some code about atlas search autocomplete query>`). 

2. Replace the `code-block` with the `literalinclude`.

In the original file, replace the code block component with the literal include component
where the `code-block` was originally located.

For instance, for the previous example, the `code-block` should be replaced with:

.. literalinclude:: /includes/fts/autocomplete/autocomplete-query.py
   :language: python
   :copyable:
   :linenos:
