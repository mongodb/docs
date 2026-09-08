import voyageai

# Initialize client (uses VOYAGE_API_KEY environment variable)
vo = voyageai.Client()

texts = [
    "The Mediterranean diet emphasizes fish, olive oil, and vegetables, believed to reduce chronic diseases.",
    "Photosynthesis in plants converts light energy into glucose and produces essential oxygen."
]

# Count total tokens
total_tokens = vo.count_tokens(texts, model="voyage-4-large")
print(total_tokens)