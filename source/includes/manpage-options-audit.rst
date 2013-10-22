.. option:: --auditLog

   .. include:: /includes/note-audit-in-enterprise-only.rst

   Enable auditing. The :option:`--auditLog`
   option can have one of the following values:

   .. list-table::
      :header-rows: 1
      :widths: 15 50

      * - Value

        - Description

      * - ``syslog``

        - Output the audit log to syslog in text format. Not available on
          Windows. Audit messages have a syslog severity level of ``info``
          and a facility level of ``user``.

      * - ``console``

        - Output the audit log to ``stdout`` in text format.

      * - ``textfile``

        - Output the audit log, in text format, to the file specified in
          :option:`--auditPath`.

      * - ``bsonfile``

        - Output the audit log, in BSON binary format, to the file
          specified in :option:`--auditPath`.

.. option:: --auditPath

   .. include:: /includes/note-audit-in-enterprise-only.rst

   Specify the output file for auditing if :option:`--auditLog` has
   value of either ``textfile`` or ``bsonfile``. The
   :option:`--auditPath` option can take either a full path name or a
   relative path name.

.. option:: --auditFilter

   .. include:: /includes/note-audit-in-enterprise-only.rst

   Specify the filter to limit the :ref:`types of operations
   <audit-operations>` the audit system logs. The option takes a
   document of the form:

   .. code-block:: javascript

      { atype: <expression> }

   For authentication operations, the option can also take a document of
   the form:

   .. code-block:: javascript

     { atype: <expression>, "param.db": <database> }
