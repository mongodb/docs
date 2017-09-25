The argument must be a valid :ref:`expression
<aggregation-expressions>` that resolves to one of the following:

- A :ref:`Date <document-bson-type-date>` or
  :ref:`Timestamp <document-bson-type-timestamp>`.

- A document of the following form:

  .. versionchanged:: 3.6

  .. code-block:: javascript

     { date: <dateExpression>, timezone: <tzExpression> }

  .. list-table::
     :header-rows: 1
     :widths: 25 75

     * - Field

       - Description

     * - ``date``

       - The date to which the operator is applied.
         ``<dateExpression>`` must be a valid :ref:`expression
         <aggregation-expressions>` that resolves to either a
         :ref:`Date <document-bson-type-date>` or a
         :ref:`Timestamp <document-bson-type-timestamp>`.

     * - ``timezone``

       - .. include:: /includes/fact-timezone-description.rst

         .. versionadded:: 3.6

