To set up automatic exports for your {+Cloud-Backup+} snapshots, add
an export policy to your {+Cloud-Backup+} schedule. An export policy
specifies the export bucket and frequency type for snapshots to
export. The frequency type can be ``daily``, ``weekly``, ``monthly``,
or ``yearly``.

{+service+} doesn't export every snapshot automatically. {+service+}
exports only the snapshots that a :ref:`backup policy item
<configure-backup-policy>` creates with the same frequency type that
you specify in the export policy. 
