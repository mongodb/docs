return (
  <SafeAreaProvider>
    <View style={styles.viewWrapper}>
      ...
      <Button
        title="Add To-Do"
        buttonStyle={styles.addToDoButton}
        onPress={() => setShowNewItemOverlay(true)}
        icon={
          <Icon
            type="material"
            name={'playlist-add'}
            style={styles.showCompletedIcon}
            color="#fff"
            tvParallaxProperties={undefined}
          />
        }
      />
      <Button
        title="Alerts"
        buttonStyle={styles.alertButton}
        onPress={() => setShowAlertBox(true)}
        icon={
          <Icon
            type="material"
            name={'add-alert'}
            style={styles.showCompletedIcon}
            color="#fff"
            tvParallaxProperties={undefined}
          />
        }
      />
      <Overlay
        isVisible={showAlertBox}
        onBackdropPress={() => setShowAlertBox(false)}>
        <AlertBox
          onSubmit={({term}) => {
            setShowAlertBox(false);
          }}
        />
      </Overlay>
    </View>
  </SafeAreaProvider>
);
