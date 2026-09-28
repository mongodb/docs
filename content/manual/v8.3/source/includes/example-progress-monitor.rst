To set the ``interval`` to 1000 milliseconds and the ``deadline`` 
to 300 seconds, issue the following at startup:

.. code-block:: bash

  mongos --setParameter 'progressMonitor={"interval": 1000, "deadline": 300}'

Or if using the :dbcommand:`setParameter` command in a
:binary:`~bin.mongosh` session that is connected to a running
:binary:`~bin.mongos`:

.. code-block:: javascript

  db.adminCommand( 
    {
        setParameter: 1, 
        progressMonitor: { interval: 1000, deadline: 300 } )
    }
  )

Parameters set with :dbcommand:`setParameter` do not persist across
restarts. See the :ref:`setParameter page 
<setParameter-commands-not-persistent>` for details.

To make this setting persistent, set ``progressMonitor``
in your :ref:`mongos config file <configuration-options>` using the
:setting:`setParameter` option as in the following example:

.. code-block:: yaml

  setParameter:
     progressMonitor: "{ interval: 1000, deadline: 300 }"
