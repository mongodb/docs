// :snippet-start: replace-with-new-documents
db.sales.aggregate([
   { $match: { status: "C" } },
   { $replaceWith: { _id: "$_id", item: "$item", amount: { $multiply: [ "$price", "$quantity"]}, status: "Complete", asofDate: "$$NOW" } }
])
// :snippet-end:
