.. list-table::
   :widths: 28 12 60
   :header-rows: 1

   * - Reason
     - Status
     - Meaning

   * - ``Validating``
     - ``True``
     - The dry-run annotation is set.

   * - ``Extending``
     - ``True``
     - The desired Kubernetes member count exceeds the last
       reconciled count.

   * - ``Pruning``
     - ``True``
     - The ``externalMembers`` count dropped below
       ``status.migrationObservedExternalMembersCount``.

   * - ``InProgress``
     - ``True``
     - External members exist but nothing is changing. This is
       also the reason on the first reconcile.

   * - ``MigrationComplete``
     - ``False``
     - All external members have been removed.

Precedence is ``Validating`` > ``Extending`` > ``Pruning`` >
``InProgress``. A prune that also grows the Kubernetes side reports
``Extending``, which is another reason to make one change at a
time.

Pruning and extending are not allowed at the same time.

To script against migration completion, use
``kubectl wait --for=condition=Migrating=False`` rather than
polling ``status.phase``.
