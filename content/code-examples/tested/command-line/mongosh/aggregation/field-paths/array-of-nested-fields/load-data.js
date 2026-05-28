db.products.insertMany( [
   { item: "journal", instock: [ { warehouse: "A" }, { warehouse: "C" } ] },
   { item: "notebook", instock: [ { warehouse: "C" } ] },
   { item: "paper", instock: [ { warehouse: "A" }, { warehouse: "B" } ] },
   { item: "planner", instock: [ { warehouse: "A" }, { warehouse: "B" } ] },
   { item: "postcard", instock: [ { warehouse: "B" }, { warehouse: "C" } ] }
] )
