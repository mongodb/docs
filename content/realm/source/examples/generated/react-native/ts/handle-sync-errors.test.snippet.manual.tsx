const syncConfigWithManualClientReset = {
  flexible: true,
  clientReset: {
    mode: 'manual',
    onManual: (session, path) => {
      // handle manual client reset here
    },
  },
};

function RealmWitManualClientReset() {
  return (
    <RealmProvider sync={syncConfigWithManualClientReset}>
      <RestOfApp />
    </RealmProvider>
  );
}
