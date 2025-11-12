timeseries_db = client["timeseries"]
timeseries_db.create_collection("weather", timeseries=time_series_options, expireAfterSeconds=expire_after_seconds)
