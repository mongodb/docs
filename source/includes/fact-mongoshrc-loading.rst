On startup, :binary:`mongosh` checks your ``HOME`` directory for a
JavaScript file named .mongoshrc.js. If this file is found,
:binary:`mongosh` reads the content of .mongoshrc.js before
displaying the prompt for the first time.

If you use :binary:`mongosh` to evaluate a JavaScript file or
expression, either by using the :option:`--eval <mongosh --eval>` option
on the command line or by specifying a :ref:`.js file
<mdb-shell-execute-file>`, :binary:`mongosh` reads .mongoshrc.js
*after* the JavaScript has finished processing. You can prevent
.mongoshrc.js from being loaded by using the :option:`--norc
<mongosh --norc>` option.

.. note:: Legacy Shell Configuration 

   .. include:: /includes/legacy/legacy-shell-configuration.rst
