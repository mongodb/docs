Flag that specifies whether to truncate the input to fit within the 
context length. Defaults to ``True``.

- If ``True``, the system truncates an over-length input to fit within 
  the context length before the embedding model vectorizes it.
- If ``False``, the system raises an error if any input exceeds the 
  context length.