const PostItem = ({_id}: {_id: Realm.BSON.ObjectId}) => {
  const post = useObject(Post, _id);
  const user = post?.linkingObjects<User>('User', 'posts')[0];

  if (!post || !user) return <Text>The post or user was not found.</Text>;
  return (
    <View>
      <Text>Post title: {post.title}</Text>
      <Text>Post created by: {user.name}</Text>
    </View>
  );
};
