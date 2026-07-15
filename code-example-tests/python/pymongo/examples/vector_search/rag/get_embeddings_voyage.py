# :snippet-start: get-embedding-voyage
import voyageai

# Specify the embedding model
model = "voyage-3-large"
vo = voyageai.Client()
# NOTE (tests): voyageai is replaced with a sys.modules mock before this  # :remove:
# module loads — vo is a MagicMock instance. No real API calls are made.  # :remove:

# Define a function to generate embeddings
def get_embedding(data, input_type="document"):
    embeddings = vo.embed(data, model=model, input_type=input_type).embeddings
    return embeddings[0]


# :snippet-end:
