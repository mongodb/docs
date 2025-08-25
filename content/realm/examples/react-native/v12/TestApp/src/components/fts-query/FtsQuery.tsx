import React, {useState} from 'react';
import Realm, {ObjectSchema} from 'realm';
import {RealmProvider, useRealm, useQuery} from '@realm/react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';

// :snippet-start: rn-fts-annotation
class Book extends Realm.Object<Book> {
  name!: string;
  price?: number;

  static schema: ObjectSchema = {
    name: 'Book',
    properties: {
      name: {type: 'string', indexed: 'full-text'},
      price: 'int?',
    },
  };
}
// :snippet-end:

// open a new realm
export const FtsQuery = () => {
  return (
    <RealmProvider schema={[Book]}>
      <FtsQueryInnards />
    </RealmProvider>
  );
};

// create component to test fts
function FtsQueryInnards(): JSX.Element {
  const realm = useRealm();
  const [bookName, setBookName] = useState('Book name');
  const [bookPrice, setBookPrice] = useState('0');

  // function to create books
  const writeBooks = (bookName: string, bookPrice: number) => {
    realm.write(() => {
      realm.create(Book, {
        name: bookName,
        price: bookPrice,
      });
    });
  };

  // get rid of all books
  const clearRealm = async () => {
    realm.write(() => {
      realm.deleteAll();
    });

    await realm.syncSession?.uploadAllLocalChanges();
  };

  // :snippet-start: react-native-fts-query
  // :uncomment-start:
  // import {useQuery} from "@realm/react";
  // :uncomment-end:

  // Retrieve book objects from realm
  const books = useQuery(Book);

  // Filter for books with 'hunger' in the name
  const booksWithHunger = useQuery(Book, books => {
    return books.filtered('name TEXT $0', 'hunger');
  });

  // Filter for books with 'swan' but not 'lake' in the name
  const booksWithSwanWithoutLake = useQuery(Book, books => {
    return books.filtered('name TEXT $0', 'swan -lake');
  });
  // :snippet-end:

  // Return the number of books in query
  return (
    <View>
      <TextInput
        testID={'bookNameInput'}
        onChangeText={setBookName}
        value={bookName}
      />
      <TextInput
        onChangeText={setBookPrice}
        value={bookPrice}
      />

      <Button
        testID="addBookButton"
        title="Add Book"
        onPress={() => {
          writeBooks(bookName, Number(bookPrice));
        }}
      />
      <Button
        testID="removeButton"
        title="Remove all books"
        onPress={() => {
          clearRealm();
        }}
      />
      <Text
        style={styles.container}
        testID="swanQueryResults">
        Query: Books with 'swan' without 'lake':
        {booksWithSwanWithoutLake.length}
      </Text>
      <Text
        style={styles.container}
        testID="hungerQueryResults">
        Query: Books with 'hunger': {booksWithHunger.length}
      </Text>

      <Text style={styles.container}>Books list </Text>
      <FlatList
        data={books}
        renderItem={({item}) => <Text>{item.name}</Text>}
        keyExtractor={item => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
  },
});
