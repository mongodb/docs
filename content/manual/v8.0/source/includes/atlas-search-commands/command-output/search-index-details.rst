The following table describes the embedded fields of the following
documents:
- ``statusDetail.[mongot].mainIndex``
- ``statusDetail.[mongot].stagedIndex``

The fields describe the index status on a specific ``mongot``.

.. list-table::
   :header-rows: 1
   :widths: 10 10 30

   * - Field
     - Type
     - Description

   * - ``status``
     - string
     - The state of the index generation on the corresponding
       ``mongot``.

   * - ``queryable``
     - boolean
     - Indicates whether the index generation is ready to be queried on
       the corresponding ``mongot``.

   * - ``synonymMappingStatus``
     - string
     - The state of the index generation's synonym mappings on the
       corresponding ``mongot``. Only present if the index has synonyms
       defined.

   * - ``synonymMappingStatusDetails``
     - document
     - Contains the status of the index's synonym mappings on the
       corresponding ``mongot``. This field (and its subfields) only
       appear if the index has synonyms defined.

       For more information, see |synonym-detail-link|.
   
   * - ``definitionVersion``
     - document
     - Describes the index definition version that this index generation
       is being built with.

   * - ``definitionVersion.version``
     - integer
     - Version number that the index generation is using on the
       corresponding ``mongot``. When you update an index definition,
       the updated index builds with an incremented version number.

   * - ``definitionVersion.createdAt``
     - date
     - Time when the index definition was created.

   * - ``definition``
     - document
     - The definition that this index is being built with.
