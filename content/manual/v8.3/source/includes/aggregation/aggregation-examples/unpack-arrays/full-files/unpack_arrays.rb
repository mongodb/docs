# typed: strict
require "mongo"
require "bson"

uri = "<connection string>"

Mongo::Client.new(uri) do |client|
  agg_db = client.use("agg_tutorials_db")

  # start-insert-orders
  orders = agg_db[:orders]
  orders.delete_many({})

  orders.insert_many(
    [
      {
        order_id: 6363763262239,
        products: [
          {
            prod_id: "abc12345",
            name: "Asus Laptop",
            price: 431,
          },
          {
            prod_id: "def45678",
            name: "Karcher Hose Set",
            price: 22,
          },
        ],
      },
      {
        order_id: 1197372932325,
        products: [
          {
            prod_id: "abc12345",
            name: "Asus Laptop",
            price: 429,
          },
        ],
      },
      {
        order_id: 9812343774839,
        products: [
          {
            prod_id: "pqr88223",
            name: "Morphy Richards Food Mixer",
            price: 431,
          },
          {
            prod_id: "def45678",
            name: "Karcher Hose Set",
            price: 21,
          },
        ],
      },
      {
        order_id: 4433997244387,
        products: [
          {
            prod_id: "def45678",
            name: "Karcher Hose Set",
            price: 23,
          },
          {
            prod_id: "jkl77336",
            name: "Picky Pencil Sharpener",
            price: 1,
          },
          {
            prod_id: "xyz11228",
            name: "Russell Hobbs Chrome Kettle",
            price: 16,
          },
        ],
      },
    ]
  )
  # end-insert-orders

  pipeline = [
    # start-unwind
    {
      "$unwind": {
        path: "$products",
      },
    },
    # end-unwind
    # start-match
    {
      "$match": {
        "products.price": {
          "$gt": 15,
        },
      },
    },
    # end-match
    # start-group
    {
      "$group": {
        _id: "$products.prod_id",
        product: { "$first": "$products.name" },
        total_value: { "$sum": "$products.price" },
        quantity: { "$sum": 1 },
      },
    },
    # end-group
    # start-set
    {
      "$set": {
        product_id: "$_id",
      },
    },
    # end-set
    # start-unset
    { "$unset": ["_id"] },
    # end-unset
  ]

  # start-run-agg
  aggregation_result = orders.aggregate(pipeline)
  # end-run-agg

  aggregation_result.each do |doc|
    puts doc
  end
end
