:abbr:`RHEL (Red Hat Enterprise Linux)` limits the maximum
number of user processes to ``1024``. This overrides the general
user process limit (``ulimit -u``) setting.

For the userid that runs |onprem| (``mongodb-mms`` by default), 
add ``soft`` and ``hard`` ``nproc`` (number of processes) entries to the ``/etc/security/limits.d/99-mongodb-nproc.conf`` user process
configuration file. Use values that are larger than the :abbr:`RHEL (Red Hat Enterprise Linux)` ``1024`` user process limit.

.. code-block:: apache

   mongodb-mms soft nproc 200000
   mongodb-mms hard nproc 500000

If ``/etc/security/limits.d/99-mongodb-nproc.conf`` does not exist, create it. Use the contents of the
``/etc/security/limits.d/90-nproc.conf`` file as a template.
