For example, to set the ``ldap`` |HM| facet to the 
run health checks every 30 seconds, issue the following at startup:

.. code-block:: bash

  mongos --setParameter 'healthMonitoringIntervals={ values:[ { type:"ldap", interval: "30000"} ] }'

Or if using the :dbcommand:`setParameter` command in a
:binary:`~bin.mongosh` session that is connected to a running
:binary:`~bin.mongos`:

.. code-block:: javascript

  db.adminCommand( 
    {
        setParameter: 1, 
        healthMonitoringIntervals: { values: [ { type: "ldap", interval: "30000" } ] } } )
    }
  )

Parameters set with :dbcommand:`setParameter` do not persist across
restarts. See the :ref:`setParameter page 
<setParameter-commands-not-persistent>` for details.

To make this setting persistent, set ``healthMonitoringIntervals``
in your :ref:`mongos config file <configuration-options>` using the
:setting:`setParameter` option as in the following example:

.. code-block:: yaml

  setParameter:
     healthMonitoringIntervals: "{ values: [{type: \"ldap\", interval: 200}] }"
