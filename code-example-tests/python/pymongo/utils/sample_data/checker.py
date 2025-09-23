"""
Core Sample Data Availability Checker for MongoDB Test Infrastructure

This module provides the central functionality for checking MongoDB sample database
availability in code example testing environments. It's designed to gracefully handle
connection failures and provide informative feedback when sample data is missing.

Key Design Principles:
    1. Fail-Safe Operation: Connection failures should not crash tests
    2. Performance Optimization: Results are cached to avoid repeated database calls
    3. Informative Feedback: Clear messages about what sample data is missing
    4. Thread Safety: Multiple test threads can safely use the checker
    5. Resource Management: Connections are properly managed and cleaned up

Connection Strategy:
    The checker uses aggressive timeouts (2 seconds) to quickly determine if sample
    databases are unavailable. This prevents tests from hanging when MongoDB is
    unreachable, which is common in CI environments or developer setups without
    sample data loaded.

Caching Architecture:
    Results are cached based on (database_name, collections) tuples to avoid
    repeated network calls during test runs. The cache is cleared between test
    sessions but persists within a single test run for performance.

Error Handling Philosophy:
    All network operations are wrapped in try-catch blocks that silently handle
    errors and return False. This prevents individual test failures from affecting
    the entire test suite when sample data is unavailable.

Maintainer Notes:
    When modifying connection behavior:
    1. Preserve the aggressive timeout strategy for CI compatibility
    2. Ensure all exceptions are caught and handled gracefully
    3. Maintain thread safety in caching operations
    4. Keep error messages helpful for developers setting up their environment
"""

import os
import unittest
from typing import List, Optional, Dict, Any
from pymongo import MongoClient
from pymongo.errors import (
    ConnectionFailure,
    ServerSelectionTimeoutError,
    ConfigurationError,
)
from dotenv import load_dotenv

from .registry import (
    SAMPLE_DATABASES,
    get_sample_database_collections,
    get_all_sample_database_names,
)
from .cache import get_cache


