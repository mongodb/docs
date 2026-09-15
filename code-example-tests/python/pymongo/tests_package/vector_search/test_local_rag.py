"""
Tests for the local RAG examples (local embedding model + local LLM).

These tests run against real services — nothing is mocked:

- Embeddings come from the real ``mixedbread-ai/mxbai-embed-large-v1``
  sentence-transformers model, downloaded from the Hugging Face model hub on
  first run and cached locally afterward.
- Retrieval runs a real ``$vectorSearch`` query against the
  ``sample_airbnb.listingsAndReviews`` collection on the deployment in
  CONNECTION_STRING. The deployment must have Search and Vector Search
  installed (a local Atlas deployment or an Atlas cluster).
- Generation runs the real Mistral 7B model locally through GPT4All. The
  model file is ~4 GB and downloads to the GPT4All cache on first run.

Sample data hygiene: these tests add an ``embeddings`` field to documents in
``sample_airbnb.listingsAndReviews`` and create a ``vector_index`` search
index on that collection. Both are reverted in teardown. The sample database
itself is never dropped.

Because the two models together are several gigabytes and download on first
run, these tests are opt-in. Set ``RUN_LOCAL_MODEL_TESTS=true`` to run them.
CI leaves the variable unset, so the suite skips there.
"""

import os
import unittest

from dotenv import load_dotenv
from pymongo import MongoClient

from utils.comparison import Expect
from utils.sample_data import requires_sample_data

import examples.vector_search.local_rag.local_rag_embeddings as local_rag_embeddings
import examples.vector_search.local_rag.local_rag_pipeline as local_rag_pipeline

# Loaded at import time so the skip decorator below can read the opt-in flag
# from .env as well as from the shell.
load_dotenv()

DATABASE_NAME = "sample_airbnb"
COLLECTION_NAME = "listingsAndReviews"
INDEX_NAME = "vector_index"
QUESTION = (
    "Can you recommend a few AirBnBs that are beach houses? "
    "Include a link to the listing."
)


def run_local_model_tests():
    """Return True when the opt-in flag for local model tests is set."""
    return os.getenv("RUN_LOCAL_MODEL_TESTS", "").lower() in ("1", "true", "yes")


