.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 15 15 15 55

   * - Name
     - Type
     - Necessity
     - Description

   * - ``analyzer``
     - string
     - Optional
     - :ref:`Analyzer <analyzers-ref>` to use when creating the
       index. Defaults to :ref:`lucene.standard <ref-standard-analyzer>`.

   * - ``analyzers``
     - array of |bson| objects
     - Optional
     - :ref:`Custom analyzers <custom-analyzers>` to use in this index. 

   * - ``collectionName``
     - string
     - Required
     - Name of the collection the index is on.

   * - ``database``
     - string
     - Required
     - Name of the database the collection is in.

   * - ``mappings``
     - object
     - Required
     - Object containing index specifications for the collection
       fields.

   * - | ``mappings``
       | ``.dynamic``
     - boolean
     - Conditional
     - Required if ``mappings.fields`` is omitted.
     
       Indicates whether the index uses dynamic or static mappings. For 
       dynamic mapping, set the value to ``true``. For static mapping, 
       specify the fields to index using ``mappings.fields``. 

   * - | ``mappings``
       | ``.fields``
     - object
     - Conditional
     - Required if ``mappings.dynamic`` is ``false`` or is omitted.
     
       Object containing one or more field specifications.

   * - ``name``
     - string
     - Required
     - Name of the index.

   * - ``searchAnalyzer``
     - string
     - Optional
     - :ref:`Analyzer <analyzers-ref>` to use when searching the
       index. Defaults to :ref:`lucene.standard 
       <ref-standard-analyzer>`.

   * - ``synonyms`` 
     - array of documents
     - Optional
     - Synonyms mapping definition to use in this index.

   * - | ``synonyms[i]``
       | ``.analyzer`` 
     - string
     - Required 
     - Name of the :ref:`analyzer <analyzers-ref>` to use with this 
       synonym mapping. If you set ``mappings.dynamic`` to ``true``, 
       you must use the default analyzer, :ref:`lucene.standard 
       <ref-standard-analyzer>`, here also. |fts| doesn't support these 
       :ref:`custom analyzer <custom-analyzers>` tokenizers and token 
       filters in the index definition for :ref:`synonyms 
       <synonyms-ref>`: 

       - :ref:`nGram <ngram-tokenizer-ref>` tokenizer
       - :ref:`edgeGram <edgegram-tokenizer-ref>` tokenizer 
       - :ref:`daitchMokotoffSoundex <daitchmokotoffsoundex-tf-ref>` 
         token filter
       - :ref:`nGram <ngram-tf-ref>` token filter 
       - :ref:`edgeGram <edgegram-tf-ref>` token filter 
       - :ref:`shingle <shingle-tf-ref>` token filter

   * - | ``synonyms[i]``
       | ``.name`` 
     - string
     - Required 
     - Name of the :ref:`synonym mapping definition <synonyms-ref>`. 
       Name must be unique in this index definition and it can't be an 
       empty string.

   * - | ``synonyms[i]``
       | ``.source`` 
     - document
     - Required 
     - Collection details for this :ref:`synonym mapping definition 
       <synonyms-ref>`.

   * - | ``synonyms[i]``
       | ``.source``
       | ``.collection`` 
     - string 
     - Required 
     - Name of the source MongoDB collection for the synonyms. 
       Documents in this collection must be in the format described in 
       the :ref:`synonyms-coll-spec`. 