class SampleDataChecker:
    """
    Core class for checking MongoDB sample database availability with intelligent caching.

    This class provides thread-safe, cached checking of MongoDB sample databases
    commonly used in MongoDB documentation and tutorials. It's designed to handle
    connection failures gracefully and provide helpful feedback when sample data
    is missing from the test environment.

    Class Attributes:
        _connection_string (str): Cached MongoDB connection string
        _client (MongoClient): Cached MongoDB client instance
        _cache (SampleDataCache): Thread-safe cache for availability results

    Design Decisions:
        1. Class methods only: No instance state to avoid threading issues
        2. Aggressive caching: Database checks are expensive and results rarely change
        3. Short timeouts: 2-second limit prevents tests from hanging
        4. Silent failures: Network errors return False rather than raising exceptions
        5. Single client reuse: Amortizes connection overhead across checks

    Threading Considerations:
        The class is designed for multi-threaded test environments where multiple
        test cases may check sample data availability simultaneously. The cache
        implementation provides appropriate locking for thread safety.
    """

    _connection_string = None
    _client = None
    _cache = get_cache()

    @classmethod
    def _get_connection_string(cls) -> Optional[str]:
        """
        Get MongoDB connection string from environment variables or .env file.

        The connection string discovery follows this priority order:
        1. CONNECTION_STRING environment variable (highest priority)
        2. CONNECTION_STRING from .env file in current directory
        3. None if not found anywhere

        Returns:
            Optional[str]: Connection string or None if not configured

        Design Decision: Environment variables take precedence over .env files
        to support CI/CD environments where secrets are injected as env vars.
        The .env file provides a convenient fallback for local development.

        Caching Strategy: Connection string is cached after first lookup to
        avoid repeated environment variable access and file I/O operations.
        """
        if cls._connection_string is not None:
            return cls._connection_string

        # Check environment variable first (CI/CD preferred method)
        connection_string = os.getenv("CONNECTION_STRING")

        # Fallback to .env file for local development
        if connection_string is None:
            try:
                load_dotenv()
                connection_string = os.getenv("CONNECTION_STRING")
            except Exception:
                # Silently handle .env loading errors (file missing, parse errors, etc.)
                pass

        cls._connection_string = connection_string
        return connection_string

    @classmethod
    def _get_client(cls) -> Optional[MongoClient]:
        """
        Get MongoDB client with aggressive timeout settings for fast failure detection.

        The client is configured with 2-second timeouts across all operations to
        quickly determine connectivity status without hanging test execution.
        This is essential for CI environments where MongoDB may not be available.

        Returns:
            Optional[MongoClient]: Configured MongoDB client or None if connection fails

        Timeout Strategy:
            - serverSelectionTimeoutMS: 2000ms to quickly detect unreachable servers
            - connectTimeoutMS: 2000ms to prevent hanging on TCP connect attempts
            - socketTimeoutMS: 2000ms to limit individual operation duration

        Design Rationale:
            Sample data checking should be fast and non-blocking. If a MongoDB
            instance isn't readily available, tests should skip quickly rather
            than wait for default timeout periods (30+ seconds).

        Connection Validation:
            A ping command is issued immediately to validate the connection works.
            This catches authentication errors and other configuration issues early.
        """
        if cls._client is not None:
            return cls._client

        connection_string = cls._get_connection_string()
        if connection_string is None:
            return None

        try:
            # Configure aggressive timeouts for fast failure detection
            cls._client = MongoClient(
                connection_string,
                serverSelectionTimeoutMS=2000,  # Quick server discovery
                connectTimeoutMS=2000,  # Fast TCP connection timeout
                socketTimeoutMS=2000,  # Short operation timeout
            )
            # Validate connection immediately with ping command
            cls._client.admin.command("ping")
            return cls._client
        except (
            ConnectionFailure,
            ServerSelectionTimeoutError,
            ConfigurationError,
            Exception,
        ):
            # Silently handle all connection errors and return None
            # This includes network issues, authentication failures, invalid URIs, etc.
            cls._client = None
            return None

    @classmethod
    def _close_client(cls) -> None:
        """Close the MongoDB client connection."""
        if cls._client is not None:
            try:
                cls._client.close()
            except Exception:
                # Silently handle close errors
                pass
            finally:
                cls._client = None

    @classmethod
    def _check_database_exists(cls, database_name: str) -> bool:
        """
        Check if a database exists.

        Args:
            database_name (str): Name of the database to check

        Returns:
            bool: True if database exists
        """
        client = cls._get_client()
        if client is None:
            return False

        try:
            db_list = client.list_database_names()
            return database_name in db_list
        except Exception:
            # Silently handle errors and return False
            return False

    @classmethod
    def _check_collections_exist(
        cls, database_name: str, collection_names: List[str]
    ) -> bool:
        """
        Check if all specified collections exist in a database.

        Args:
            database_name (str): Name of the database
            collection_names (List[str]): List of collection names to check

        Returns:
            bool: True if all collections exist
        """
        client = cls._get_client()
        if client is None:
            return False

        try:
            db = client[database_name]
            existing_collections = db.list_collection_names()
            return all(
                collection in existing_collections for collection in collection_names
            )
        except Exception:
            # Silently handle errors and return False
            return False

    @classmethod
    def check_sample_data_available(
        cls, database_name: str, required_collections: Optional[List[str]] = None
    ) -> bool:
        """
        Check if a sample database and its collections are available.

        Args:
            database_name (str): Name of the sample database
            required_collections (Optional[List[str]]): List of required collections.
                                                       If None, uses default collections from registry.

        Returns:
            bool: True if database and all required collections are available
        """
        # Use default collections from registry if none specified
        if required_collections is None:
            required_collections = get_sample_database_collections(database_name)
            if required_collections is None:
                # Unknown database
                return False

        # Check cache first
        cache_key = cls._cache.make_cache_key(database_name, required_collections)
        cached_result = cls._cache.get(cache_key)
        if cached_result is not None:
            return cached_result

        # Check database existence
        db_exists = cls._check_database_exists(database_name)
        if not db_exists:
            cls._cache.set(cache_key, False)
            return False

        # Check collections if specified
        if required_collections:
            collections_exist = cls._check_collections_exist(
                database_name, required_collections
            )
            result = collections_exist
        else:
            result = True

        # Cache and return result
        cls._cache.set(cache_key, result)
        return result

    @classmethod
    def check_multiple_sample_databases(
        cls,
        databases: List[str],
        collections_per_database: Optional[Dict[str, List[str]]] = None,
    ) -> Dict[str, Any]:
        """
        Check multiple sample databases for availability.

        Args:
            databases (List[str]): List of database names to check
            collections_per_database (Optional[Dict[str, List[str]]]): Mapping of database to required collections

        Returns:
            Dict[str, Any]: Result containing overall availability, missing and available databases
        """
        available_databases = []
        missing_databases = []

        for database_name in databases:
            required_collections = None
            if collections_per_database:
                required_collections = collections_per_database.get(database_name)

            if cls.check_sample_data_available(database_name, required_collections):
                available_databases.append(database_name)
            else:
                missing_databases.append(database_name)

        return {
            "overall_available": len(missing_databases) == 0,
            "available_databases": available_databases,
            "missing_databases": missing_databases,
            "total_checked": len(databases),
            "available_count": len(available_databases),
        }

    @classmethod
    def get_available_sample_databases(cls) -> List[str]:
        """
        Get list of available sample databases.

        Returns:
            List[str]: List of available sample database names
        """
        available_databases = []

        for database_name in get_all_sample_database_names():
            if cls.check_sample_data_available(database_name):
                available_databases.append(database_name)

        return available_databases

    @classmethod
    def clear_sample_data_cache(cls) -> None:
        """Clear the sample data availability cache."""
        cls._cache.clear()

    @classmethod
    def show_sample_data_summary(cls) -> None:
        """Show a summary of sample data availability."""
        available_databases = cls.get_available_sample_databases()

        if not available_databases:
            print("📊 Sample Data Status: No MongoDB sample databases found")
            print("   Some tests may be skipped. To load sample data:")
            print("   • Atlas: https://www.mongodb.com/docs/atlas/sample-data/")
            print("   • Local: Use mongorestore with sample data archive")
        else:
            print(
                f"📊 Sample Data Status: {len(available_databases)} database(s) available"
            )
            print(f"   Found: {', '.join(available_databases)}")

    @classmethod
    def _ensure_summary_shown(cls) -> None:
        """Ensure the summary is shown once per test run."""
        cls._cache.ensure_summary_shown_once(cls.show_sample_data_summary)

    @classmethod
    def ensure_sample_data_or_skip(
        cls, database_name: str, collections: Optional[List[str]] = None
    ) -> None:
        """
        Ensure sample data is available or skip the current test.

        Args:
            database_name (str): Name of the sample database
            collections (Optional[List[str]]): List of required collections

        Raises:
            unittest.SkipTest: If sample data is not available
        """
        cls._ensure_summary_shown()

        if not cls.check_sample_data_available(database_name, collections):
            if collections:
                skip_message = f"Sample database '{database_name}' with collections {collections} not available"
            else:
                skip_message = f"Sample database '{database_name}' not available"
            raise unittest.SkipTest(skip_message)

    @classmethod
    def ensure_multiple_sample_data_or_skip(
        cls,
        databases: List[str],
        collections_per_database: Optional[Dict[str, List[str]]] = None,
    ) -> None:
        """
        Ensure multiple sample databases are available or skip the current test.

        Args:
            databases (List[str]): List of database names to check
            collections_per_database (Optional[Dict[str, List[str]]]): Mapping of database to required collections

        Raises:
            unittest.SkipTest: If any required sample data is not available
        """
        cls._ensure_summary_shown()

        result = cls.check_multiple_sample_databases(
            databases, collections_per_database
        )

        if not result["overall_available"]:
            missing_dbs = result["missing_databases"]
            skip_message = (
                f"Required sample databases not available: {', '.join(missing_dbs)}"
            )
            raise unittest.SkipTest(skip_message)

    @classmethod
    def cleanup(cls) -> None:
        """Clean up resources. Call this in test teardown if needed."""
        cls._close_client()
        cls._connection_string = None
