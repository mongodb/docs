exports = function (changeEvent) {
  const {
    fullDocument: { productId },
  } = changeEvent;
  const totalSalesMaterialization = context.services
    .get("mongodb-atlas")
    .db("store")
    .collection("total_sales_materialized");
  totalSalesMaterialization.updateOne(
    { _id: productId },
    { $inc: { total_sales: 1 } },
    { upsert: true }
  );
};
