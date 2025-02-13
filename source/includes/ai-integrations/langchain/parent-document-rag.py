from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import  RunnablePassthrough
from langchain_openai import ChatOpenAI

# Define a prompt template
template = """
   Use the following pieces of context to answer the question at the end.
   {context}
   Question: {query}?
"""
prompt = PromptTemplate.from_template(template)
model = ChatOpenAI()

# Construct a chain to answer questions on your data
chain = (
   {"context": parent_doc_retriever, "query": RunnablePassthrough()}
   | prompt
   | model
   | StrOutputParser()
)

# Prompt the chain
query = "In a list, what are MongoDB's latest AI announcements?"
answer = chain.invoke(query)
print(answer)