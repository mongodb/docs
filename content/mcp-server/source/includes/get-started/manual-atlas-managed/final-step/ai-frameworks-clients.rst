.. step:: Access the MCP Server using Agent Frameworks.

   For programmatic access to the MCP server using agent frameworks like 
   **LangChain**, you must fetch an access token and then call the MCP server
   from your application.

   .. tip::

      The following example assumes you have ``mcp[cli]``, ``httpx``, and ``httpx2``
      installed. You can install them using ``pip``:
    
      .. code-block:: none

         python3 -m pip install "mcp[cli]" httpx httpx2

   Here is an example Python script that uses the MCP SDK to access the MCP server:

   .. code-block:: python

      import asyncio
      import base64
      import os

      import httpx
      import httpx2
      from mcp import ClientSession
      from mcp.client.streamable_http import create_mcp_http_client, streamable_http_client

      async def fetch_access_token(client_id: str, client_secret: str) -> str:
          credentials = base64.b64encode(
              f"{client_id}:{client_secret}".encode()
          ).decode()

          async with httpx.AsyncClient() as client:
              response = await client.post(
                  "https://cloud.mongodb.com/api/oauth/token",
                  headers={
                      "Authorization": f"Basic {credentials}",
                      "Content-Type": "application/x-www-form-urlencoded",
                      "Accept": "application/json",
                  },
                  data={"grant_type": "client_credentials"},
              )
              response.raise_for_status()
              return response.json()["access_token"]
 
      async def main() -> None:
          client_id = os.environ["CLIENT_ID"]
          client_secret = os.environ["SECRET"]
          mcp_url = os.getenv("MCP_URL", "https://mcp.mongodb.com")

          token = await fetch_access_token(client_id, client_secret)

          headers = {
              "Authorization": f"Bearer {token}",
              "Accept": "application/json, text/event-stream",
              "MCP-Protocol-Version": "2025-11-25",
          }

          http_client = create_mcp_http_client(
              headers=headers,
              timeout=httpx2.Timeout(30.0),
          )

          async with http_client:
              async with streamable_http_client(
                  mcp_url,
                  http_client=http_client,
              ) as (read_stream, write_stream):
                  async with ClientSession(read_stream, write_stream) as session:
                      init_result = await session.initialize()
                      print("Initialized:", init_result.protocol_version)

                      result = await session.list_tools()

                      for tool in result.tools:
                          print(tool.name)
                          if tool.description:
                              print(f"  {tool.description}")

      if __name__ == "__main__":
          asyncio.run(main())
   
