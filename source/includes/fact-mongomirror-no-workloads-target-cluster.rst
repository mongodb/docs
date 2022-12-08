Avoid running any workloads, including those that might be running on
namespaces that don't overlap with the live migration process, on the
target {+cluster+}. This action avoids potential locking conflicts and
performance degradation during the live migration process.

Don't run multiple migrations to the same target {+cluster+} at the same time.

Don't start the cutover process for your applications to the target
{+cluster+} while the live migration process is syncing.
