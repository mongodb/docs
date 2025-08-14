from typing import Annotated, Dict, List
from typing_extensions import TypedDict
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import ToolMessage
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.checkpoint.mongodb import MongoDBSaver
from config import llm, mongo_client
from search_tools import SEARCH_TOOLS
from memory_tools import MEMORY_TOOLS

# Define the graph state
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# Define the LangGraph agent
class LangGraphAgent:
    def __init__(self):
        # Combine search tools with memory tools
        self.tools = SEARCH_TOOLS + MEMORY_TOOLS
        self.tools_by_name = {tool.name: tool for tool in self.tools}
        
        # Create prompt template
        self.prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                "You are a helpful AI chatbot."
                " You are provided with tools to answer questions about movies."
                " Think step-by-step and use these tools to get the information required to answer the user query."
                " Do not re-run tools unless absolutely necessary."
                " If you are not able to get enough information using the tools, reply with I DON'T KNOW."
                " You have access to the following tools: {tool_names}."
            ),
            MessagesPlaceholder(variable_name="messages"),
        ])
        
        # Provide the tool names to the prompt
        self.prompt = self.prompt.partial(tool_names=", ".join([tool.name for tool in self.tools]))
        
        # Prepare the LLM with tools
        bind_tools = llm.bind_tools(self.tools)
        self.llm_with_tools = self.prompt | bind_tools
        
        # Build the graph
        self.app = self._build_graph()
    
    def _build_graph(self):
        """Build and compile the LangGraph workflow."""
        # Instantiate the graph
        graph = StateGraph(GraphState)
        
        # Add nodes
        graph.add_node("agent", self._agent_node)
        graph.add_node("tools", self._tools_node)
        
        # Add edges
        graph.add_edge(START, "agent")
        graph.add_edge("tools", "agent")
        
        # Add conditional edge
        graph.add_conditional_edges(
            "agent",
            self._route_tools,
            {"tools": "tools", END: END},
        )

        # Use the MongoDB checkpointer for short-term memory
        checkpointer = MongoDBSaver(mongo_client, db_name = "sample_mflix")
        return graph.compile(checkpointer=checkpointer)
    
    def _agent_node(self, state: GraphState) -> Dict[str, List]:
        """Agent node that processes messages and decides on tool usage."""
        messages = state["messages"]
        result = self.llm_with_tools.invoke(messages)
        return {"messages": [result]}
    
    def _tools_node(self, state: GraphState) -> Dict[str, List]:
        """Tools node that executes the requested tools."""
        result = []
        messages = state["messages"]

        if not messages:
            return {"messages": result}

        last_message = messages[-1]

        if not hasattr(last_message, "tool_calls") or not last_message.tool_calls:
            return {"messages": result}

        tool_calls = last_message.tool_calls

        # Show which tools the agent chose to use
        tool_names = [tool_call["name"] for tool_call in tool_calls]
        print(f"🔧 Agent chose to use tool(s): {', '.join(tool_names)}")

        for tool_call in tool_calls:
            try:
                tool_name = tool_call["name"]
                tool_args = tool_call["args"]
                tool_id = tool_call["id"]
                print(f"   → Executing {tool_name}")
                
                if tool_name not in self.tools_by_name:
                    result.append(ToolMessage(content=f"Tool '{tool_name}' not found", tool_call_id=tool_id))
                    continue

                tool = self.tools_by_name[tool_name]
                observation = tool.invoke(tool_args)
                result.append(ToolMessage(content=str(observation), tool_call_id=tool_id))

            except Exception as e:
                result.append(ToolMessage(content=f"Tool error: {str(e)}", tool_call_id=tool_id))

        return {"messages": result}
    
    def _route_tools(self, state: GraphState):
        """
        Uses a conditional_edge to route to the tools node if the last message
        has tool calls. Otherwise, route to the end.
        """
        messages = state.get("messages", [])
        if len(messages) > 0:
            ai_message = messages[-1]
        else:
            raise ValueError(f"No messages found in input state to tool_edge: {state}")
        
        if hasattr(ai_message, "tool_calls") and len(ai_message.tool_calls) > 0:
            return "tools"
        return END
    
    def execute(self, user_input: str, thread_id: str) -> str:
        """Execute the graph with user input."""
        input_data = {"messages": [("user", user_input)]}
        config = {"configurable": {"thread_id": thread_id}}

        outputs = list(self.app.stream(input_data, config))

        # Get the final answer
        if outputs:
            final_output = outputs[-1]
            for _, value in final_output.items():
                if "messages" in value and value["messages"]:
                    return value["messages"][-1].content

        return "No response generated."
