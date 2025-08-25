// TODO: to be fully implemented in DOCSP-28176
// :not-snippet-start: create-bundle
import Realm from 'realm';
import Cat from '../Models/Cat';

// :remove-start:
const APP_ID = '';
let higherScopedConfig1: Realm.Configuration;
let higherScopedConfig2: Realm.Configuration;
// :remove-end:

async function createSyncedBundle() {
  const app = new Realm.App(APP_ID);
  const user = await app.logIn(Realm.Credentials.anonymous());
  const config: Realm.Configuration = {
    schema: [Cat.schema],
    path: 'synced-bundle.realm',
    sync: {
      user,
      flexible: true,
      initialSubscriptions: {
        update: (subs, realm) => {
          subs.add(realm.objects('Cat'));
        },
      },
    },
  };
  const realm = await Realm.open(config);

  // add data to realm
  realm.write(() => {
    realm.create('Cat', {name: 'Jasper', birthday: 'Nov 2, 2000'});
    realm.create('Cat', {name: 'Maggie', birthday: 'December 4, 2007'});
    realm.create('Cat', {name: 'Sophie', birthday: 'July 10, 2019'});
  });

  // ensure synchronize all changes before copy
  await realm.syncSession?.uploadAllLocalChanges();
  await realm.syncSession?.downloadAllServerChanges();

  // Create new config with all same except the path
  const newConfig = {...config};
  newConfig.path = '"synced-copy.realm"';

  // Create bundled realm
  realm.writeCopyTo(newConfig);

  realm.close();
  // :remove-start:
  higherScopedConfig1 = config;
  higherScopedConfig2 = newConfig;
  // :remove-end:
}
// :uncomment-start:
// createSyncedBundle();
// :uncomment-end:
// :not-snippet-end:
const app = new Realm.App(APP_ID);
beforeEach(async () => {
  Realm.deleteFile(higherScopedConfig1);
  Realm.deleteFile(higherScopedConfig2);
  // TODO: create user
});
afterEach(async () => {
  // TODO: delete user
});
test.skip('create synced bundle', async () => {
  await createSyncedBundle();
  // TODO: log in with a different user before open
  // await app.logIn(Realm.Credentials.emailPassword(TODO));
  // const newUserConfig = higherScopedConfig2;
  // newUserConfig.sync?.user = newUser;
  // const realm = await Realm.open(higherScopedConfig2);
  // expect(realm.objects('Cat').length).toBe(3);
  // realm.close();
  // Note: not deleting realm in clean up b/c using in `bundled.test.tsx`
});
