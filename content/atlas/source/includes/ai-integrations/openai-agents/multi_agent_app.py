"""Multi-agent travel assistant backed by MongoDB Atlas.

A triage agent answers travel questions by calling two specialist
agents as tools. Both specialists read reference data from the same
Atlas cluster that stores the conversation session, so every agent in
the application shares one database.
"""

import asyncio
import os

from agents import Agent, Runner, function_tool
from agents.extensions.memory import MongoDBSession
from pymongo import AsyncMongoClient

# The script reads your credentials from the environment so that you
# don't commit them to source control.
REQUIRED_ENV_VARS = ("ATLAS_URI", "OPENAI_API_KEY")
DATABASE_NAME = "travel_assistant"

# One client serves both the agent tools and the session store. Because
# you create the client yourself, your application owns its lifecycle.
# main() assigns both of these after it validates the environment.
client: AsyncMongoClient | None = None
database = None


@function_tool
async def lookup_destination(city: str) -> str:
    """Look up travel guidance for a destination city."""
    # Sub-agent tools query the shared database directly, so the agents
    # answer from your data instead of from model training data.
    document = await database.destinations.find_one({"city": city})
    if document is None:
        return f"No destination guide found for {city}."
    return (
        f"{document['city']}: best months are {document['best_months']}. "
        f"{document['summary']}"
    )


@function_tool
async def lookup_policy(topic: str) -> str:
    """Look up the company travel policy for a topic."""
    document = await database.policies.find_one({"topic": topic})
    if document is None:
        return f"No policy found for {topic}."
    return f"{document['topic']}: {document['rule']}"


# Each specialist is a full agent with its own instructions and tools.
destination_agent = Agent(
    name="Destination expert",
    instructions=(
        "You advise travelers on destinations. Always call "
        "lookup_destination and answer only from what it returns."
    ),
    tools=[lookup_destination],
)

policy_agent = Agent(
    name="Policy expert",
    instructions=(
        "You answer questions about the company travel policy. Always "
        "call lookup_policy and answer only from what it returns."
    ),
    tools=[lookup_policy],
)

# The as_tool() pattern turns each specialist into a tool that the
# triage agent can call. Unlike a handoff, control returns to the
# triage agent after each call, so it can combine both answers in one
# reply.
triage_agent = Agent(
    name="Travel assistant",
    instructions=(
        "You are a travel assistant. Use the destination and policy "
        "tools to gather facts before you answer, and call both when "
        "the question needs both. Remember details the traveler shared "
        "earlier in the conversation."
    ),
    tools=[
        destination_agent.as_tool(
            tool_name="ask_destination_expert",
            tool_description="Get travel guidance about a city.",
        ),
        policy_agent.as_tool(
            tool_name="ask_policy_expert",
            tool_description="Get the company travel policy for a topic.",
        ),
    ],
)


async def seed_reference_data() -> None:
    """Load the sample data that the specialist agents read."""
    await database.destinations.delete_many({})
    await database.policies.delete_many({})
    await database.destinations.insert_many(
        [
            {
                "city": "Lisbon",
                "best_months": "March through May",
                "summary": "Mild spring weather and low hotel rates.",
            },
            {
                "city": "Reykjavik",
                "best_months": "June through August",
                "summary": "Long daylight hours and open highland roads.",
            },
        ]
    )
    await database.policies.insert_many(
        [
            {"topic": "flights", "rule": "Book economy for flights under six hours."},
            {"topic": "hotels", "rule": "Nightly rates must stay under 250 USD."},
        ]
    )


async def main() -> None:
    global client, database

    # Fail fast with a clear message instead of surfacing a connection
    # error or an authentication error later in the run.
    missing = [name for name in REQUIRED_ENV_VARS if not os.environ.get(name)]
    if missing:
        raise SystemExit(
            "Set these environment variables before you run this script: "
            + ", ".join(missing)
        )

    client = AsyncMongoClient(os.environ["ATLAS_URI"])
    database = client[DATABASE_NAME]

    await seed_reference_data()

    # The session stores conversation history in Atlas. Pass the
    # existing client so the session and the agent tools share one
    # connection pool.
    session = MongoDBSession(
        session_id="traveler-123",
        client=client,
        database=DATABASE_NAME,
    )

    # Confirm connectivity before the first run.
    await session.ping()

    # The Runner loads prior turns from the session and writes the new
    # turn back, so the second question resolves "there" without you
    # passing the history yourself.
    first = await Runner.run(
        triage_agent,
        "I'm planning a trip to Lisbon. When should I go?",
        session=session,
    )
    print(first.final_output)

    second = await Runner.run(
        triage_agent,
        "What's our hotel budget for that trip?",
        session=session,
    )
    print(second.final_output)

    # session.close() is a no-op when you supply the client, so close
    # the client yourself.
    await client.close()


if __name__ == "__main__":
    asyncio.run(main())
