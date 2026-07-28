from __future__ import annotations

import os
import sys
import time
import warnings

from dotenv import load_dotenv

load_dotenv()

warnings.filterwarnings("ignore")

from crewai import Agent, Crew, Task
from crewai.tools import tool

from crewai_mongodb_memory import MemoryRecord, MongoDBStorageBackend, embed_text
from crewai.events import CrewKickoffStartedEvent, CrewKickoffCompletedEvent, AgentExecutionCompletedEvent
from crewai.events import BaseEventListener

DEMO_DB = "crewai_mem_agent_demo"
SCOPE = "/users/alex/preferences"
MODEL = os.environ.get("ANTHROPIC_MODEL", "anthropic/claude-3-5-sonnet-latest")
EMBEDDING_MODEL = os.environ.get("VOYAGE_MODEL", "voyage-4")

# Module-level backend handle so the function tools can reach it.
_BACKEND: MongoDBStorageBackend | None = None
_SESSION_LABEL = ""

# Custom event listener for logging Crew and Agent events.
class EventListener(BaseEventListener):
    def __init__(self):
        super().__init__()

    def setup_listeners(self, crewai_event_bus):
        @crewai_event_bus.on(CrewKickoffStartedEvent)
        def on_crew_started(source, event):
            print(f"Crew '{event.crew_name}' has started execution!")

        @crewai_event_bus.on(CrewKickoffCompletedEvent)
        def on_crew_completed(source, event):
            print(f"Crew '{event.crew_name}' has completed execution!")
            print(f"Output: {event.output}")

        @crewai_event_bus.on(AgentExecutionCompletedEvent)
        def on_agent_execution_completed(source, event):
            print(f"Agent '{event.agent.role}' completed task")
            print(f"Output: {event.output}")

def banner(title: str) -> None:
    print(f"\n{'=' * 70}\n{title}\n{'=' * 70}")

def embed(text: str, input_type: str) -> list[float]:
    """Generate embeddings with an explicit Voyage model."""
    try:
        return embed_text(text, input_type=input_type, model=EMBEDDING_MODEL)
    except TypeError:
        # Backward compatibility for older crewai-mongodb-memory versions.
        return embed_text(text, input_type=input_type)

@tool("remember_preference")
def remember_preference(fact: str) -> str:
    """Store a durable user preference in MongoDB Atlas long-term memory."""
    assert _BACKEND is not None
    rec = MemoryRecord(
        content=fact,
        scope=SCOPE,
        categories=["preference"],
        embedding=embed(fact, input_type="document"),
    )
    _BACKEND.save([rec])
    return f"Stored preference: {fact}"

@tool("recall_preferences")
def recall_preferences(query: str) -> str:
    """Retrieve relevant user preferences from Atlas via $vectorSearch."""
    assert _BACKEND is not None
    qv = embed(query, input_type="query")
    hits = _BACKEND.search(qv, scope_prefix=SCOPE, limit=3)
    if not hits:
        return "No relevant preferences found."
    for rec, score in hits:
        print(f"  - [{score:.3f}] {rec.content}")
    return "\n".join(f"- {rec.content} (score={score:.3f})" for rec, score in hits)

def build_agent() -> Agent:
    return Agent(
        role="Personal Concierge",
        goal="Help the user with durable long-term memory stored in MongoDB Atlas.",
        backstory=(
            """You remember user preferences across sessions. When the user shares 
            a durable preference, call remember_preference. When a request may 
            depend on what you know about them, call recall_preferences first 
            and use the results."""
        ),
        tools=[remember_preference, recall_preferences],
        llm=MODEL,
        verbose=True,
    )

def run_task(description: str, expected_output: str) -> str:
    """Run a single-task crew (a fresh crew each call is a fresh session)."""
    agent = build_agent()
    task = Task(description=description, expected_output=expected_output, agent=agent)
    crew = Crew(agent, [task])
    return str(crew.kickoff())

def main() -> None:
    global _BACKEND, _SESSION_LABEL

    uri = os.environ.get("ATLAS_URI")
    # Fast fail if the required environment variables are not set.
    if not all([uri, os.environ.get("ANTHROPIC_API_KEY"), os.environ.get("VOYAGE_API_KEY")]):
        print("This script needs ATLAS_URI, ANTHROPIC_API_KEY, and VOYAGE_API_KEY.")
        sys.exit(1)

    print(f"=== CrewAI and MongoDB Atlas long-term memory (model={MODEL}) ===")
    _BACKEND = MongoDBStorageBackend(uri, database_name=DEMO_DB)
    _BACKEND.delete(scope_prefix=SCOPE)  # clean slate for a repeatable run

    print("Ensuring Atlas Vector Search index (first build can take ~1 min)...")
    if not _BACKEND.ensure_vector_index(wait=True):
        print("Vector index did not become queryable in time.")
        sys.exit(1)
    print("Index queryable.")

    # Initialize the event listener for the agent.
    listener = EventListener()

    # Session 1: the agent learns and stores preferences.
    banner("SESSION 1 - agent stores durable preferences in Atlas")
    session_1_input = (
        """The user says: 'I'm vegetarian, I avoid dairy, and I always prefer
        window seats on flights.' Store each durable preference."""
    )
    _SESSION_LABEL = "SESSION 1"
    print(f"  {session_1_input}")
    out1 = run_task(
        description=session_1_input,
        expected_output="A short confirmation of what was stored.",
    )
    print(f"\nAgent (session 1): {out1}")

    # Atlas indexing is asynchronous, so wait until the facts are searchable.
    print("\nWaiting for Atlas to index the new memories...")
    for _ in range(20):
        if _BACKEND.search(embed("food", input_type="query"), scope_prefix=SCOPE, limit=1):
            break
        time.sleep(2)
    print("Memories searchable.")

    # Session 2: a brand-new crew with no shared state recalls from Atlas.
    banner("SESSION 2 - fresh crew answers via recall_preferences")
    session_2_input = (
        """The user is booking a long flight and pre-ordering an in-flight meal.  
        Recommend a seat and a meal that fit their preferences."""
    )
    _SESSION_LABEL = "SESSION 2"
    print(f"  {session_2_input}")
    out2 = run_task(
        description=session_2_input,
        expected_output="A seat and meal recommendation grounded in recalled preferences.",
    )
    print(f"\nAgent (session 2, brand-new crew): {out2}")

    banner("Proof: direct $vectorSearch recall over stored preferences")
    hits = _BACKEND.search(
        embed("dietary and seating preferences", input_type="query"),
        scope_prefix=SCOPE,
        limit=5,
    )
    for rec, score in hits:
        print(f"  - [{score:.3f}] {rec.content}")

    _BACKEND.delete(scope_prefix=SCOPE)
    _BACKEND.close()
    print("\nDone - CrewAI stored and recalled preferences via MongoDB Vector Search.")


if __name__ == "__main__":
    main()
