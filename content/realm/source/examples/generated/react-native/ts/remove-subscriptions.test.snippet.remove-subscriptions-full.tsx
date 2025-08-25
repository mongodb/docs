import {useEffect} from 'react';
// get realm context from createRealmContext()
import {RealmContext} from '../RealmConfig';

const {useRealm} = RealmContext;

function SubscriptionManager() {
  const realm = useRealm();

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Remove subscription for object type `Turtle`,
      // which we added in `initialSubscriptions`.
      mutableSubs.removeByObjectType('Turtle');
    });
  });

  return (
    // ...
  );
}
