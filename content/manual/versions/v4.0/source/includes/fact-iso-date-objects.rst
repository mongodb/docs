.. versionchanged:: 3.6

The argument must be a valid :ref:`expression
<aggregation-expressions>` that resolves to one of the following:

- A :ref:`Date <document-bson-type-date>`, a
  :ref:`Timestamp <document-bson-type-timestamp>`,
  or an :ref:`ObjectID <document-bson-type-object-id>`.

- A document of the following form:

  .. versionadded:: 3.6

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
         <aggregation-expressions>` that resolves to a
         :ref:`Date <document-bson-type-date>`, a
         :ref:`Timestamp <document-bson-type-timestamp>`,
         or an :ref:`ObjectID <document-bson-type-object-id>`.

     * - ``timezone``

       - .. include:: /includes/fact-timezone-description.rst
