import os
import unittest

from dotenv import load_dotenv
from pymongo import MongoClient

import examples.ai_integrations.langchain.retrievers as retrievers
from tests_package.ai_integrations.langchain.index_helpers import (
    ensure_vector_index,
    has_openai_key,
    has_voyage_key,
    wait_for_search_results,
)

load_dotenv()

# The self-querying retriever filters on these metadata fields, so the seed
# data needs a mix that the generated filter can discriminate between.
SEED_MOVIES = [
    {
        "description": "A lonely android questions what it means to be human.",
        "genre": "science fiction",
        "year": 1950,
        "rating": 9.1,
    },
    {
        "description": "A detective hunts a killer through rain-soaked streets.",
        "genre": "thriller",
        "year": 1955,
        "rating": 8.6,
    },
    {
        "description": "A slapstick comedy about a clumsy waiter.",
        "genre": "comedy",
        "year": 1958,
        "rating": 6.2,
    },
    {
        "description": "A space crew explores a distant planet.",
        "genre": "science fiction",
        "year": 1998,
        "rating": 9.4,
    },
]


@unittest.skipUnless(
    has_voyage_key() and has_openai_key(),
    "VOYAGE_API_KEY and OPENAI_API_KEY are both required; skipping.",
)
class TestSelfQuery(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        TestSelfQuery.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestSelfQuery.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestSelfQuery.client = MongoClient(TestSelfQuery.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

        from langchain_core.documents import Document
        from langchain_mongodb import MongoDBAtlasVectorSearch
        from langchain_voyageai import VoyageAIEmbeddings

        collection = TestSelfQuery.client["langchain_db"]["movies"]
        collection.delete_many({})

        store = MongoDBAtlasVectorSearch(
            collection=collection,
            embedding=VoyageAIEmbeddings(model="voyage-3-large"),
            index_name="vector_index",
        )
        store.add_documents(
            [
                Document(
                    page_content=movie["description"],
                    metadata={
                        "genre": movie["genre"],
                        "year": movie["year"],
                        "rating": movie["rating"],
                    },
                )
                for movie in SEED_MOVIES
            ]
        )

        # The generated filter references year and rating, so index them as
        # filter fields alongside the vector path.
        ensure_vector_index(collection, filters=["genre", "year", "rating"])

    def test_self_query_retriever_returns_documents(self):
        """Self-Querying Retriever: should return documents for a filtered query."""
        documents = wait_for_search_results(
            lambda: retrievers.query_with_self_query_retriever(
                TestSelfQuery.CONNECTION_STRING
            )
        )

        self.assertGreater(len(documents), 0)

    def test_self_query_retriever_applies_metadata_filters(self):
        """Self-Querying Retriever: should exclude documents outside the filter range."""
        documents = wait_for_search_results(
            lambda: retrievers.query_with_self_query_retriever(
                TestSelfQuery.CONNECTION_STRING
            )
        )

        for doc in documents:
            self.assertLess(doc.metadata["year"], 1960)
            self.assertGreater(doc.metadata["rating"], 8)

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls.client.drop_database("langchain_db")
            cls.client.close()
