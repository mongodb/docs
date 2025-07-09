from langchain.chains.query_constructor.schema import AttributeInfo

# Define the document content description 
document_content_description = "Brief summary of a movie"

# Define the metadata fields to filter on
metadata_field_info = [
    AttributeInfo(
        name="genre",
        description="The genre of the movie",
        type="string",
    ),
    AttributeInfo(
        name="year",
        description="The year the movie was released",
        type="integer",
    ),
    AttributeInfo(
        name="rating", 
        description="A 1-10 rating for the movie", 
        type="float"
    ),
]
