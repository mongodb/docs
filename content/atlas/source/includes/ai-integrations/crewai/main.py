from crewai import Agent, Task, Crew, Process, LLM
from crewai_tools import MongoDBVectorSearchTool, MongoDBVectorSearchConfig
from langchain_community.document_loaders import PyPDFLoader
from dotenv import load_dotenv
import os, time

load_dotenv()

def rag_agent():
    """
    An agent that uses RAG to analyze recent MongoDB announcements.
    """

    # Configure the vector search tool
    tool = MongoDBVectorSearchTool(
        connection_string = os.environ.get("MONGODB_URI"),
        database_name = "crewai_db",
        collection_name = "test"
    )

    # Connect to MongoDB collection and delete all documents
    coll = tool._coll
    coll.delete_many({})

    # Load PDF from URL and insert documents into MongoDB
    print("Loading MongoDB AI announcements PDF...")
    loader = PyPDFLoader("https://investors.mongodb.com/node/13556/pdf")
    tool.add_texts([i.page_content for i in loader.load()])
    
    # Create the vector search index
    print("Creating vector search index...")
    if not any([ix["name"] == "vector_index" for ix in coll.list_search_indexes()]):
      tool.create_vector_search_index(dimensions=1536, auto_index_timeout=60)

    # Wait for index initial sync to complete
    n_docs = coll.count_documents({})
    start = time.monotonic()
    while time.monotonic() - start <= 60:
        if len(tool._run("test query")) == n_docs:
            print("Index is ready for queries")
            break
        else:
            time.sleep(1)

    # Specify a custom vector search query (optional)
    tool.query_config = MongoDBVectorSearchConfig(
        limit=3, score_threshold=0.75
    )

    # Test the tool
    print("Testing the tool...")
    print(tool.run(query="AI announcements"))

    # Assemble a crew by specifying an agent and its task
    researcher = Agent(
        role="MongoDB Announcement Researcher",
        goal="Find and extract key information about MongoDB's recent announcements and developments",
        backstory="You're specialized in analyzing business and technology announcements",
        verbose=False,
        tools=[tool],
        llm=LLM(model="gpt-4o"), # Customize to your LLM of choice
    )
    research_task = Task(
        description="Research MongoDB's recent AI announcements and developments",
        expected_output="A summary of MongoDB's latest AI initiatives, partnerships, and features",
        agent=researcher,
    )
    crew = Crew(
        agents=[researcher],
        tasks=[research_task],
        process=Process.sequential,
        verbose=False
    )

    # Get the results and print the analysis
    print("Running the crew...")
    result = crew.kickoff()
    print("\n" + "="*50 + "\nMONGODB AI ANNOUNCEMENTS ANALYSIS:\n" + "="*50)
    print(result.raw)
    return result

if __name__ == "__main__":
    rag_agent()
