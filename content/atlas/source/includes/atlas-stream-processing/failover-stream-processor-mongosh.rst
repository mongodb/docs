To initiate failover for an individual stream processor with
{+mongosh+}, use the :method:`sp.processor.start()` method and pass
the ``failover`` option. Starting the failover processor also stops
the processor in the currently active region.

The ``failover`` option has the following syntax:

.. code-block:: sh

   sp.<streamprocessor>.start({
     failover: {
       region: "<region>",
       mode: "<mode>",
       dryRun: <boolean>
     }
   })

.. list-table::
   :widths: 25 10 15 50
   :header-rows: 1

   * - Field
     - Type
     - Necessity
     - Description

   * - ``failover``
     - object
     - Optional
     - Object defining the failover event you want to initiate.

   * - ``failover.region``
     - string
     - Required
     - Name of the cloud region in which the target failover
       processor lives. This region must be one of the failover
       regions configured for your {+spw+}.

   * - ``failover.mode``
     - string
     - Optional
     - Type of failover event you want to initiate. Value must be
       either ``GRACEFUL`` or ``FORCED``. To learn more, see
       :ref:`atlas-sp-architecture-failover`.

   * - ``failover.dryRun``
     - boolean
     - Optional
     - Flag that specifies whether to test the failover process
       without consuming data. Set this field to ``true`` to
       validate your failover configuration before you initiate a
       failover event in production.

``GRACEFUL`` mode takes a checkpoint and confirms that the active
processor has stopped before it initiates failover. ``FORCED`` mode
also attempts to stop the active processor, but initiates failover
even if the processor doesn't stop. A ``FORCED`` failover starts the
processor in the target region from the most recent checkpoint
unless you explicitly clear checkpoints.

For example, to initiate a graceful failover of a stream processor
named ``proc01`` to the ``us-west-2`` region, run the following
command:

.. code-block:: sh

   sp.proc01.start({
     failover: {
       region: "us-west-2",
       mode: "GRACEFUL",
       dryRun: false
     }
   })

To stop a stream processor, use the :method:`sp.processor.stop()`
method. You don't have to stop the active processor before you
initiate failover.
