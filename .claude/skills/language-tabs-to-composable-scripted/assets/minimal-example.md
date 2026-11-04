# Example: minimal conversion

Read this file only if you need a concrete illustration of the conversion shape (for example, when the analyzer output or Step 14 checklist is unclear). It is not part of the main procedure.

For a Case A page, this input tab block:

```rst
.. tabs-drivers::

   .. tab::
      :tabid: python

      Run the following code:

      .. code-block:: python

         print("hello")
```

converts to the following output. The composable header is inserted before the scope start, the tab becomes a `.. selected-content::` block, and the tab content gains 3-space indent (6 spaces total inside the composable):

```rst
.. composable-tutorial::
   :options: language-no-dependencies
   :defaults: python

   .. selected-content::
      :selections: python

      Run the following code:

      .. code-block:: python

         print("hello")
```
