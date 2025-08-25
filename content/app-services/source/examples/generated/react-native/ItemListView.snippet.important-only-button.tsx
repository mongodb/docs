<Button
  title={showImportantOnly ? 'Show All' : 'Show Important Only'}
  buttonStyle={{
    ...styles.addToDoButton,
    backgroundColor: showImportantOnly ? '#00A35C' : '#FFC010',
  }}
  onPress={() => setShowImportantOnly(showImportantOnly => !showImportantOnly)}
/>
