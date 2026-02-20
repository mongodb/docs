interface Pet {
  name: string;
  age: number;
}

const database = client.db("<your database>");
const collection = database.collection<Pet>("<your collection>");
