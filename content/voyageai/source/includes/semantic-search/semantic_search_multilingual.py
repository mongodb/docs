import voyageai
import numpy as np

# Initialize Voyage AI client
vo = voyageai.Client()

# English documents about technology companies
english_docs = [
    "Apple announced record-breaking revenue in its latest quarterly earnings report.",
    "The Mediterranean diet emphasizes fish, olive oil, and vegetables.",
    "Microsoft is investing heavily in artificial intelligence and cloud computing.",
    "Shakespeare's plays continue to influence modern literature and theater."
]

# Spanish documents about technology companies
spanish_docs = [
    "Apple anunció ingresos récord en su último informe trimestral de ganancias.",
    "La dieta mediterránea enfatiza el pescado, el aceite de oliva y las verduras.",
    "Microsoft está invirtiendo fuertemente en inteligencia artificial y computación en la nube.",
    "Las obras de Shakespeare continúan influenciando la literatura y el teatro modernos."
]

# Chinese documents about technology companies
chinese_docs = [
    "苹果公司在最新季度财报中宣布创纪录的收入。",
    "地中海饮食强调鱼类、橄榄油和蔬菜。",
    "微软正在大力投资人工智能和云计算。",
    "莎士比亚的作品继续影响现代文学和戏剧。"
]

# Perform semantic search in English
english_query = "tech company earnings"

# Generate embeddings for English documents
english_embeddings = vo.embed(
    texts=english_docs,
    model="voyage-4-large",
    input_type="document"
).embeddings

# Generate embedding for English query
english_query_embedding = vo.embed(
    texts=[english_query],
    model="voyage-4-large",
    input_type="query"
).embeddings[0]

# Calculate similarity scores using dot product
english_similarities = np.dot(english_embeddings, english_query_embedding)

# Sort by similarity (highest to lowest)
english_ranked = np.argsort(-english_similarities)

print(f"English Query: '{english_query}'\n")
for rank, idx in enumerate(english_ranked[:2], 1):
    print(f"{rank}. {english_docs[idx]}")
    print(f"   Similarity: {english_similarities[idx]:.4f}\n")

# Perform semantic search in Spanish
spanish_query = "ganancias de empresas tecnológicas"

# Generate embeddings for Spanish documents
spanish_embeddings = vo.embed(
    texts=spanish_docs,
    model="voyage-4-large",
    input_type="document"
).embeddings

# Generate embedding for Spanish query
spanish_query_embedding = vo.embed(
    texts=[spanish_query],
    model="voyage-4-large",
    input_type="query"
).embeddings[0]

# Calculate similarity scores using dot product
spanish_similarities = np.dot(spanish_embeddings, spanish_query_embedding)

# Sort by similarity (highest to lowest)
spanish_ranked = np.argsort(-spanish_similarities)

print(f"Spanish Query: '{spanish_query}'\n")
for rank, idx in enumerate(spanish_ranked[:2], 1):
    print(f"{rank}. {spanish_docs[idx]}")
    print(f"   Similarity: {spanish_similarities[idx]:.4f}\n")

# Perform semantic search in Chinese
chinese_query = "科技公司收益"

# Generate embeddings for Chinese documents
chinese_embeddings = vo.embed(
    texts=chinese_docs,
    model="voyage-4-large",
    input_type="document"
).embeddings

# Generate embedding for Chinese query
chinese_query_embedding = vo.embed(
    texts=[chinese_query],
    model="voyage-4-large",
    input_type="query"
).embeddings[0]

# Calculate similarity scores using dot product
chinese_similarities = np.dot(chinese_embeddings, chinese_query_embedding)

# Sort by similarity (highest to lowest)
chinese_ranked = np.argsort(-chinese_similarities)

print(f"Chinese Query: '{chinese_query}'\n")
for rank, idx in enumerate(chinese_ranked[:2], 1):
    print(f"{rank}. {chinese_docs[idx]}")
    print(f"   Similarity: {chinese_similarities[idx]:.4f}\n")
