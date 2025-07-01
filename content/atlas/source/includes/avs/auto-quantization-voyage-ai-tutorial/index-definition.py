# Scalar Quantization
vector_index_definition_scalar_quantized = {
  "fields": [
    {
        "type": "vector",
        "path": "embedding",
        "quantization": "scalar", 
        "numDimensions": 1024,
        "similarity": "cosine",
    }
  ]
}
# Binary Quantization
vector_index_definition_binary_quantized = {
  "fields": [
    {
        "type": "vector",
        "path": "embedding",
        "quantization": "binary",  
        "numDimensions": 1024,
        "similarity": "cosine",
    }
  ]
}
# Float32 Embeddings
vector_index_definition_float32_ann = {
  "fields": [
    {
        "type": "vector",
        "path": "embedding",
        "numDimensions": 1024,
        "similarity": "cosine",
    }
  ]
}