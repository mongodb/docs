import React from 'react';
import {useUser} from '@realm/react';

function QueryPlants() {
  // Get currently logged in user
  const user = useUser();

  const getPlantByName = async (name: string) => {
    // Access linked MongoDB collection
    const mongodb = user.mongoClient('mongodb-atlas');
    const plants = mongodb.db('example').collection<Plant>('plants');
    // Query the collection
    const response = await plants.findOne({name});

    return response;
  };
  // ...
}
