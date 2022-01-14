On startup, :binary:`mongosh` checks the user's ``HOME`` directory for
a JavaScript file named :ref:`.mongoshrc.js <mongoshrc-js>`. If this
file is found, :binary:`mongosh` reads the content of
:ref:`.mongoshrc.js <mongoshrc-js>` before displaying the prompt for
the first time.

If you use :binary:`mongosh` to evaluate a JavaScript file or
expression, either by using the :option:`--eval <mongosh --eval>`
option on the command line or by specifying a :ref:`.js file
<mdb-shell-execute-file>`, :binary:`mongosh` reads :ref:`.mongoshrc.js
<mongoshrc-js>` *after* the JavaScript has finished processing. You can
prevent :ref:`.mongoshrc.js <mongoshrc-js>` from being loaded by using
the :option:`--norc <mongosh --norc>` option.

.. note::

   The legacy :binary:`~bin.mongo` shell used a configuation file
   called ``.mongorc.js``. If :binary:`mongosh` detects this file on
   startup, and :ref:`.mongoshrc.js <mongoshrc-js>` is not present,
   :binary:`mongosh` will suggest renaming ``.mongorc.js`` to
   :ref:`.mongoshrc.js <mongoshrc-js>`. 

   The legacy ``.mongorc.js`` file is not loaded.

