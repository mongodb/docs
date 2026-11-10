# typed: strict
require "mongo"
require "bson"

uri = "<connection string>"

Mongo::Client.new(uri) do |client|
  agg_db = client.use("agg_tutorials_db")

  # start-insert-sample-data
  products = agg_db[:products]
  orders = agg_db[:orders]

  products.delete_many({})
  orders.delete_many({})

  products.insert_many(
    [
      {
        name: "Asus Laptop",
        variation: "Ultra HD",
        category: "ELECTRONICS",
        description: "Great for watching movies",
      },
      {
        name: "Asus Laptop",
        variation: "Standard Display",
        category: "ELECTRONICS",
        description: "Good value laptop for students",
      },
      {
        name: "The Day Of The Triffids",
        variation: "1st Edition",
        category: "BOOKS",
        description: "Classic post-apocalyptic novel",
      },
      {
        name: "The Day Of The Triffids",
        variation: "2nd Edition",
        category: "BOOKS",
        description: "Classic post-apocalyptic novel",
      },
      {
        name: "Morphy Richards Food Mixer",
        variation: "Deluxe",
        category: "KITCHENWARE",
        description: "Luxury mixer turning good cakes into great",
      },
    ]
  )

  orders.insert_many(
    [
      {
        customer_id: "elise_smith@myemail.com",
        orderdate: DateTime.parse("2020-05-30T08:35:52Z"),
        product_name: "Asus Laptop",
        product_variation: "Standard Display",
        value: 431.43,
      },
      {
        customer_id: "tj@wheresmyemail.com",
        orderdate: DateTime.parse("2019-05-28T19:13:32Z"),
        product_name: "The Day Of The Triffids",
        product_variation: "2nd Edition",
        value: 5.01,
      },
      {
        customer_id: "oranieri@warmmail.com",
        orderdate: DateTime.parse("2020-01-01T08:25:37Z"),
        product_name: "Morphy Richards Food Mixer",
        product_variation: "Deluxe",
        value: 63.13,
      },
      {
        customer_id: "jjones@tepidmail.com",
        orderdate: DateTime.parse("2020-12-26T08:55:46Z"),
        product_name: "Asus Laptop",
        product_variation: "Standard Display",
        value: 429.65,
      },
    ]
  )
  # end-insert-sample-data

  embedded_pipeline = [
    # start-embedded-pl-match1
    {
      "$match": {
        "$expr": {
          "$and": [
            { "$eq": ["$product_name", "$$prdname"] },
            { "$eq": ["$product_variation", "$$prdvartn"] },
          ],
        },
      },
    },
    # end-embedded-pl-match1
    # start-embedded-pl-match2
    {
      "$match": {
        orderdate: {
          "$gte": DateTime.parse("2020-01-01T00:00:00Z"),
          "$lt": DateTime.parse("2021-01-01T00:00:00Z"),
        },
      },
    },
    # end-embedded-pl-match2
    # start-embedded-pl-unset
    {
      "$unset": ["_id", "product_name", "product_variation"],
    },
    # end-embedded-pl-unset
  ]

  pipeline = [
    # start-lookup
    {
      "$lookup": {
        from: "orders",
        let: {
          prdname: "$name",
          prdvartn: "$variation",
        },
        pipeline: embedded_pipeline,
        as: "orders",
      },
    },
    # end-lookup
    # start-match
    {
      "$match": {
        orders: { "$ne": [] },
      },
    },
    # end-match
    # start-unset
    {
      "$unset": ["_id", "description"],
    },
    # end-unset
  ]

  # start-run-agg
  aggregation_result = products.aggregate(pipeline)
  # end-run-agg

  aggregation_result.each do |doc|
    puts doc
  end
end
