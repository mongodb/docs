"""
MongoDB Sample Database Registry and Metadata

This module serves as the source for MongoDB sample database definitions
in the Python code example testing infrastructure. It maintains the canonical
list of sample databases and their expected collection structures.

Registry Maintenance Guidelines:
    When adding new sample databases:
    1. Verify the database is officially supported by MongoDB
    2. List all collections that are essential for typical use cases
    3. Consider backward compatibility with existing test code

    When modifying existing entries:
    1. Ensure changes don't break existing test suites
    2. Consider versioning if collection schemas change significantly
    3. Update dependent test code to handle collection variations

Design Decision: Static Registry vs Dynamic Discovery
    This module uses a static registry rather than dynamic database introspection
    because:
    1. Performance: Avoids network calls during test discovery
    2. Reliability: Tests can validate expectations before running
    3. Documentation: Serves as authoritative reference for what's available
    4. Versioning: Enables tracking changes to sample database schemas
"""

# Canonical registry of MongoDB sample databases for the Python test infrastructure
# These databases are available through MongoDB Atlas sample data loading
# and are commonly referenced in MongoDB documentation and tutorials
SAMPLE_DATABASES = {
    # Used for: aggregation pipelines, text search, time series analysis
    "sample_mflix": ["movies", "theaters", "users", "comments", "sessions"],
    # Restaurant and neighborhood data from New York City
    # Used for: geospatial queries, location-based search, indexing examples
    "sample_restaurants": ["restaurants", "neighborhoods"],
    # Used for: CRUD operations, data modeling exercises, performance tuning
    "sample_training": [
        "posts",
        "companies",
        "inspections",
        "routes",
        "trips",
        "grades",
        "zips",
    ],
    # Financial analytics data
    # Used for: aggregation framework examples, analytics queries, data visualization
    "sample_analytics": ["customers", "accounts", "transactions"],
    # Airbnb listings and reviews
    # Used for: text search, faceted search, complex document structures
    "sample_airbnb": ["listingsAndReviews"],
    # Geospatial datasets
    # Used for: GeoJSON queries, spatial indexing, mapping applications
    "sample_geospatial": ["shipwrecks"],
    # Astronomy data for educational purposes
    # Used for: basic queries, data exploration, scientific data examples
    "sample_guides": ["planets", "comets"],
    # Retail sales data
    # Used for: business analytics, sales reporting, customer segmentation
    "sample_stores": ["sales"],
    # Supply chain and inventory data
    # Used for: logistics queries, inventory management, supply chain analytics
    "sample_supplies": ["sales"],
    # Weather and environmental data
    # Used for: time series analysis, environmental monitoring, data aggregation
    "sample_weatherdata": ["data"],
}


def get_sample_database_collections(database_name):
    """
    Get the expected essential collections for a sample database.

    Returns the list of collections that are considered essential for the
    specified sample database. These are the collections most commonly
    referenced in examples and tutorials for that database.

    Args:
        database_name (str): Name of the sample database (e.g., "sample_mflix")

    Returns:
        list | None: List of essential collection names, or None if database not registered

    Design Note: Returns None (not empty list) for unknown databases to
    distinguish between "database has no essential collections" and
    "database not found in registry".

    Usage Examples:
        collections = get_sample_database_collections("sample_mflix")
        # Returns: ["movies", "theaters", "users", "comments", "sessions"]

        unknown = get_sample_database_collections("unknown_db")
        # Returns: None
    """
    return SAMPLE_DATABASES.get(database_name)


def is_valid_sample_database(database_name):
    """
    Check if a database name is recognized as an official sample database.

    This function validates whether a given database name corresponds to
    one of MongoDB's officially supported sample databases available
    through Atlas or other official channels.

    Args:
        database_name (str): Name of the database to validate

    Returns:
        bool: True if the database is in the official sample database registry

    Usage Examples:
        is_valid_sample_database("sample_mflix")  # Returns: True
        is_valid_sample_database("my_custom_db")  # Returns: False

    Design Decision: This provides a way to distinguish between official
    sample databases (which have known schemas and are widely available)
    and custom databases that may have unpredictable availability.
    """
    return database_name in SAMPLE_DATABASES


def get_all_sample_database_names():
    """
    Get complete list of all registered sample database names.

    Returns all database names from the official MongoDB sample database
    registry. This is useful for iteration, reporting, and validation
    scenarios where you need to work with all available sample databases.

    Returns:
        list: Alphabetically sorted list of all sample database names

    Design Decision: Returns a sorted list for consistent ordering in
    reports and user interfaces. The sorting is deterministic and
    makes it easier to locate specific databases in long lists.

    Usage Examples:
        all_dbs = get_all_sample_database_names()
        # Returns: ["sample_airbnb", "sample_analytics", "sample_geospatial", ...]

        # Check availability of all sample databases
        for db_name in get_all_sample_database_names():
            if check_sample_data_available(db_name):
                print(f"✓ {db_name} is available")
            else:
                print(f"✗ {db_name} is missing")
    """
    return sorted(SAMPLE_DATABASES.keys())
