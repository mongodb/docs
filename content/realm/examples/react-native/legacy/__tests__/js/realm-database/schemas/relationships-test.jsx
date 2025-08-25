import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import {render, waitFor} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import User from '../../Models/User';
import Post from '../../Models/Post';

const realmConfig = {
  schema: [User, Post],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useObject, useQuery} = createRealmContext(realmConfig);

let realm;

// test describe block for the relationship page
describe('relationships tests', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    realm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    realm.write(() => {
      realm.delete(realm.objects(User));
      realm.delete(realm.objects(Post));

      const user1 = realm.create(User, {
        _id: new Realm.BSON.ObjectId(),
        name: 'John Doe',
        birthdate: new Date(1990, 0, 1),
      });
      const user2 = realm.create(User, {
        _id: new Realm.BSON.ObjectId(),
        name: 'Jane Doe',
        birthdate: new Date(1993, 6, 3),
      });
      const user3 = realm.create(User, {
        _id: new Realm.BSON.ObjectId(),
        name: 'Billy Bob',
        birthdate: new Date(2002, 9, 14),
      });

      const post1 = realm.create(Post, {
        _id: new Realm.BSON.ObjectId(),
        title: 'My First Post',
      });
      const post2 = realm.create(Post, {
        _id: new Realm.BSON.ObjectId(),
        title: 'My Second Post',
      });
      user1.posts.push(post1);
      user1.posts.push(post2);

      const post3 = realm.create(Post, {
        _id: new Realm.BSON.ObjectId(),
        title: 'Row Row Row Your Boat',
      });
      const post4 = realm.create(Post, {
        _id: new Realm.BSON.ObjectId(),
        title: 'Life is but a dream',
      });
      user2.posts.push(post3);
      user2.posts.push(post4);

      const post5 = realm.create(Post, {
        _id: new Realm.BSON.ObjectId(),
        title: 'I am not a child but I am not old either',
      });
      const post6 = realm.create(Post, {
        _id: new Realm.BSON.ObjectId(),
        title: 'My favorite food is pizza',
      });
      user3.posts.push(post5);
      user3.posts.push(post6);
    });
  });

  afterAll(() => {
    if (!realm.isClosed) {
      realm.close();
    }
  });

  it('Query Backlinks with Realm.Object.linkingObjects()', async () => {
    // :snippet-start: dynamically-obtain-inverse-relationship
    // :replace-start: {
    //  "terms": {
    //   " testID='postTitle'": "",
    //   " testID='userName'": ""
    //   }
    // }
    const PostItem = ({_id}) => {
      const post = useObject(Post, _id);
      const user = post?.linkingObjects('User', 'posts')[0];

      if (!post || !user)
        return <Text>The post or user could not be found</Text>;
      return (
        <View>
          <Text testID='postTitle'>Post title: {post.title}</Text>
          <Text testID='userName'>Post created by: {user.name}</Text>
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const postId = realm.objects(Post)[0]._id;

    const App = () => (
      <RealmProvider>
        <PostItem _id={postId} />
      </RealmProvider>
    );

    const {getByTestId} = render(<App />);

    await waitFor(() => {
      expect(getByTestId('postTitle')).toHaveTextContent(
        'Post title: My First Post',
      );
      expect(getByTestId('userName')).toHaveTextContent(
        'Post created by: John Doe',
      );
    });
  });

  it('Query Backlinks with @links.<Type>.<Property>', async () => {
    // :snippet-start: query-backlinks
    // :replace-start: {
    //  "terms": {
    //   " testID={`Post ${i}`}": "",
    //   ", i": ""
    //   }
    // }
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
          {postsByYoungUsers.map((post, i) => (
            <Text testID={`Post ${i}`} key={post._id.toHexString()}>
              {post.title}
            </Text>
          ))}
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <PostsByYoungUsers />
      </RealmProvider>
    );

    const {getByTestId} = render(<App />);

    await waitFor(() => {
      expect(getByTestId('Post 0')).toHaveTextContent(
        'I am not a child but I am not old either',
      );
      expect(getByTestId('Post 1')).toHaveTextContent(
        'My favorite food is pizza',
      );
    });
  });
});
