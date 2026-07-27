find_results = list(collection.find({"status": Status.ACTIVE}))
print(find_results)
