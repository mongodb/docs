type Plant = {
  _id: BSON.ObjectId;
  _partition: string;
  name: string;
  sunlight?: string;
  color?: string;
  type?: string;
};
