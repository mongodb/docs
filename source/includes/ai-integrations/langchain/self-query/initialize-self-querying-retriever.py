from langchain_mongodb.retrievers import MongoDBAtlasSelfQueryRetriever
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o")
retriever = MongoDBAtlasSelfQueryRetriever.from_llm(
    llm=llm,
    vectorstore=vector_store,
    metadata_field_info=metadata_field_info,
    document_contents=document_content_description
)
