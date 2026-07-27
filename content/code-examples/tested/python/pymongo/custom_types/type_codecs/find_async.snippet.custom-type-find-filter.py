find_results = [
    doc async for doc in collection.find({"status": Status.ACTIVE})
]
print(find_results)
