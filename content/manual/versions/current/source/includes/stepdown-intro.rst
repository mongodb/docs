Instructs the :term:`primary` of the replica set to become a
:term:`secondary`. After the primary steps down, eligible secondaries
hold an :ref:`election for primary <replica-set-election-internals>`.

The |command-method| does not immediately step down the primary. If no
:rsconf:`electable <members[n].priority>` secondaries
are up to date with the primary, the primary waits up to
``secondaryCatchUpPeriodSecs`` (by default 10 seconds) for a
secondary to catch up. Once an electable secondary is
available, the |command-method| steps down the primary.

Once stepped down, the original primary becomes a secondary and is
ineligible from becoming primary again for the remainder of time
specified by |stepdown-secs|.

For a detailed explanation of the |command-method| 's execution,
see |behavior-ref|.

.. note::

   The |command-method| is only valid against the primary and throws an
   error if run on a non-primary member.
