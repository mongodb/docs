The following table describes the embedded fields of the following
objects:

- ``statusDetail.mainIndex.synonymMappingStatusDetails.<synonymMapping>``
- ``statusDetail.stagedIndex.synonymMappingStatusDetails<synonymMapping>``

.. list-table::
   :header-rows: 1
   :widths: 10 10 30

   * - Field
     - Type
     - Description

   * - ``status``
     - string
     - Status for the synonym mapping across on the corresponding
       ``mongot`` process.

   * - ``queryable``
     - boolean
     - Indicates whether the synonym mapping can support queries on the
       corresponding ``mongot`` process.

   * - ``message``
     - string
     - Describes an error for the synonym mapping, if applicable. Only
       appears if the ``status`` for this synonym mapping is ``FAILED``.
