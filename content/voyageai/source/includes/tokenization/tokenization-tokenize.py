import voyageai

# Initialize client (uses VOYAGE_API_KEY environment variable)
vo = voyageai.Client()

texts = [
    "The Mediterranean diet emphasizes fish, olive oil, and vegetables, believed to reduce chronic diseases.",
    "Photosynthesis in plants converts light energy into glucose and produces essential oxygen."
]

# Tokenize the texts
tokenized = vo.tokenize(texts, model="voyage-4-large")
for i in range(len(texts)):
    print(tokenized[i].tokens)