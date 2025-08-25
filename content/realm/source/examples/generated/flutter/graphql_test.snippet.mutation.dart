final mutation = """
mutation AddPlant( \$_id: ObjectId!, \$name: String!, \$color: String) {
  insertOnePlant(data: {
    _id: \$_id
    name: \$name
    color: \$color
  }) {
    _id
    name
    color
  }
}
""";

final mutationOptions = MutationOptions(
    document: gql(mutation),
    variables: {
      '_id': ObjectId().toString(),
      'name': 'lily',
      'color': 'white'
    });

final mutationRes = await client.mutate(mutationOptions);
