stocks_coll = timeseries_db["stocks"]

sample_documents = [
    { "ticker": "MDB", "date": datetime(2021, 12, 18, 15, 59, 0, 0), "close": 252.47, "volume": 55046.00},
    { "ticker": "MDB", "date": datetime(2021, 12, 18, 15, 58, 0, 0), "close": 252.93, "volume": 44042.00},
    { "ticker": "MDB", "date": datetime(2021, 12, 18, 15, 57, 0, 0), "close": 253.61, "volume": 40182.00},
    { "ticker": "MDB", "date": datetime(2021, 12, 18, 15, 56, 0, 0), "close": 253.63, "volume": 27890.00},
    { "ticker": "MDB", "date": datetime(2021, 12, 18, 15, 55, 0, 0), "close": 254.03, "volume": 40270.00}
]

stocks_coll.insert_many(sample_documents)
