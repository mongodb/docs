If you start ``mongosync`` with the ``--logPath`` option, you can send a
``USR1`` signal to the ``mongosync`` process to rotate its log file:

.. code-block:: javascript 

   kill -s USR1 $mongosync_pid

``$mongosync_pid`` is the ``mongosync`` process ID.
