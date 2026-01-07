.. _atlassearchindexconfig: 

AtlasSearchIndexConfig
----------------------

AtlasSearchIndexConfig is the Schema for the AtlasSearchIndexConfig API

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiVersion``
     - string
     - atlas.mongodb.com/v1
     - true

   * -  ``kind``
     - string
     - ``AtlasSearchIndexConfig``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     -  
     - false

   * -  ``status``
     - object
     -  
     - false

.. _atlassearchindexconfig-spec: 

AtlasSearchIndexConfig.spec
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``analyzer``
     - enum
     - Specific pre-defined method chosen to convert database field text into searchable words. This conversion reduces the text of fields into the smallest units of text.
       These units are called a term or token. This process, known as tokenization, involves a variety of changes made to the text in fields:
       - extracting words
       - removing punctuation
       - removing accents
       - hanging to lowercase
       - removing common words
       - reducing words to their root form (stemming)
       - changing words to their base form (lemmatization) ``MongoDB`` Cloud uses the selected process to build the Atlas Search index
       *Enum*: lucene.standard, lucene.simple, lucene.whitespace, lucene.keyword, lucene.arabic, lucene.armenian, lucene.basque, lucene.bengali, lucene.brazilian, lucene.bulgarian, lucene.catalan, lucene.chinese, lucene.cjk, lucene.czech, lucene.danish, lucene.dutch, lucene.english, lucene.finnish, lucene.french, lucene.galician, lucene.german, lucene.greek, lucene.hindi, lucene.hungarian, lucene.indonesian, lucene.irish, lucene.italian, lucene.japanese, lucene.korean, lucene.kuromoji, lucene.latvian, lucene.lithuanian, lucene.morfologik, lucene.nori, lucene.norwegian, lucene.persian, lucene.portuguese, lucene.romanian, lucene.russian, lucene.smartcn, lucene.sorani, lucene.spanish, lucene.swedish, lucene.thai, lucene.turkish, lucene.ukrainian
     - false

   * -  ``analyzers``
     - []object
     - List of user-defined methods to convert database field text into searchable words.
     - false

   * -  ``searchAnalyzer``
     - enum
     - Method applied to identify words when searching this index.
       *Enum*: lucene.standard, lucene.simple, lucene.whitespace, lucene.keyword, lucene.arabic, lucene.armenian, lucene.basque, lucene.bengali, lucene.brazilian, lucene.bulgarian, lucene.catalan, lucene.chinese, lucene.cjk, lucene.czech, lucene.danish, lucene.dutch, lucene.english, lucene.finnish, lucene.french, lucene.galician, lucene.german, lucene.greek, lucene.hindi, lucene.hungarian, lucene.indonesian, lucene.irish, lucene.italian, lucene.japanese, lucene.korean, lucene.kuromoji, lucene.latvian, lucene.lithuanian, lucene.morfologik, lucene.nori, lucene.norwegian, lucene.persian, lucene.portuguese, lucene.romanian, lucene.russian, lucene.smartcn, lucene.sorani, lucene.spanish, lucene.swedish, lucene.thai, lucene.turkish, lucene.ukrainian
     - false

   * -  ``storedSource``
     - ``JSON``
     - Flag that indicates whether to store all fields (true) on Atlas Search. By default, Atlas doesn't store (false) the fields on Atlas Search.
       Alternatively, you can specify an object that only contains the list of fields to store (include) or not store (exclude) on Atlas Search.
       To learn more, see documentation: https://www.mongodb.com/docs/atlas/atlas-search/stored-source-definition/
     - false

.. _atlassearchindexconfig-spec-analyzers: 

AtlasSearchIndexConfig.spec.analyzers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Human-readable ``name`` that identifies the custom analyzer. Names must be unique within an index, and must not start with any of the following strings:
       "lucene.", "builtin.", "mongodb."
     - true

   * -  ``tokenizer``
     - object
     - Tokenizer that you want to use to create tokens. Tokens determine how Atlas Search splits up text into discrete chunks for indexing.
     - true

   * -  ``charFilters``
     - ``JSON``
     - Filters that examine text one character at a time and perform filtering operations.
     - false

   * -  ``tokenFilters``
     - ``JSON``
     - Filter that performs operations such as:
       - Stemming, which reduces related words, such as "talking", "talked", and "talks" to their root word "talk".
       - Redaction, the removal of sensitive information from public documents
     - false

.. _atlassearchindexconfig-spec-analyzers-tokenizer: 

AtlasSearchIndexConfig.spec.analyzers.tokenizer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Tokenizer that you want to use to create tokens. Tokens determine how Atlas Search splits up text into discrete chunks for indexing.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``type``
     - enum
     - Human-readable label that identifies this tokenizer type.
       *Enum*: whitespace, ``uaxUrlEmail``, standard, ``regexSplit``, ``regexCaptureGroup``, ``nGram``, keyword, ``edgeGram``
     - true

   * -  ``group``
     - integer
     - Index of the character ``group`` within the matching expression to extract into tokens. Use ``0`` to extract all character groups.
     - false

   * -  ``maxGram``
     - integer
     - Characters to include in the longest token that Atlas Search creates.
     - false

   * -  ``maxTokenLength``
     - integer
     - Maximum number of characters in a single token. Tokens greater than this length are split at this length into multiple tokens.
     - false

   * -  ``minGram``
     - integer
     - Characters to include in the shortest token that Atlas Search creates.
     - false

   * -  ``pattern``
     - string
     - Regular expression to match against.
     - false

.. _atlassearchindexconfig-status: 

AtlasSearchIndexConfig.status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``conditions``
     - []object
     - Conditions is the list of statuses showing the current state of the Atlas Custom Resource
     - true

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification that the Atlas Operator is aware of.
       The Atlas Operator updates this field to the 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

.. _atlassearchindexconfig-status-conditions: 

AtlasSearchIndexConfig.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Condition describes the state of an Atlas Custom Resource at a certain point.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``status``
     - string
     - Status of the condition, one of True, False, Unknown.
     - true

   * -  ``type``
     - string
     - Type of Atlas Custom Resource condition.
     - true

   * -  ``lastTransitionTime``
     - string
     - Last time the condition transitioned from one status to another.
       Represented in ``ISO`` 8601 format.
       *Format*: date-time
     - false

   * -  ``message``
     - string
     - A human readable ``message`` indicating details about the transition.
     - false

   * -  ``reason``
     - string
     - The ``reason`` for the condition's last transition.
     - false
