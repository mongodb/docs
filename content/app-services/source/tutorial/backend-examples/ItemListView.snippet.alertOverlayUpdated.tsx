<Overlay
  isVisible={showAlertBox}
  onBackdropPress={() => setShowAlertBox(false)}>
  <AlertBox
    onSubmit={({term}) => {
      setShowAlertBox(false);
      addAlert(term);
    }}
  />
</Overlay>
