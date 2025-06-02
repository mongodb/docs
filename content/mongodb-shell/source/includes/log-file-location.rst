Starting in |mdb-shell| 2.4.0, you can use the ``log.getPath()``
command to view the current log file location. For example:

.. code-block:: javascript

   log.getPath()

Example output:

.. code-block:: javascript
   :copyable: false

   /Users/jane.doe/.mongodb/mongosh/c2961dbd6b73b052671d9df0_log

The hexadecimal value in the path is the |mdb-shell| log identifier for
the current session.
