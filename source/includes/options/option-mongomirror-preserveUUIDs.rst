.. option:: --preserveUUIDs

    Allows |service| to preserve UUID during live migration.
    This option works **only** with the live migration process that
    |service| runs. If you use the ``--preserveUUIDs`` option on the
    command line, it will fail due to permission errors. These errors
    are expected because this option isn't intended to be used on the
    command line in a self-managed migration process that runs ``mongomirror``.
