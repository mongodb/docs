db.productUpdates.insertMany( [
   { _id: 1, product: "gadget", date: ISODate("2024-01-01"), specs: { color: "blue" } },
   { _id: 2, product: "gadget", date: ISODate("2024-01-02"), specs: { size: "medium" } },
   { _id: 3, product: "gadget", date: ISODate("2024-01-03"), specs: { weight: 0.5 } },
   { _id: 4, product: "widget", date: ISODate("2024-01-01"), specs: { color: "red" } },
   { _id: 5, product: "widget", date: ISODate("2024-01-02"), specs: { material: "plastic" } }
] )
