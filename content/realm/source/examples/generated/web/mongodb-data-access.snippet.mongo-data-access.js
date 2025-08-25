import { useEffect, useState } from "react";
import { useApp } from "../components/useApp";

function MongoDbDataAccess({ name }) {
  const [plant, setPlant] = useState();
  const app = useApp();

  useEffect(() => {
    if (app?.currentUser) {
      const mongo = app?.currentUser?.mongoClient("mongodb-atlas");
      const plants = mongo.db("example").collection("plants");
      plants.findOne({ name }).then((foundPlant) => {
        setPlant(foundPlant);
      });
    }
  }, [app, app?.currentUser, app?.currentUser?.id, name]);

  return (
    <div>
      <h1>Data from MongoDB Access</h1>
      {plant ? (
        <div>
          <p>{plant.name}</p>
          <p>{plant.color}</p>
        </div>
      ) : (
        "no plant"
      )}
    </div>
  );
}

export default function DaffodilInformation() {
  return <MongoDbDataAccess name="daffodil" />;
}
