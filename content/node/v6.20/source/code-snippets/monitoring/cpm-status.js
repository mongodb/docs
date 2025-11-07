function connectionPoolStatus(client) {
  let checkedOut = 0;

  function onCheckout() {
    checkedOut++;
  }

  function onCheckin() {
    checkedOut--;
  }

  function onClose() {
    client.removeListener('connectionCheckedOut', onCheckout);
    client.removeListener('connectionCheckedIn', onCheckin);

    checkedOut = NaN;
  }

  // Decreases count of connections checked out of the pool when connectionCheckedIn event is triggered
  client.on('connectionCheckedIn', onCheckin);

  // Increases count of connections checked out of the pool when connectionCheckedOut event is triggered
  client.on('connectionCheckedOut', onCheckout);

  // Cleans up event listeners when client is closed
  client.on('close', onClose);

  return {
    count: () => checkedOut,
    cleanUp: onClose
  };
}