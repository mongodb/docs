import json
import os

from openai import OpenAI
from pymongo import MongoClient

# start-create-clients
FIREWORKS_BASE_URL = "https://api.fireworks.ai/inference/v1"
fireworks = OpenAI(
    base_url=FIREWORKS_BASE_URL,
    api_key=os.environ["FIREWORKS_API_KEY"],
)

mongo_client = MongoClient(os.environ["MONGODB_URI"])
collection = mongo_client["<database-name>"]["<collection-name>"]

CHAT_MODEL = "accounts/fireworks/models/gpt-oss-120b"
# end-create-clients


# start-generate-response
question = "Recommend a movie about a heist that goes wrong."
movies = collection.find(
    {"plot": {"$regex": r"\bheist\b", "$options": "i"}}, {"_id": 0, "title": 1, "plot": 1}
).limit(5)
context = "\n".join(f'{m["title"]}: {m["plot"]}' for m in movies)

response = fireworks.chat.completions.create(
    model=CHAT_MODEL,
    messages=[
        {
            "role": "system",
            "content": "Answer using only the movies in the context. "
            "If the context doesn't contain the answer, say so.",
        },
        {
            "role": "user",
            "content": f"Context:\n{context}\n\nQuestion: {question}",
        },
    ],
)

print(response.choices[0].message.content)
# end-generate-response


# start-generate-response-with-tools
AGENT_MODEL = "accounts/fireworks/models/kimi-k3"

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "search_movies",
            "description": "Keyword search over movie plots in the MongoDB movie catalog.",
            "parameters": {
                "type": "object",
                "properties": {
                    "keyword": {
                        "type": "string",
                        "description": "A single keyword to search for in movie plots.",
                    }
                },
                "required": ["keyword"],
            },
        },
    }
]


def search_movies(keyword):
    results = collection.find(
        {"plot": {"$regex": rf"\b{keyword}\b", "$options": "i"}}, {"_id": 0, "title": 1, "plot": 1}
    ).limit(5)
    return [f'{m["title"]}: {m["plot"]}' for m in results]


messages = [
    {
        "role": "system",
        "content": "Call search_movies before you recommend a movie.",
    },
    {
        "role": "user",
        "content": "Recommend a movie about a heist that goes wrong.",
    },
]

response = fireworks.chat.completions.create(
    model=AGENT_MODEL,
    messages=messages,
    tools=TOOLS,
)
message = response.choices[0].message
messages.append(message.model_dump(exclude_none=True))

for call in message.tool_calls:
    args = json.loads(call.function.arguments)
    results = search_movies(**args)
    messages.append(
        {
            "role": "tool",
            "tool_call_id": call.id,
            "content": json.dumps(results),
        }
    )

response = fireworks.chat.completions.create(model=AGENT_MODEL, messages=messages)
print(response.choices[0].message.content)
# end-generate-response-with-tools


# start-agent-memory
history = mongo_client["<database-name>"]["chat_history"]


def load_history(session_id):
    return [
        doc["message"]
        for doc in history.find({"session_id": session_id}).sort("seq", 1)
    ]


def save_messages(session_id, messages, start_seq):
    history.insert_many(
        {"session_id": session_id, "seq": start_seq + i, "message": message}
        for i, message in enumerate(messages)
    )


session_id = "demo-session"
past_messages = load_history(session_id)
new_messages = [{"role": "user", "content": "Recommend a movie about a heist that goes wrong."}]

response = fireworks.chat.completions.create(
    model=AGENT_MODEL,
    messages=past_messages + new_messages,
)
new_messages.append(response.choices[0].message.model_dump(exclude_none=True))

save_messages(session_id, new_messages, start_seq=len(past_messages))
print(response.choices[0].message.content)
# end-agent-memory
