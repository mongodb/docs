# start-cursor-iterate
results = collection.find()

async for document in results:
    print(document)
# end-cursor-iterate
    
# start-cursor-next
results = collection.find({ "name": "Dunkin' Donuts" })

print(await results.next())
# end-cursor-next

# start-cursor-list
results = collection.find({ "name": "Dunkin' Donuts" })

all_results = await to_list(results)

for document in all_results:
    print(document)
# end-cursor-list
    
# start-cursor-close
results = collection.find()

...

await results.close()
# end-cursor-close