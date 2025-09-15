Specifies the format used for audit logs. You can specify one of the
following values for |audit-schema-option|:

.. list-table::
   :header-rows: 1
   :widths: 10 20

   * - Value
     - Description

   * - ``mongo``
     - Logs are written in a format designed by MongoDB.

       For example log messages, see :ref:`event-audit-messages-mongo`.

   * - ``OCSF``
     - Logs are written in :abbr:`OCSF (Open Cybersecurity Schema
       Framework)` format. This option provides logs in a standardized
       format compatible with log processors.

       For example log messages, see :ref:`event-audit-messages-ocsf`.
