// :snippet-start: static-rendering
import * as Realm from "realm-web";

export async function getStaticProps() {
  const apiKey = process.env.REALM_API_KEY;
  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });
  // Log in user using realm API key
  const credentials = Realm.Credentials.apiKey(apiKey);
  const user = await app.logIn(credentials);

  // Connect to database
  const mongo = user.mongoClient("mongodb-atlas");
  const plants = mongo.db("example").collection("plants");

  // Use plants.findOne to query the database
  const data = await plants.findOne({ name: "daffodil" });

  // You must parse data as JSON to use it as a prop
  const json = JSON.parse(JSON.stringify(data));
  return {
    props: {
      plant: json,
    },
  };
}

export default function Static({ plant }) {
  return (
    <div>
      <h1>Data from Static Rendering</h1>
      <div>
        <div>
          <p>{plant.name}</p>
          <p>{plant.color}</p>
        </div>
      </div>
    </div>
  );
}
// :snippet-end:
