The maximum number of days to retain rotated ``readiness.log`` files,
starting with the date in the file timestamp. If set to **0**, the
|k8s-op-short| doesn't remove ``readiness.log`` files on the basis of
age, instead relying on ``READINESS_PROBE_LOGGER_BACKUPS`` to determine
retention.

The default value is **0**.