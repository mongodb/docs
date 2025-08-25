import {FlatList, Text, View} from 'react-native';

// :snippet-start: qs-find-sort-filter
import React from 'react';
import {useQuery} from '@realm/react';
import {Profile} from '../../models';

export const Read = () => {
  // Find
  const profiles = useQuery(Profile);
  // Sort
  const sortedProfiles = useQuery(Profile, profiles => {
    return profiles.sorted('name', false);
  });
  // Filter
  const filteredProfiles = useQuery(Profile, profiles => {
    return profiles.filtered('name == "testProfile"');
  });

  // ... rest of component
  // :remove-start:
  return (
    <View>
      {profiles.length ? (
        <View>
          <Text>Profiles: </Text>
          <FlatList
            scrollEnabled={false}
            data={profiles}
            renderItem={({item}) => (
              <Text testID="profile"> • {item.name}</Text>
            )}
            keyExtractor={item => item.name}
          />
        </View>
      ) : (
        <Text>🛑 No profiles found</Text>
      )}

      {sortedProfiles.length ? (
        <View>
          <Text>Sorted: </Text>
          <FlatList
            scrollEnabled={false}
            data={sortedProfiles}
            renderItem={({item}) => (
              <Text testID="sorted-profile"> • {item.name}</Text>
            )}
            keyExtractor={item => item.name}
          />
        </View>
      ) : (
        <Text>🛑 No profiles found</Text>
      )}

      {filteredProfiles.length ? (
        <View>
          <Text>Filtered: </Text>
          <FlatList
            scrollEnabled={false}
            data={filteredProfiles}
            renderItem={({item}) => (
              <Text testID="filtered-profile"> • {item.name}</Text>
            )}
            keyExtractor={item => item.name}
          />
        </View>
      ) : (
        <Text>🛑 No profiles found</Text>
      )}
    </View>
  );
  // :remove-end:
};
// :snippet-end:
