"""Test-only LLM construction that routes requests through the Grove gateway.

This module is excluded from Bluehawk snipping (see IGNORE_PATTERNS in
snip.js) because it is infrastructure, not example code. The published
snippets construct ``ChatOpenAI`` directly, which is what a reader running
against api.openai.com needs.

The Grove gateway is Azure API Management, which authenticates with an
``api-key`` header rather than the OpenAI SDK's ``Authorization: Bearer``
scheme. Sending only a bearer token yields:

    401 {'statusCode': 401, 'message': 'Access denied due to missing
         subscription key. ...'}

The working endpoint requires the ``/v1`` suffix; without it the gateway
returns 404. Set OPENAI_BASE_URL (or GROVE_OPENAI_BASE_URL) to:

    https://grove-gateway-prod.azure-api.net/grove-foundry-prod/openai/v1

When neither is set, this falls back to a plain ChatOpenAI, so the examples
still work against api.openai.com directly.
"""

import os


def build_chat_model(model, **kwargs):
    """Return a ChatOpenAI, routed through the Grove gateway when configured."""
    from langchain_openai import ChatOpenAI

    # The OpenAI SDK already honors OPENAI_BASE_URL, but it cannot add the
    # gateway's api-key header, so read the base URL here and pass both.
    base_url = os.getenv("GROVE_OPENAI_BASE_URL") or os.getenv("OPENAI_BASE_URL")
    api_key = os.getenv("OPENAI_API_KEY")

    if not base_url:
        return ChatOpenAI(model=model, **kwargs)

    return ChatOpenAI(
        model=model,
        base_url=base_url,
        api_key=api_key,
        default_headers={"api-key": api_key},
        **kwargs,
    )
