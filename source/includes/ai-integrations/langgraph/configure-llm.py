from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI

# Initialize the LLM
llm = ChatOpenAI()

# Create a chat prompt template for the agent, which includes a system prompt and a placeholder for `messages`
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "You are a helpful AI agent."
            " You are provided with tools to answer questions about movies."
            " Think step-by-step and use these tools to get the information required to answer the user query."
            " Do not re-run tools unless absolutely necessary."
            " If you are not able to get enough information using the tools, reply with I DON'T KNOW."
            " You have access to the following tools: {tool_names}."
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
)
 
tools = [
    vector_search,
    full_text_search
]

# Provide the tool names to the prompt
prompt = prompt.partial(tool_names=", ".join([tool.name for tool in tools]))

# Prepare the LLM by making the tools and prompt available to the model
bind_tools = llm.bind_tools(tools)
llm_with_tools = prompt | bind_tools