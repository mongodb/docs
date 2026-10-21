# start-imports
import os, pprint, time
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_voyageai import VoyageAIEmbeddings
from langchain_openai import ChatOpenAI
# end-imports

# start-env
load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
# end-env

# start-load-data
# Loads the PDF
loader = PyPDFLoader("https://investors.mongodb.com/node/13576/pdf")
data = loader.load()

# Splits the PDF into documents
text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=20)
docs = text_splitter.split_documents(data)
# end-load-data

# start-vector-store
# Instantiates the vector store using your MongoDB connection string
vector_store = MongoDBAtlasVectorSearch.from_connection_string(
   connection_string = MONGODB_URI,
   namespace = "voyage_db.langchain_python",
   embedding = VoyageAIEmbeddings(model="voyage-4-large"),
   index_name = "vector_index"
)

# Ensures that the collection is empty
vector_store.collection.delete_many({})

# Adds documents to the vector store
vector_store.add_documents(documents=docs)
# end-vector-store

# start-create-index
# Creates the index if it does not already exist
if not list(vector_store.collection.list_search_indexes("vector_index")):
   vector_store.create_vector_search_index(
      dimensions = 1024,
      filters = [ "page_label" ]
   )

# Waits for the index to build and become queryable
print("Waiting for initial sync...")
time.sleep(60)
# end-create-index

# start-search
query = "New AI product partnerships"
results = vector_store.similarity_search_with_score(
   query = query, k = 3
)

print("Semantic search results without pre-filtering:")
pprint.pprint(results)
# end-search

# start-search-filtered
query = "New AI product partnerships"
results = vector_store.similarity_search_with_score(
   query = query,
   k = 3,
   pre_filter = { "page_label": { "$eq": "2" } }
)

print("Semantic search results with pre-filtering:")
pprint.pprint(results)
# end-search-filtered

# start-answer
# Instantiates the vector store as a retriever
retriever = vector_store.as_retriever(
   search_type = "similarity",
   search_kwargs = { "k": 10 }
)

# Defines a prompt template
template = """
   Use the following pieces of context to answer the question at the end.
   {context}
   Question: {question}
"""
prompt = PromptTemplate.from_template(template)
model = ChatOpenAI(model="gpt-4o")

# Constructs a chain to answer questions on your data
chain = (
   { "context": retriever, "question": RunnablePassthrough() }
   | prompt
   | model
   | StrOutputParser()
)

# Prompts the chain
question = "Which AI providers have partnerships with MongoDB?"
answer = chain.invoke(question)

print("Question: " + question)
print("Answer: " + answer)
# end-answer
