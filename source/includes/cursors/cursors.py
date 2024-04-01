# start-cursor-iterate
results = collection.find()

for document in results:
    print(document)
# end-cursor-iterate
    
# start-cursor-next
results = collection.find({ "name": "Dunkin' Donuts" })

print(results.next())
# end-cursor-next

# start-cursor-list
results = collection.find({ "name": "Dunkin' Donuts" })

all_results = list(results)

for document in all_results:
    print(document)
# end-cursor-list
    
# start-cursor-close
results = collection.find()

...

results.close()
# end-cursor-close