You can execute a ``.js`` file from within the :program:`mongo` shell,
using the :method:`load()` function. Consider the following example:

.. code-block:: javascript

   load("myjstest.js")

This method loads and executes the :filename:`myjstest.js` file.

The :method:`load()` method accepts relative and absolute paths.
If the current working directory of the :program:`mongo` shell
is :file:`/data/db`, and the :file:`myjstest.js` resides in the
:file:`/data/db/scripts` directory, then the following calls within
the :program:`mongo` shell would be equivalent:

.. code-block:: javascript

   load("scripts/myjstest.js")
   load("/data/db/scripts/myjstest.js")

.. note:: There is no search path for the :method:`load()` command. If
   the desired script is not in the specified directory, the shell will
   be unable to access the file.

