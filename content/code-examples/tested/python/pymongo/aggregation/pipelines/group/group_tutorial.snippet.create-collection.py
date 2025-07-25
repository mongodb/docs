orders_coll = agg_db["orders"]

order_data = [
    {
        "customer_id": "elise_smith@myemail.com",
        "orderdate": datetime(2020, 5, 30, 8, 35, 52),
        "value": 231,
    },
    {
        "customer_id": "elise_smith@myemail.com",
        "orderdate": datetime(2020, 1, 13, 9, 32, 7),
        "value": 99,
    },
    {
        "customer_id": "oranieri@warmmail.com",
        "orderdate": datetime(2020, 1, 1, 8, 25, 37),
        "value": 63,
    },
    {
        "customer_id": "tj@wheresmyemail.com",
        "orderdate": datetime(2019, 5, 28, 19, 13, 32),
        "value": 2,
    },
    {
        "customer_id": "tj@wheresmyemail.com",
        "orderdate": datetime(2020, 11, 23, 22, 56, 53),
        "value": 187,
    },
    {
        "customer_id": "tj@wheresmyemail.com",
        "orderdate": datetime(2020, 8, 18, 23, 4, 48),
        "value": 4,
    },
    {
        "customer_id": "elise_smith@myemail.com",
        "orderdate": datetime(2020, 12, 26, 8, 55, 46),
        "value": 4,
    },
    {
        "customer_id": "tj@wheresmyemail.com",
        "orderdate": datetime(2021, 2, 28, 7, 49, 32),
        "value": 1024,
    },
    {
        "customer_id": "elise_smith@myemail.com",
        "orderdate": datetime(2020, 10, 3, 13, 49, 44),
        "value": 102,
    },
]

orders_coll.insert_many(order_data)
