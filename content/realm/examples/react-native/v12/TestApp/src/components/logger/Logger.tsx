import React, {useState} from 'react';
import Realm, {ObjectSchema, BSON} from 'realm';
import {RealmProvider, useRealm} from '@realm/react';
import {View, Text, Button, TextInput, FlatList} from 'react-native';

class Turtle extends Realm.Object<Turtle> {
  _id!: BSON.ObjectId;
  name!: string;
  birthday?: string;

  static schema: ObjectSchema = {
    name: 'Turtle',
    properties: {
      _id: 'objectId',
      name: 'string',
      birthday: 'string?',
    },
    primaryKey: '_id',
  };
}

type LogProps = {level: string; message: string};

const LogItem = ({level, message}: LogProps) => (
  <View>
    <Text testID="log-level">{level}</Text>
    <Text>{message}</Text>
  </View>
);

type Log = {
  message: string;
  level: string;
};

export const Logger = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  /* 
  // Most of the time, devs will want to set a custom logger outside of the
  // React tree. However, for testing purposes, we're doing it here.
  // 
  // Note that we can't set a logger in useEffect at same level as
  // `RealmProvider` because useEffect runs afer `componentDidMount`. This
  // means that `RealmProvider` has already opened a realm and the `setLogger`
  // callback needs to be set up before the realm is opened. `useLayoutEffect`
  // also does not work.
  */

  // :snippet-start: set-custom-logger
  Realm.setLogger((level, message) => {
    const log = {
      message,
      level,
    };

    setLogs(previousLogs => [...previousLogs, log]);
  });
  // :snippet-end:

  // :snippet-start: set-log-level
  Realm.setLogLevel('trace');
  // :snippet-end:

  return (
    <>
      <RealmWrapper />
      <FlatList
        testID="list-container"
        data={logs}
        renderItem={({item}) => (
          <LogItem level={item.level} message={item.message} />
        )}
        keyExtractor={item => item.message}
      />
    </>
  );
};

const RealmWrapper = () => {
  return (
    <>
      <RealmProvider schema={[Turtle]}>
        <AddObjects />
      </RealmProvider>
    </>
  );
};

const AddObjects = () => {
  const realm = useRealm();
  const [turtleName, setTurtleName] = useState('Change me!');

  const writeRealmObject = (name: string) => {
    const newTurtle = {
      _id: new BSON.ObjectId(),
      name: name,
    };

    realm.write(() => {
      realm.create(Turtle, newTurtle);
    });
  };

  return (
    <View>
      <TextInput onChangeText={setTurtleName} value={turtleName} />
      <Button
        testID="add-turtle"
        title="Add Turtle"
        onPress={() => {
          writeRealmObject(turtleName);
        }}
      />
      <Button
        title="Remove all turtles"
        onPress={() => {
          realm.write(() => {
            realm.deleteAll();
          });
        }}
      />
      <Button
        title="Turn off logging"
        onPress={() => {
          // :snippet-start: disable-logger
          Realm.setLogLevel('off');
          // :snippet-end:
        }}
      />
    </View>
  );
};
