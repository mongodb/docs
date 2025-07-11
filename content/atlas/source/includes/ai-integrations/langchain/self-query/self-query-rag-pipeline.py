import pprint
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import  RunnablePassthrough
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o")
# Configure self-query retriever with a document limit
retriever = MongoDBAtlasSelfQueryRetriever.from_llm(
    llm,
    vector_store,
    document_content_description,
    metadata_field_info,
    enable_limit=True
)

# Define a prompt template
template = """
   Use the following pieces of context to answer the question at the end.
   {context}
   Question: {question}
"""
prompt = PromptTemplate.from_template(template)

# Construct a chain to answer questions on your data
chain = (
   { "context": retriever, "question": RunnablePassthrough()}
   | prompt   
   | llm
   | StrOutputParser()
)

# Prompt the chain
question = "What are two movies about toys after 1990?" # year > 1990 and document limit of 2
answer = chain.invoke(question)

print("Question: " + question)
print("Answer: " + answer)

# Return source documents
documents = retriever.invoke(question)
print("\nSource documents:")
pprint.pprint(documents)
