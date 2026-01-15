Create a file named ``rag.py`` and copy the following code.

This code loads a MongoDB earnings report PDF, splits it into chunks,
generates embeddings using Voyage AI's ``voyage-4-large`` model, stores
them in memory, and uses an LLM to answer questions about
the content. You can replace the PDF with your own data.