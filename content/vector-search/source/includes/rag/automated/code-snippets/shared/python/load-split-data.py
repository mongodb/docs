from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Load the PDF
loader = PyPDFLoader("https://investors.mongodb.com/node/12236/pdf")
data = loader.load()

# Split the data into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=20)
documents = text_splitter.split_documents(data)

docs_to_insert = [{
    "text": doc.page_content
} for doc in documents]