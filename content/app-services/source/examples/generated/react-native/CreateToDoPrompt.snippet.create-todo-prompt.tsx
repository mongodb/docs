type Props = {
  onSubmit(args: {summary: string; priority: string;}): void;
};

export function CreateToDoPrompt(props: Props): React.ReactElement<Props> {
  const {onSubmit} = props;
  const [summary, setSummary] = useState('');
  const [priority, setPriority] = useState(Priority.High);

  return (
    <View style={styles.modalWrapper}>
      <Text h4 style={styles.addItemTitle}>
        Add To-Do Item
      </Text>
      <Input
        placeholder="What do you want to do?"
        onChangeText={(text: string) => setSummary(text)}
        autoCompleteType={undefined}
      />
      <Picker
        style={{width: '80%'}}
        selectedValue={priority}
        onValueChange={value => setPriority(value)}>
        {Priority.map(priority  => (
          <Picker.Item
            key={priority}
            label={priority}
            value={Priority[priority]}
           />
        ))}
      </Picker>
      <Button
        title="Save"
        buttonStyle={styles.saveButton}
        onPress={() => onSubmit({summary, priority})}
      />
    </View>
  );
}
