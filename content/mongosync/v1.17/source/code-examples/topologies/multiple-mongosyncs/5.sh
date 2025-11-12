curl mongosync01Host:27601/api/v1/start -XPOST --data \
     '{ "source": "cluster0", "destination": "cluster1", \
        "reversible": false, "enableUserWriteBlocking": "none" }'

curl mongosync02Host:27602/api/v1/start -XPOST --data \
     '{ "source": "cluster0", "destination": "cluster1", \
        "reversible": false, "enableUserWriteBlocking": "none" }'
