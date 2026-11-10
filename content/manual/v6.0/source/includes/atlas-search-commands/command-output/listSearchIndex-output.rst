|method-name| returns an array of documents. Each document in the array
contains the following fields:

.. list-table::
   :header-rows: 1
   :widths: 10 10 20

   * - Field
     - Type
     - Description

   * - ``id``
     - string
     - Unique identifier for the index.

   * - ``name``
     - string
     - Name of the index.

   * - ``status``
     - string
     - Status of the index. For more information, see |status-link|.

   * - ``queryable``
     - boolean
     - Indicates whether the index is ready to be queried.

   * - ``latestDefinitionVersion``
     - document
     - Describes the version of the index.

   * - ``latestDefinitionVersion.version``
     - integer
     - Version number associated with the index definition. When you
       update an index definition, the version number increments
       automatically.

   * - ``latestDefinitionVersion.createdAt``
     - date
     - Time when the current index definition was created.

   * - ``latestDefinition``
     - document
     - The most recent definition for the index. For more information,
       see :ref:`search-index-definition-create`.

   * - ``statusDetail``
     - array of documents
     - Contains the status of the index on each search host
       (``mongot``).

   * - ``statusDetail.[n].hostname``
     - string
     - Hostname of the corresponding ``mongot``.

   * - ``statusDetail.[n].status``
     - string
     - Status of the index on the corresponding ``mongot``.

   * - ``statusDetail.[n].queryable``
     - boolean
     - Indicates whether the index is ready to be queried on the
       corresponding ``mongot``.

   * - ``statusDetail.[n].mainIndex``
     - document
     - Contains status information about the active index on the
       corresponding ``mongot``.
       
       For details, see |index-details-link|.

   * - ``statusDetail.[n].stagedIndex``
     - document
     - Contains status information about an index being built in the
       background on the corresponding ``mongot``. This field only
       appears if you are building a new index to update an existing
       active index.

       For details, see |index-details-link|.

   * - ``synonymMappingStatus``
     - string
     - Status of the index's :ref:`synonym mappings <synonyms-ref>`.
       This field only appears if the index has synonyms defined. Can be
       one of the following values:

       - ``BUILDING``
       - ``FAILED``
       - ``READY``

       The returned status is a summary of the synonym mappings on each
       individual ``mongot``.

   * - ``synonymMappingStatusDetail``
     - array of documents
     - Contains the status of the index's synonym mappings on each
       search host (``mongot``). This field (and its subfields) only
       appear if the index has synonyms defined.

   * - ``synonymMappingStatusDetail.[n].status``
     - string
     - Status for the corresponding synonym mapping across all
       ``mongot`` processes.

   * - ``synonymMappingStatusDetail.[n].queryable``
     - boolean
     - Indicates whether the corresponding synonym mapping can support
       queries across all ``mongot`` processes.

   * - ``message``
     - string
     - Describes an error for the synonym mapping, if applicable. Only
       appears if the ``status`` for this synonym mapping is ``FAILED``.
