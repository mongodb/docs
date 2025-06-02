There are two packaging standards for Node.js modules.

.. list-table::
   :header-rows: 1

   * - Packaging Standard
     - Works with require()

   * - ``CommonJS`` (CJS)
     -  Yes

   * - ``ECMAScript Module`` (ES Module)
     -  No

You cannot ``require()`` an ES module in ``mongosh``. If you want to use
functionality from an ES module, check to see if there is a CommonJS
version that you can use instead. For more information, see:

- `Node.js module documentation
  <https://nodejs.org/api/esm.html#modules-ecmascript-modules>`__
- `Installing older versions of npm packages
  <https://docs.npmjs.com/cli/v9/commands/npm-install>`__

