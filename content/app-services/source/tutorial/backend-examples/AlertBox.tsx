import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {COLORS} from './Colors';

type Props = {
  onSubmit: ({term}: {term: string}) => void;
};

export function AlertBox(props: Props): React.ReactElement<Props> {
  const {onSubmit} = props;
  const [term, setTerm] = useState('');

  return (
    <View style={styles.modalWrapper}>
      <Text h4 style={styles.addItemTitle}>
        Add Alert Term
      </Text>
      <Input
        placeholder="Enter term"
        onChangeText={(text: string) => setTerm(text)}
        autoCompleteType={undefined}
      />
       <Button
        title="Submit"
        buttonStyle={styles.saveButton}
        onPress={() => onSubmit({term})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    width: 300,
    minHeight: 200,
    borderRadius: 4,
    alignItems: 'center',
  },
  addItemTitle: {
    margin: 20,
  },
  saveButton: {
    width: 280,
    backgroundColor: COLORS.primary,
  },
});
