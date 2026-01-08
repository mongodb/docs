# start sample fixture
def sample_fixture():
    # Code before the test runs
    yield "Hello, World"
    # Code after the test runs
# end sample fixture

# start mongodb client
import pytest
import pymongo
import os

@pytest.fixture(scope="session")
def mongodb():
    client = pymongo.MongoClient(os.environ["MDB_URI"])
    assert client.admin.command("ping")["ok"] != 0.0
    yield client
    client.close()
# end mongodb client

# start test mongodb fixture
def test_mongodb_fixture(mongodb):
    """This test passes if `MDB_URI` is set to a valid connection
    string."""
    assert mongodb.admin.command("ping")["ok"] > 0
# end test mongodb fixture

# start rollback session
@pytest.fixture
def rollback_session(mongodb):
    session = mongodb.start_session()
    session.start_transaction()
    try:
        yield session
    finally:
        session.abort_transaction()
# end rollback session

# start test update mongodb
def test_update_mongodb(mongodb, rollback_session):
    my_collection = mongodb["sample_db"]["sample_collection"]
    my_collection.insert_one(
        {
            "_id": "bad_document",
            "description": (
                "If this still exists, then transactions are not working."
            ),
        },
        session=rollback_session,
    )
    assert (
        my_collection.find_one(
            {"_id": "bad_document"}, session=rollback_session
        )
        is not None
    )
# end test update mongodb

# start build command
python3 -m build
# end build command

# start twine upload
python3 -m twine upload dist/*
# end twine upload