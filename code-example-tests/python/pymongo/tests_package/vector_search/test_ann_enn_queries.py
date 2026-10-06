"""
Tests for the $vectorSearch ANN and ENN query examples.

These tests run real ``$vectorSearch`` queries against the
``sample_mflix.embedded_movies`` collection on the deployment in
CONNECTION_STRING. The deployment must have Search and Vector Search
installed (a local Atlas deployment or an Atlas cluster), and the
``embedded_movies`` collection must contain the
``plot_embedding_voyage_3_large`` field (2048-dimension Voyage AI
embeddings).

The examples query a search index named ``vector_index``. Test setup
creates that index with the filter fields (``genres``, ``year``) and
stored source configuration that the filter and stored source queries
require, and waits for the index to become queryable. If an index named
``vector_index`` already exists with an incompatible definition (for
example, one created from the docs' basic create-index example, which
declares no filter fields), the tests drop and recreate it, and the
pre-existing index is not restored when the run finishes. The index is
dropped in teardown only when this test run created it. The sample
database itself is never modified or dropped.
"""

import os
import time
import unittest

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

from utils.comparison import Expect
from utils.sample_data import requires_sample_data

import examples.vector_search.queries.basic_query as basic_query
import examples.vector_search.queries.enn_basic_query as enn_basic_query
import examples.vector_search.queries.filter_query as filter_query
import examples.vector_search.queries.stored_source_query as stored_source_query

DATABASE_NAME = "sample_mflix"
COLLECTION_NAME = "embedded_movies"
INDEX_NAME = "vector_index"
VECTOR_FIELD = "plot_embedding_voyage_3_large"

INDEX_BUILD_TIMEOUT = 300

# Covers all four queries: the basic and ENN queries ignore the filter
# fields and stored source configuration.
INDEX_DEFINITION = {
    "fields": [
        {
            "type": "vector",
            "path": VECTOR_FIELD,
            "numDimensions": 2048,
            "similarity": "dotProduct",
            "quantization": "scalar",
        },
        {"type": "filter", "path": "genres"},
        {"type": "filter", "path": "year"},
    ],
    "storedSource": {"include": ["genres", "plot", "title", "year"]},
}


