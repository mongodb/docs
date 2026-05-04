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
        customer_id: "elise_smith@myemail.com",
        orderdate: DateTime.parse("2020-05-30T08:35:52Z"),
        value: 231,

      },
      {
        customer_id: "elise_smith@myemail.com",
        orderdate: DateTime.parse("2020-01-13T09:32:07Z"),
        value: 99,
      },
      {
        customer_id: "oranieri@warmmail.com",
        orderdate: DateTime.parse("2020-01-01T08:25:37Z"),
        value: 63,
      },
      {
        customer_id: "tj@wheresmyemail.com",
        orderdate: DateTime.parse("2019-05-28T19:13:32Z"),
        value: 2,
      },
      {
        customer_id: "tj@wheresmyemail.com",
        orderdate: DateTime.parse("2020-11-23T22:56:53Z"),
        value: 187,
      },
      {
        customer_id: "tj@wheresmyemail.com",
        orderdate: DateTime.parse("2020-08-18T23:04:48Z"),
        value: 4,
      },
      {
        customer_id: "elise_smith@myemail.com",
        orderdate: DateTime.parse("2020-12-26T08:55:46Z"),
        value: 4,
      },
      {
        customer_id: "tj@wheresmyemail.com",
        orderdate: DateTime.parse("2021-02-28T07:49:32Z"),
        value: 1024,
      },
      {
        customer_id: "elise_smith@myemail.com",
        orderdate: DateTime.parse("2020-10-03T13:49:44Z"),
        value: 102,
      },
    ]
  )
  # end-insert-orders

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
    # start-sort1
    {
      "$sort": {
        orderdate: 1,
      },
    },
    # end-sort1
    # start-group
    {
      "$group": {
        _id: "$customer_id",
        first_purchase_date: { "$first": "$orderdate" },
        total_value: { "$sum": "$value" },
        total_orders: { "$sum": 1 },
        orders: { "$push": {
          orderdate: "$orderdate",
          value: "$value",
        } },
      },
    },
    # end-group
    # start-sort2
    {
      "$sort": {
        first_purchase_date: 1,
      },
    },
    # end-sort2
    # start-set
    {
      "$set": {
        customer_id: "$_id",
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
