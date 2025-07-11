The following code performs these actions:

- Configures |service| as a vector store by specifying the following:

  - ``langchaingo_db.test`` as the collection in |service| to store the
    documents.
  - ``vector_index`` as the :ref:`index <avs-indexes>` to use for querying the
    vector store.
  - ``text`` as the name of the field containing the raw text content.
  - ``embedding`` as the name of the field containing the :ref:`vector
    embeddings <avs-key-concepts>`.

- Prepares your custom data by doing the following:

  - Defines text for each document.
  - Uses LangChainGo's ``mongovector`` package to generate embeddings for the
    texts. This package stores document embeddings in MongoDB and enables
    searches on stored embeddings.
  - Constructs documents that include text, embeddings, and metadata.

- Ingests the constructed documents into |service| and instantiates the vector
  store.