class TestAnnEnnQueries(unittest.TestCase):
    CONNECTION_STRING = None
    client = None
    index_ready = False
    created_index = False

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestAnnEnnQueries.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestAnnEnnQueries.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestAnnEnnQueries.client = MongoClient(TestAnnEnnQueries.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

    @classmethod
    def tearDownClass(cls):
        if cls.client is not None:
            if cls.created_index:
                try:
                    cls._collection().drop_search_index(INDEX_NAME)
                except Exception:
                    pass
            cls.client.close()

    # --- helpers ---

    @staticmethod
    def _collection():
        return TestAnnEnnQueries.client[DATABASE_NAME][COLLECTION_NAME]

    @staticmethod
    def _index_is_compatible(index_doc):
        """Return True when an existing index supports all four queries."""
        definition = index_doc.get("latestDefinition", {})
        fields = definition.get("fields", [])
        vector_ok = any(
            f.get("type") == "vector" and f.get("path") == VECTOR_FIELD
            for f in fields
        )
        filter_paths = {f.get("path") for f in fields if f.get("type") == "filter"}
        return (
            vector_ok
            and {"genres", "year"} <= filter_paths
            and "storedSource" in definition
        )

    def _ensure_index(self):
        """Create the vector index once per test run, then wait until it is
        queryable."""
        if TestAnnEnnQueries.index_ready:
            return

        collection = TestAnnEnnQueries._collection()
        if collection.find_one({VECTOR_FIELD: {"$exists": True}}) is None:
            raise unittest.SkipTest(
                f"Collection {DATABASE_NAME}.{COLLECTION_NAME} has no documents "
                f"with the {VECTOR_FIELD} field. Load the Atlas sample dataset "
                "that includes the embedded_movies embeddings."
            )

        try:
            existing = list(collection.list_search_indexes())
        except Exception as error:
            raise unittest.SkipTest(
                "Could not list search indexes. The deployment must have Search "
                f"and Vector Search installed: {error}"
            )

        existing_index = next(
            (i for i in existing if i.get("name") == INDEX_NAME), None
        )
        if existing_index is not None:
            if TestAnnEnnQueries._index_is_compatible(existing_index):
                self._wait_for_queryable_index()
                return
            collection.drop_search_index(INDEX_NAME)

        collection.create_search_index(
            model=SearchIndexModel(
                definition=INDEX_DEFINITION, name=INDEX_NAME, type="vectorSearch"
            )
        )
        TestAnnEnnQueries.created_index = True
        self._wait_for_queryable_index()

    def _wait_for_queryable_index(self):
        collection = TestAnnEnnQueries._collection()
        deadline = time.time() + INDEX_BUILD_TIMEOUT
        while time.time() < deadline:
            indexes = list(collection.list_search_indexes(INDEX_NAME))
            if indexes and indexes[0].get("queryable") is True:
                TestAnnEnnQueries.index_ready = True
                return
            time.sleep(5)
        raise AssertionError(
            f"Search index {INDEX_NAME} did not become queryable within "
            f"{INDEX_BUILD_TIMEOUT} seconds."
        )

    def _require_server_version(self, major, minor):
        """Skip the current test when the server is older than major.minor."""
        version = tuple(
            int(p) for p in TestAnnEnnQueries.client.server_info()["version"].split(".")[:2]
        )
        if version < (major, minor):
            raise unittest.SkipTest(
                f"This query requires MongoDB {major}.{minor} or later; the "
                f"deployment runs {'.'.join(str(p) for p in version)}."
            )

    # --- tests ---

    @requires_sample_data(DATABASE_NAME, collections=[COLLECTION_NAME])
    def test_basic_query(self):
        """Basic query: should return ten movies with plot, title, and score."""
        self._ensure_index()
        result = basic_query.basic_query(TestAnnEnnQueries.CONNECTION_STRING)

        Expect.that(result).should_resemble(
            "examples/vector_search/queries/basic-query-output.txt"
        ).with_schema({"count": 10, "required_fields": ["plot", "title", "score"]})

    @requires_sample_data(DATABASE_NAME, collections=[COLLECTION_NAME])
    def test_filter_query(self):
        """Filter query: should return ten movies released between 1955 and 1975."""
        self._ensure_index()
        result = filter_query.filter_query(TestAnnEnnQueries.CONNECTION_STRING)

        Expect.that(result).should_resemble(
            "examples/vector_search/queries/filter-query-output.txt"
        ).with_schema(
            {"count": 10, "required_fields": ["plot", "title", "year", "score"]}
        )
        for doc in result:
            self.assertTrue(
                1955 < doc["year"] < 1975,
                f"Returned movie {doc.get('title')!r} with year {doc.get('year')} "
                "outside the pre-filter range (1955, 1975).",
            )

    @requires_sample_data(DATABASE_NAME, collections=[COLLECTION_NAME])
    def test_stored_source_query(self):
        """Stored source query: should return ten movies with title, plot, genres, and score."""
        # returnStoredSource for vector indexes requires MongoDB 8.2+.
        self._require_server_version(8, 2)
        self._ensure_index()
        result = stored_source_query.stored_source_query(
            TestAnnEnnQueries.CONNECTION_STRING
        )

        Expect.that(result).should_resemble(
            "examples/vector_search/queries/stored-source-query-output.txt"
        ).with_schema(
            {"count": 10, "required_fields": ["title", "plot", "genres", "score"]}
        )
        allowed_genres = {"Action", "Drama", "Comedy"}
        for doc in result:
            self.assertTrue(
                allowed_genres & set(doc["genres"]),
                f"Returned movie {doc.get('title')!r} with genres "
                f"{doc.get('genres')} outside the pre-filter list.",
            )

    @requires_sample_data(DATABASE_NAME, collections=[COLLECTION_NAME])
    def test_enn_query(self):
        """ENN query: should return ten movies with plot, title, and score."""
        self._ensure_index()
        result = enn_basic_query.enn_basic_query(TestAnnEnnQueries.CONNECTION_STRING)

        Expect.that(result).should_resemble(
            "examples/vector_search/queries/enn-basic-query-output.txt"
        ).with_schema({"count": 10, "required_fields": ["plot", "title", "score"]})


if __name__ == "__main__":
    unittest.main()
