const PostsByYoungUsers = () => {
  const postsByYoungUsers = useQuery(Post, posts => {
    return posts.filtered(
      '@links.User.posts.birthdate >= 2000-01-01@00:00:00:0',
    );
  });

  if (!postsByYoungUsers) return <Text>The post was not found.</Text>;
  return (
    <View>
      <Text>Posts By Young Users</Text>
      {postsByYoungUsers.map((post) => (
        <Text key={post._id.toHexString()}>
          {post.title}
        </Text>
      ))}
    </View>
  );
};
