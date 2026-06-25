curl -X POST "http://localhost:27182/api/v1/start" --data '
  {
    "source": "cluster0",
    "destination": "cluster1",
    "copyInNaturalOrder": [
      {
        "database": ".",
      },
    ]
  }'
