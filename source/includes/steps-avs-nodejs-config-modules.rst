.. step:: Update your ``package.json`` file.

   Configure your project to use `ES modules 
   <https://nodejs.org/api/esm.html#modules-ecmascript-modules>`__ 
   by adding ``"type": "module"`` to your ``package.json`` file
   and then saving it.

   .. code-block:: javascript
      :emphasize-lines: 2

      {
        "type": "module",
        // other fields...
      }
      