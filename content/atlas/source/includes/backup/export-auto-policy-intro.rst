To set up automatic exports for your {+Cloud-Backup+} snapshots, add
an export policy to your {+Cloud-Backup+} schedule. An export policy
specifies the export bucket and frequency type for snapshots to
export. {+service+} automatically exports any backup snapshot taken
for a :ref:`backup policy item <configure-backup-policy>` with the
same frequency type that you specify in the export policy, which can
be ``daily``, ``weekly``, ``monthly``, or ``yearly``.
