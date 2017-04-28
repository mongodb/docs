:abbr:`RHEL (Red Hat Enterprise Linux)` and CentOS 6 limit the maximum
number of user processes to ``1024``. This overrides the general
user process limit (``ulimit -u``) setting.

If a ``/etc/security/limits.d/99-mongodb-nproc.conf`` user process
configuration file does not exist, create it. In this file, add
``soft`` and ``hard`` ``nproc`` (number of processes) entries with
values that are larger than the :abbr:`RHEL (Red Hat Enterprise Linux)`
``1024`` user process limit. Use the contents of the
``/etc/security/limits.d/90-nproc.conf`` file as a template.