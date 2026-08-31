import os
import unittest

from dotenv import load_dotenv
from pymongo import MongoClient

import examples.ai_integrations.langchain.retrievers as retrievers
import examples.ai_integrations.langchain.vector_store as vector_store
from tests_package.ai_integrations.langchain.index_helpers import (
    ensure_fulltext_index,
    ensure_vector_index,
    has_voyage_key,
    wait_for_search_results,
)

load_dotenv()

SEED_TEXTS = [
    "MongoDB Atlas Vector Search enables semantic similarity queries.",
    "Retrieval-augmented generation improves LLM response accuracy.",
    "Aggregation pipelines transform documents in stages.",
]


@unittest.skipUnless(
    has_voyage_key(), "VOYAGE_API_KEY is not set; skipping Voyage AI tests."
)
class TestRetrievers(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        TestRetrievers.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestRetrievers.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestRetrievers.client = MongoClient(TestRetrievers.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

        from langchain_core.documents import Document

        # The retrievers query existing data, so seed the collection and build
        # both search indexes once for the whole suite.
        collection = TestRetrievers.client["langchain_db"]["vector_store"]
        collection.delete_many({})

        store = vector_store.create_vector_store_from_client(
            TestRetrievers.CONNECTION_STRING
        )
        store.add_documents([Document(page_content=text) for text in SEED_TEXTS])

        ensure_vector_index(collection)
        ensure_fulltext_index(collection)

        # Also build the vector index the parent document retriever needs.
        parent_collection = TestRetrievers.client["langchain_db"]["parent_documents"]
        parent_collection.insert_one({"placeholder": True})
        parent_collection.delete_many({"placeholder": True})
        ensure_vector_index(parent_collection)

    def test_vector_search_retriever_returns_documents(self):
        """Vector Search Retriever: should return documents for a query."""
        documents = wait_for_search_results(
            lambda: retrievers.query_with_vector_search_retriever(
                TestRetrievers.CONNECTION_STRING
            )
        )

        self.assertGreater(len(documents), 0)

    def test_vector_search_retriever_returns_document_objects(self):
        """Vector Search Retriever: should return LangChain Document objects."""
        from langchain_core.documents import Document

        documents = wait_for_search_results(
            lambda: retrievers.query_with_vector_search_retriever(
                TestRetrievers.CONNECTION_STRING
            )
        )

        self.assertIsInstance(documents[0], Document)

    def test_full_text_retriever_returns_matching_documents(self):
        """Full-Text Retriever: should return documents matching the query terms."""
        documents = wait_for_search_results(
            lambda: retrievers.query_with_full_text_retriever(
                TestRetrievers.CONNECTION_STRING
            )
        )

        self.assertGreater(len(documents), 0)

    def test_hybrid_search_retriever_returns_documents(self):
        """Hybrid Search Retriever: should combine vector and full-text results."""
        documents = wait_for_search_results(
            lambda: retrievers.query_with_hybrid_search_retriever(
                TestRetrievers.CONNECTION_STRING
            )
        )

        self.assertGreater(len(documents), 0)

    def test_hybrid_search_retriever_respects_top_k(self):
        """Hybrid Search Retriever: should return no more than top_k documents."""
        documents = wait_for_search_results(
            lambda: retrievers.query_with_hybrid_search_retriever(
                TestRetrievers.CONNECTION_STRING
            )
        )

        self.assertLessEqual(len(documents), 5)

    def test_parent_document_retriever_returns_parent_documents(self):
        """Parent Document Retriever: should return the larger parent document."""
        from langchain_core.documents import Document

        long_text = " ".join(SEED_TEXTS * 5)
        retriever = _build_parent_retriever(TestRetrievers.CONNECTION_STRING)
        retriever.add_documents([Document(page_content=long_text)])

        documents = wait_for_search_results(
            lambda: retrievers.query_with_parent_document_retriever(
                TestRetrievers.CONNECTION_STRING
            )
        )

        self.assertGreater(len(documents), 0)

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls.client.drop_database("langchain_db")
            cls.client.close()


def _build_parent_retriever(connection_string):
    """Build the same retriever the example builds, for seeding parent documents."""
    from langchain_mongodb.retrievers import MongoDBAtlasParentDocumentRetriever
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    from langchain_voyageai import VoyageAIEmbeddings

    return MongoDBAtlasParentDocumentRetriever.from_connection_string(
        connection_string=connection_string,
        embedding_model=VoyageAIEmbeddings(model="voyage-3-large"),
        child_splitter=RecursiveCharacterTextSplitter(chunk_size=200),
        database_name="langchain_db",
        collection_name="parent_documents",
        text_key="page_content",
    )
