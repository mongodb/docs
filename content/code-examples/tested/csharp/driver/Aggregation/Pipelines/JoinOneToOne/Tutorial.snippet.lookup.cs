.Lookup<Product, Order>(
    foreignCollectionName: "products",
    localField: "ProductId",
    foreignField: "Id",
    @as: "ProductMapping"
)