@unittest.skipUnless(
    run_local_model_tests(),
    "RUN_LOCAL_MODEL_TESTS is not set; skipping local embedding model and LLM "
    "tests. These download several gigabytes of models on first run.",
)
class TestLocalRag(unittest.TestCase):
    CONNECTION_STRING = None
    client = None
    created_index = False

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestLocalRag.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestLocalRag.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestLocalRag.client = MongoClient(TestLocalRag.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

    def setUp(self):
        # Revert any embeddings left over from a prior test so each test starts
        # from the collection's original state.
        self._remove_embeddings()

    def tearDown(self):
        self._remove_embeddings()

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            cls._remove_embeddings_for(cls.client)
            if cls.created_index:
                try:
                    cls._collection_for(cls.client).drop_search_index(INDEX_NAME)
                except Exception:
                    pass
            cls.client.close()

    # --- helpers ---

    @staticmethod
    def _collection_for(client):
        return client[DATABASE_NAME][COLLECTION_NAME]

    @classmethod
    def _remove_embeddings_for(cls, client):
        cls._collection_for(client).update_many(
            {"embeddings": {"$exists": True}}, {"$unset": {"embeddings": ""}}
        )

    def _remove_embeddings(self):
        TestLocalRag._remove_embeddings_for(TestLocalRag.client)

    def _ensure_index(self):
        """Creates the vector index once, using the example under test."""
        collection = TestLocalRag._collection_for(TestLocalRag.client)
        existing = [index["name"] for index in collection.list_search_indexes()]
        if INDEX_NAME not in existing:
            local_rag_pipeline.create_vector_index(TestLocalRag.CONNECTION_STRING)
            TestLocalRag.created_index = True

    def _wait_for_queryable_index(self, timeout_seconds=300):
        import time

        collection = TestLocalRag._collection_for(TestLocalRag.client)
        deadline = time.time() + timeout_seconds
        while time.time() < deadline:
            indexes = list(collection.list_search_indexes(INDEX_NAME))
            if indexes and indexes[0].get("queryable") is True:
                return
            time.sleep(5)
        raise AssertionError(
            f"Search index {INDEX_NAME} did not become queryable within "
            f"{timeout_seconds} seconds."
        )

    # --- tests ---

    @requires_sample_data(DATABASE_NAME, collections=[COLLECTION_NAME])
    def test_create_embeddings_updates_fifty_documents(self):
        """Create embeddings: should report fifty updated documents."""
        result = local_rag_embeddings.create_embeddings(
            TestLocalRag.CONNECTION_STRING
        )

        Expect.that(result).should_match(
            "examples/vector_search/local_rag/local-rag-create-embeddings-output.txt"
        )

    @requires_sample_data(DATABASE_NAME, collections=[COLLECTION_NAME])
    def test_create_embeddings_stores_1024_dimension_vectors(self):
        """Create embeddings: each updated document should store a 1024-dimension vector."""
        local_rag_embeddings.create_embeddings(TestLocalRag.CONNECTION_STRING)

        document = TestLocalRag._collection_for(TestLocalRag.client).find_one(
            {"embeddings": {"$exists": True}}, {"embeddings": 1, "_id": 0}
        )

        Expect.that({"dimensions": len(document["embeddings"])}).should_match(
            {"dimensions": 1024}
        )

    @requires_sample_data(DATABASE_NAME, collections=[COLLECTION_NAME])
    def test_create_vector_index_creates_queryable_index(self):
        """Create vector index: should create a queryable vectorSearch index."""
        self._ensure_index()
        self._wait_for_queryable_index()

        indexes = list(
            TestLocalRag._collection_for(TestLocalRag.client).list_search_indexes(
                INDEX_NAME
            )
        )

        Expect.that(
            {"name": indexes[0]["name"], "type": indexes[0]["type"]}
        ).should_match({"name": INDEX_NAME, "type": "vectorSearch"})

    @requires_sample_data(DATABASE_NAME, collections=[COLLECTION_NAME])
    def test_get_query_results_returns_five_relevant_listings(self):
        """Get query results: should return five listings with summary, url, and score."""
        local_rag_embeddings.create_embeddings(TestLocalRag.CONNECTION_STRING)
        self._ensure_index()
        self._wait_for_queryable_index()

        results = local_rag_pipeline.get_query_results(
            TestLocalRag.CONNECTION_STRING, "beach house"
        )

        # Vector search scores and result order vary across environments, so
        # validate the shape of the results rather than exact values.
        Expect.that(results).should_resemble(
            "examples/vector_search/local_rag/local-rag-query-results-output.txt"
        ).with_schema(
            {
                "count": 5,
                "required_fields": ["summary", "listing_url", "score"],
            }
        )

    @requires_sample_data(DATABASE_NAME, collections=[COLLECTION_NAME])
    def test_load_local_llm_returns_a_model(self):
        """Load local LLM: should load the Mistral 7B model through GPT4All."""
        local_llm = local_rag_pipeline.load_local_llm()

        Expect.that({"has_generate": hasattr(local_llm, "generate")}).should_match(
            {"has_generate": True}
        )

    @requires_sample_data(DATABASE_NAME, collections=[COLLECTION_NAME])
    def test_answer_question_returns_a_generated_answer(self):
        """Answer question: should return a non-empty answer generated from retrieved listings."""
        local_rag_embeddings.create_embeddings(TestLocalRag.CONNECTION_STRING)
        self._ensure_index()
        self._wait_for_queryable_index()

        answer = local_rag_pipeline.answer_question(
            TestLocalRag.CONNECTION_STRING, QUESTION
        )

        # The LLM response text varies on every run, so assert only that the
        # generation step produced text.
        Expect.that({"answer": answer, "is_empty": answer.strip() == ""}).should_match(
            {"answer": "...", "is_empty": False}
        )


if __name__ == "__main__":
    unittest.main()
