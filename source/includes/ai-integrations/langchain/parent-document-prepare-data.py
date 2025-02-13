from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader

# Load the PDF
loader = PyPDFLoader("https://investors.mongodb.com/node/12881/pdf") 
data = loader.load()

# Chunk into parent documents
parent_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=20)
docs = parent_splitter.split_documents(data)

# Print a document
docs[0]