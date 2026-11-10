You can execute a ``.js`` file from within the :binary:`~bin.mongo` shell,
using the :method:`load()` function, as in the following:

.. code-block:: javascript

   load("myjstest.js")

This function loads and executes the :file:`myjstest.js` file.

The :method:`load()` method accepts relative and absolute paths.
If the current working directory of the :binary:`~bin.mongo` shell
is :file:`/data/db`, and the :file:`myjstest.js` resides in the
:file:`/data/db/scripts` directory, then the following calls within
the :binary:`~bin.mongo` shell would be equivalent:

.. code-block:: javascript

   load("scripts/myjstest.js")
   load("/data/db/scripts/myjstest.js")

.. note:: There is no search path for the :method:`load()`
   function. If the desired script is not in the current working
   directory or the full specified path, :binary:`~bin.mongo` will not be
   able to access the file.
