"""Shared Atlas Search index helpers for the LangChain integration tests.

These helpers are test scaffolding only — they are never snipped into the
docs. The LangChain page links to the index-creation documentation rather
than showing index creation inline, so the examples assume an index exists.
"""

import os
import time

from langchain_mongodb.index import (
    create_fulltext_search_index,
    create_vector_search_index,
)

# voyage-3-large produces 1024-dimension embeddings.
VOYAGE_DIMENSIONS = 1024

# Atlas Search index builds are asynchronous; these bound the waiting.
INDEX_BUILD_TIMEOUT = 300
SEARCH_CONSISTENCY_TIMEOUT = 120


def has_voyage_key():
    """Return True when a Voyage AI key is available."""
    return os.getenv("VOYAGE_API_KEY") is not None


def has_openai_key():
    """Return True when an OpenAI key is available."""
    return os.getenv("OPENAI_API_KEY") is not None


def ensure_vector_index(
    collection, index_name="vector_index", path="embedding", filters=None
):
    """Create a vector search index, ignoring the error if it already exists.

    Pass ``filters`` to declare metadata fields that queries filter on;
    $vectorSearch rejects filters on fields the index does not declare.
    """
    try:
        create_vector_search_index(
            collection=collection,
            index_name=index_name,
            path=path,
            dimensions=VOYAGE_DIMENSIONS,
            similarity="cosine",
            filters=filters,
            wait_until_complete=INDEX_BUILD_TIMEOUT,
        )
    except Exception as error:
        if "already exists" not in str(error).lower():
            raise


def ensure_fulltext_index(collection, index_name="search_index", field="text"):
    """Create a full-text search index, ignoring the error if it already exists."""
    try:
        create_fulltext_search_index(
            collection=collection,
            index_name=index_name,
            field=field,
            wait_until_complete=INDEX_BUILD_TIMEOUT,
        )
    except Exception as error:
        if "already exists" not in str(error).lower():
            raise


def wait_for_search_results(query_fn, timeout=SEARCH_CONSISTENCY_TIMEOUT):
    """Poll query_fn until it returns a non-empty result or the timeout elapses.

    Atlas Search indexes update asynchronously after a write, so a query can
    legitimately return nothing for a few seconds after documents are added.
    """
    deadline = time.monotonic() + timeout
    results = []
    while time.monotonic() < deadline:
        results = query_fn()
        if results:
            return results
        time.sleep(3)
    return results
