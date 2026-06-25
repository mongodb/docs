If you start ``mongosync`` with the ``--logPath`` option, you can send a
``USR1`` signal to the ``mongosync`` process to rotate its log file:

.. literalinclude:: /code-examples/includes/fact-log-rotation-usr1-signal/1.js
   :language: javascript

``$mongosync_pid`` is the ``mongosync`` process ID.
