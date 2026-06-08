To start a stream processor with {+mongosh+}, use the 
:method:`sp.processor.start()` method. It has the following syntax:

.. code-block:: sh

   sp.processor.start(<options>)

Where ``<options>`` is a generic, optional document whose fields are
passed to the underlying start command. To learn more about the
command options, see :method:`sp.createStreamProcessor()`.
For example, to start a stream processor named ``proc01``, run the 
following command:

.. io-code-block::
   :copyable: true

   .. input:: 
      :language: shell 

      sp.proc01.start()

   .. output::
      :language: shell

      { "ok" : 1 }

This method returns ``{ "ok": 1 }`` if the stream processor exists
and isn't currently running. If you invoke
``sp.processor.start()`` for a stream processor that is not
``STOPPED``, {+mongosh+} returns an error.
