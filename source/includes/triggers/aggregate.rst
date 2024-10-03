.. code-block:: javascript

   const pipeline = [
     { "$group": {
         "_id": "$customerId",
         "numPurchases": { "$sum": 1 },
         "numItemsPurchased": { "$sum": { "$size": "$items" } }
     } },
     { "$addFields": {
         "averageNumItemsPurchased": {
           "$divide": ["$numItemsPurchased", "$numPurchases"]
         }
     } }
   ]

   return purchasesCollection.aggregate(pipeline).toArray()
     .then(customers => {
       console.log(`Successfully grouped purchases for ${customers.length} customers.`)
       for(const customer of customers) {
         console.log(`customer: ${customer._id}`)
         console.log(`num purchases: ${customer.numPurchases}`)
         console.log(`total items purchased: ${customer.numItemsPurchased}`)
         console.log(`average items per purchase: ${customer.averageNumItemsPurchased}`)
       }
       return customers
     })
     .catch(err => console.error(`Failed to group purchases by customer: ${err}`))
