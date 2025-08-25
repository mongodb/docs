
const syncConfigWithErrorHandling = {
  flexible: true,
  onError: (_session, error) => {
    console.log(error);
  },
};

function RealmWithErrorHandling() {
  return (
    <RealmProvider sync={syncConfigWithErrorHandling}>
      <RestOfApp />
    </RealmProvider>
  );
}
