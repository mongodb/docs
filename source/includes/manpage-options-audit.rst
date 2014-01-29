.. option:: --auditDestination

   .. include:: /includes/note-audit-in-enterprise-only.rst

   Enable auditing. The :option:`--auditDestination`
   option can have one of the following values:

   .. list-table::
      :header-rows: 1
      :widths: 15 50

      * - Value

        - Description

      * - ``syslog``

        - Output the audit events to syslog in JSON format. Not available on
          Windows. Audit messages have a syslog severity level of ``info``
          and a facility level of ``user``.

          .. include:: /includes/fact-audit-syslog-message-limit.rst

      * - ``console``

        - Output the audit events to ``stdout`` in JSON format.

      * - ``file``

        - Output the audit events to the file specified in
          :option:`--auditPath` in the format specified in
          :option:`-auditFormat`.

.. option:: --auditFormat

   .. include:: /includes/note-audit-in-enterprise-only.rst

   Specify the format of the output file if
   :option:`--auditDestination` is ``file``. The
   :option:`--auditFormat` can have one of the following values:

   .. list-table::
      :header-rows: 1
      :widths: 15 50

      * - Value

        - Description

      * - ``JSON``

        - Output the audit events in JSON format to the file specified in
          :option:`--auditPath`.

      * - ``BSON``

        - Output the audit events in BSON binary format to the file
          specified in :option:`--auditPath`.

.. option:: --auditPath

   .. include:: /includes/note-audit-in-enterprise-only.rst

   Specify the output file for auditing if :option:`--auditDestination`
   has value of ``file``. The :option:`--auditPath` option can take
   either a full path name or a relative path name.

.. option:: --auditFilter

   .. include:: /includes/note-audit-in-enterprise-only.rst

   Specify the filter to limit the :ref:`types of operations
   <audit-action-details-results>` the audit system records. The option
   takes a document of the form:

   .. code-block:: javascript

      { atype: <expression> }

   For authentication operations, the option can also take a document of
   the form:

   .. code-block:: javascript

     { atype: <expression>, "param.db": <database> }
