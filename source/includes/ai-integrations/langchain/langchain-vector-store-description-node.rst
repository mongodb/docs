.. note:: 

   For this tutorial, you use a publicly accessible PDF document 
   titled `MongoDB Atlas Best Practices 
   <https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP>`_
   as the data source for your vector store. This document describes
   various recommendations and core concepts for 
   managing your |service| deployments. 

This code performs the following actions:

- Configures your |service| collection by specifying 
  the following parameters:

  - ``langchain_db.test`` as the |service| collection to store the documents.
  - ``vector_index`` as the index to use for querying the vector store.
  - ``text`` as the name of the field containing the raw text content. 
  - ``embedding`` as the name of the field containing the vector embeddings.

- Prepares your custom data by doing the following:

  - Retrieves raw data from the specified URL and saves it as PDF.
  - Uses a `text splitter <https://js.langchain.com/docs/modules/data_connection/document_transformers/>`__
    to split the data into smaller documents.
  - Specifies chunk parameters, which determines the number of characters in each document and 
    the number of characters that should overlap between two consecutive documents.

- Creates a vector store from the sample documents
  by calling the ``MongoDBAtlasVectorSearch.fromDocuments`` method.
  This method specifies the following parameters:

  - The sample documents to store in the vector database.
  - OpenAI's embedding model as the model used to convert text into 
    vector embeddings for the ``embedding`` field.
  - Your |service| configuration.
  