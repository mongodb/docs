import asyncio
import os

from pymongo import AsyncMongoClient
from claude_agent_sdk import ClaudeAgentOptions, ResultMessage, query
from claude_agent_sdk_mongodb_session_store import MongoDBSessionStore


async def main() -> None:
    client = AsyncMongoClient(
        os.environ["MONGODB_URI"],
        readPreference="primary",
        w="majority",
        serverSelectionTimeoutMS=10_000,
        timeoutMS=20_000,
    )
    store = MongoDBSessionStore(client=client, db_name="claude")

    # Set up the database indexes that optimize the store's performance.
    # This operation is idempotent, so you can run it on every startup.
    await store.create_schema()

    async for message in query(
        prompt="Review this codebase and explain what it does.",
        options=ClaudeAgentOptions(session_store=store),
    ):
        if isinstance(message, ResultMessage) and message.subtype == "success":
            print(message.result)
            # The SDK assigns the session ID. Save it so that you can
            # resume the session later.
            print(f"Session ID: {message.session_id}")

    await client.close()


asyncio.run(main())
