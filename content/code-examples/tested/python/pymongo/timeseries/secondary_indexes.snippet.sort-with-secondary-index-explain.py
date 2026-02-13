explain_result = database.command(
    "explain",
    {
        "aggregate": sensorData,
        "pipeline": pipeline,
        "cursor": {}
    },
    verbosity="executionStats"
)
