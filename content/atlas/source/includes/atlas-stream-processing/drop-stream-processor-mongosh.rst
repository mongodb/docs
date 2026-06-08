To delete an existing stream processor with {+mongosh+}, use the 
:method:`sp.processor.drop()` method. It has the following syntax:

.. code-block:: sh

   sp.processor.drop(<options>)

Where ``<options>`` is a generic, optional document whose fields are
passed to the underlying drop command.

For example, to drop a stream processor named ``proc01``, run the 
following command:

.. code-block:: sh

   sp.proc01.drop()

This method returns: 

- ``true`` if the stream processor exists.

- ``false`` if the stream processor doesn't exist.

When you drop a stream processor, all resources that {+atlas-sp+} 
provisioned for it are destroyed, along with all saved state.
