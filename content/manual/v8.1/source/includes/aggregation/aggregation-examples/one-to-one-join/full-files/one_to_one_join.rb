# typed: strict
require "mongo"
require "bson"

uri = "<connection string>"

Mongo::Client.new(uri) do |client|
  agg_db = client.use("agg_tutorials_db")

  # start-insert-sample-data
  orders = agg_db[:orders]
  products = agg_db[:products]

  orders.delete_many({})
  products.delete_many({})

  orders.insert_many(
    [
      {
        customer_id: "elise_smith@myemail.com",
        orderdate: DateTime.parse("2020-05-30T08:35:52Z"),
        product_id: "a1b2c3d4",
        value: 431.43,
      },
      {
        customer_id: "tj@wheresmyemail.com",
        orderdate: DateTime.parse("2019-05-28T19:13:32Z"),
        product_id: "z9y8x7w6",
        value: 5.01,
      },
      {
        customer_id: "oranieri@warmmail.com",
        orderdate: DateTime.parse("2020-01-01T08:25:37Z"),
        product_id: "ff11gg22hh33",
        value: 63.13,
      },
      {
        customer_id: "jjones@tepidmail.com",
        orderdate: DateTime.parse("2020-12-26T08:55:46Z"),
        product_id: "a1b2c3d4",
        value: 429.65,
      },
    ]
  )

  products.insert_many(
    [
      {
        id: "a1b2c3d4",
        name: "Asus Laptop",
        category: "ELECTRONICS",
        description: "Good value laptop for students",
      },
      {
        id: "z9y8x7w6",
        name: "The Day Of The Triffids",
        category: "BOOKS",
        description: "Classic post-apocalyptic novel",
      },
      {
        id: "ff11gg22hh33",
        name: "Morphy Richardds Food Mixer",
        category: "KITCHENWARE",
        description: "Luxury mixer turning good cakes into great",
      },
      {
        id: "pqr678st",
        name: "Karcher Hose Set",
        category: "GARDEN",
        description: "Hose + nosels + winder for tidy storage",
      },
    ]
  )
  # end-insert-sample-data

  pipeline = [
    # start-match
    {
      "$match": {
        orderdate: {
          "$gte": DateTime.parse("2020-01-01T00:00:00Z"),
          "$lt": DateTime.parse("2021-01-01T00:00:00Z"),
        },
      },
    },
    # end-match
    # start-lookup
    {
      "$lookup": {
        from: "products",
        localField: "product_id",
        foreignField: "id",
        as: "product_mapping",
      },
    },
    # end-lookup
    # start-set
    {
      "$set": {
        product_mapping: { "$first": "$product_mapping" },
      },
    },
    {
      "$set": {
        product_name: "$product_mapping.name",
        product_category: "$product_mapping.category",
      },
    },
    # end-set
    # start-unset
    { "$unset": ["_id", "product_id", "product_mapping"] },
    # end-unset
  ]

  # start-run-agg
  aggregation_result = orders.aggregate(pipeline)
  # end-run-agg

  aggregation_result.each do |doc|
    puts doc
  end
end
