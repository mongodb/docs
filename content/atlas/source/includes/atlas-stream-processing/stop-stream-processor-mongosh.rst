To stop an existing stream processor with {+mongosh+}, use the 
:method:`sp.processor.stop()` method. It has the following syntax:

.. code-block:: sh

   sp.processor.stop(<options>)

Where ``<options>`` is a generic, optional document whose fields are
passed to the underlying stop command.

For example, to stop a stream processor named ``proc01``, run the 
following command:

.. io-code-block::
   :copyable: true

   .. input:: 
      :language: shell 

      sp.proc01.stop()

   .. output::
      :language: shell

      { "ok" : 1 }

This method returns ``{ "ok": 1 }`` if the stream processor exists
and is currently running. If you invoke ``sp.processor.stop()``
for a stream processor that is not ``running``, {+mongosh+}
returns an error.
