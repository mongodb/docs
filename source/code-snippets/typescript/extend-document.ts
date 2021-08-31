interface Pet {
  name: string;
  age: number;
  cute: true;
}

const database = client.db("<your database>");
const collection = database.collection<Pet>("<your collection>");
