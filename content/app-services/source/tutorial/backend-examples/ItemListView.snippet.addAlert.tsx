export function ItemListView() {
  const realm = useRealm();
  const items = useQuery(Item).sorted('_id');
  const user = useUser();

  // addAlert() takes a string input and inserts it as a document in the todo.alerts collection
  const addAlert = async (text: string) => {
    const mongodb = user?.mongoClient("mongodb-atlas");
    const alertTerms = mongodb?.db("todo").collection("alerts");
    await alertTerms?.insertOne({ term: text.toLowerCase() });
  };
