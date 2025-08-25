const createItem = useCallback(
  ({summary, priority}: {summary: string, priority: string}) => {
    realm.write(() => {
      return new Item(realm, {
        summary,
        owner_id: user?.id,
        priority
      });
    });
  },
  [realm, user],
);
