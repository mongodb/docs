public class MyActivity extends Activity {
    private Realm realm;
    private RealmChangeListener realmListener;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        realm = Realm.getDefaultInstance();
        realmListener = new RealmChangeListener<Realm>() {
            @Override
            public void onChange(Realm realm) {
              // ... do something with the updates (UI, etc.) ...
            }
          };
        // Observe realm notifications.
        realm.addChangeListener(realmListener);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // Remove the listener.
        realm.removeChangeListener(realmListener);
        // Close the Realm instance.
        realm.close();
    }
}
