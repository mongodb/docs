For example, to set the ``dns`` |HM| facet to the 
``critical`` intensity level, issue the following at startup:

.. code-block:: bash

  mongos --setParameter 'healthMonitoringIntensities={ values:[ { type:"dns", intensity: "critical"} ] }'

Or if using the :dbcommand:`setParameter` command in a
:binary:`~bin.mongosh` session that is connected to a running
:binary:`~bin.mongos`:

.. code-block:: javascript

  db.adminCommand( 
    {
        setParameter: 1, 
        healthMonitoringIntensities: { values: [ { type: "dns", intensity: "critical" } ] } } )
    }
  )

Parameters set with :dbcommand:`setParameter` do not persist across
restarts. See the :ref:`setParameter page 
<setParameter-commands-not-persistent>` for details.

To make this setting persistent, set ``healthMonitoringIntensities``
in your :ref:`mongos config file <configuration-options>` using the
:setting:`setParameter` option as in the following example:

.. code-block:: yaml

  setParameter:
     healthMonitoringIntensities: "{ values:[ { type:\"dns\", intensity: \"critical\"} ] }"
